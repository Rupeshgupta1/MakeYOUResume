import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CheckCircleIcon, DownloadIcon } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas-pro'

import PersonalInfoForm from '../components/Personalinfoform'
import ResumePreview from '../components/ResumeBuilder/ResumePreview'
import SummaryForm from '../components/ResumeBuilder/SummaryForm'
import ExperienceForm from '../components/ResumeBuilder/ExperienceForm'
import EducationForm from '../components/ResumeBuilder/EducationForm'
import ProjectsForm from '../components/ResumeBuilder/ProjectsForm'
import SkillsForm from '../components/ResumeBuilder/SkillsForm'

const SECTIONS = [
  { id: 0, key: 'personal_info', label: 'Personal Information', subtitle: 'Get Started with the personal information' },
  { id: 1, key: 'professional_summary', label: 'Professional Summary', subtitle: 'Add summary for your resume here' },
  { id: 2, key: 'experience', label: 'Professional Experience', subtitle: 'Add your job experience' },
  { id: 3, key: 'education', label: 'Education', subtitle: 'Add your education details' },
  { id: 4, key: 'project', label: 'Projects', subtitle: 'Add your projects' },
  { id: 5, key: 'skills', label: 'Skills', subtitle: 'Add your skills' },
]

const ResumeBuilder = () => {
  const { resumeID } = useParams()
  const navigate = useNavigate()
  const hasLoaded = useRef(false)

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [savedSections, setSavedSections] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const [resumeData, setResumeData] = useState({
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    accent_color: '#3B82F6',
    public: false,
  })

  useEffect(() => {
    if (hasLoaded.current) return
    const stored = localStorage.getItem('resumes')
    if (stored) {
      const resumes = JSON.parse(stored)
      const found = resumes.find(r => r.id === resumeID)
      if (found) {
        hasLoaded.current = true
        setResumeData(found)
      }
    }
  }, [resumeID])

  const updateSection = (key, value) => {
    setResumeData(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    const stored = localStorage.getItem('resumes')
    const resumes = stored ? JSON.parse(stored) : []

    const updated = resumes.some(r => r.id === resumeID)
      ? resumes.map(r => r.id === resumeID ? { ...resumeData, id: resumeID } : r)
      : [...resumes, { ...resumeData, id: resumeID }]

    localStorage.setItem('resumes', JSON.stringify(updated))

    if (activeSectionIndex === SECTIONS.length - 1) {
      setShowSuccess(true)
    } else {
      setActiveSectionIndex(prev => prev + 1)
    }
  }

  // ✅ CLEAN PDF DOWNLOAD
  const handleDownload = async () => {
    const element = document.getElementById('resume-preview')
    if (!element) return alert('Preview not found')

    setDownloading(true)

    try {
      await new Promise(r => setTimeout(r, 300))

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      const imgWidth = pageWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position -= pageHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${resumeData.title || 'resume'}.pdf`)
    } catch (err) {
      console.error(err)
      alert('Download failed')
    } finally {
      setDownloading(false)
    }
  }

  const goNext = () => setActiveSectionIndex(prev => prev + 1)
  const goPrev = () => setActiveSectionIndex(prev => prev - 1)

  const activeSection = SECTIONS[activeSectionIndex]

  const renderForm = () => {
    switch (activeSection.key) {
      case 'personal_info': return <PersonalInfoForm data={resumeData.personal_info} onChange={v => updateSection('personal_info', v)} />
      case 'professional_summary': return <SummaryForm data={resumeData.professional_summary} onChange={v => updateSection('professional_summary', v)} />
      case 'experience': return <ExperienceForm data={resumeData.experience} onChange={v => updateSection('experience', v)} />
      case 'education': return <EducationForm data={resumeData.education} onChange={v => updateSection('education', v)} />
      case 'project': return <ProjectsForm data={resumeData.project} onChange={v => updateSection('project', v)} />
      case 'skills': return <SkillsForm data={resumeData.skills} onChange={v => updateSection('skills', v)} />
      default: return null
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={handleDownload} className="px-6 py-3 bg-green-500 text-white rounded">
          {downloading ? 'Downloading...' : 'Download PDF'}
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top */}
      <div className="bg-white border-b p-4 flex justify-between">
        <Link to="/app/">← Back</Link>
        <button onClick={handleDownload} className="bg-green-500 text-white px-4 py-2 rounded">
          {downloading ? 'Downloading...' : 'Download'}
        </button>
      </div>

      <div className="flex max-w-6xl mx-auto p-6 gap-6">

        {/* LEFT */}
        <div className="w-[350px] bg-white p-4 rounded border">
          <h2 className="font-bold">{activeSection.label}</h2>
          <p className="text-sm text-gray-500">{activeSection.subtitle}</p>

          {renderForm()}

          <div className="flex justify-between mt-4">
            <button onClick={goPrev} disabled={activeSectionIndex === 0}>Prev</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={goNext} disabled={activeSectionIndex === SECTIONS.length - 1}>
              Next
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex justify-center">
          <ResumePreview data={resumeData} />
        </div>

      </div>
    </div>
  )
}

export default ResumeBuilder