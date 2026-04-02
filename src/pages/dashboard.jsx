import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const colors = ['#9333ea', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const navigate = useNavigate()

  // ── Load resumes from localStorage ───────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem('resumes')
    if (stored) {
      setAllResumes(JSON.parse(stored))
    }
  }, [])

  // ── Save resumes to localStorage whenever allResumes changes ─────────────
  const saveToStorage = (resumes) => {
    localStorage.setItem('resumes', JSON.stringify(resumes))
    setAllResumes(resumes)
  }

  // ── Create new resume ─────────────────────────────────────────────────────
  const createResume = (event) => {
    event.preventDefault()
    const newResume = {
      id: `resume_${Date.now()}`,
      title: title,
      fullName: title,
      updatedAt: new Date().toISOString(),
      personal_info: {},
      professional_summary: '',
      experience: [],
      education: [],
      project: [],
      skills: [],
      template: 'classic',
      accent_color: '#3B82F6',
      public: false,
    }
    const updated = [...allResumes, newResume]
    saveToStorage(updated)
    setShowCreateResume(false)
    setTitle('')
    navigate(`/app/builder/${newResume.id}`)
  }

  // ── Upload resume (navigate to builder with new id) ───────────────────────
  const uploadResume = (event) => {
    event.preventDefault()
    const newResume = {
      id: `resume_${Date.now()}`,
      title: title,
      fullName: title,
      updatedAt: new Date().toISOString(),
      personal_info: {},
      professional_summary: '',
      experience: [],
      education: [],
      project: [],
      skills: [],
      template: 'classic',
      accent_color: '#3B82F6',
      public: false,
    }
    const updated = [...allResumes, newResume]
    saveToStorage(updated)
    setShowUploadResume(false)
    setTitle('')
    setResume(null)
    navigate(`/app/builder/${newResume.id}`)
  }

  // ── Edit resume title ─────────────────────────────────────────────────────
  const editTitle = (event) => {
    event.preventDefault()
    const updated = allResumes.map(r =>
      r.id === editResumeId ? { ...r, title, fullName: title, updatedAt: new Date().toISOString() } : r
    )
    saveToStorage(updated)
    setEditResumeId('')
    setTitle('')
  }

  // ── Delete resume ─────────────────────────────────────────────────────────
  const deleteResume = (resumeId) => {
    const confirm = window.confirm('Are you sure you want to delete this resume?')
    if (confirm) {
      const updated = allResumes.filter(r => r.id !== resumeId)
      saveToStorage(updated)
    }
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent sm:hidden">
          Welcome
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-700 border border-dashed border-slate-400 group hover:border-indigo-600 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 p-2.5 bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300 font-medium">
              Create new resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-700 border border-dashed border-slate-400 group hover:border-purple-600 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-linear-to-br from-purple-600 to-purple-800 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300 font-medium">
              Upload existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6" />

        {/* Resume Cards */}
        {allResumes.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-10">
            No resumes yet. Create one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-6">
            {allResumes.map((resume, index) => {
              const basecolor = colors[index % colors.length]
              return (
                <button
                  key={resume.id}
                  onClick={() => navigate(`/app/builder/${resume.id}`)}
                  className="group relative w-full sm:max-w-36 h-48 rounded-lg text-white overflow-hidden flex flex-col items-center justify-center gap-1"
                  style={{ backgroundColor: basecolor }}
                >
                  <FilePenLineIcon className="size-9 p-2 bg-white text-gray-800 rounded-full" />
                  <p className="text-sm text-white font-medium truncate text-center px-2">
                    {resume.title || resume.fullName}
                  </p>
                  <p className="absolute bottom-2 left-2 right-2 text-[10px] text-white/60 text-center">
                    updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div
                    onClick={e => e.stopPropagation()}
                    className="absolute top-2 right-2 items-center hidden group-hover:flex"
                  >
                    <TrashIcon
                      onClick={() => deleteResume(resume.id)}
                      className="size-5 p-1 text-white hover:bg-white/20 rounded transition-colors"
                    />
                    <PencilIcon
                      onClick={() => { setEditResumeId(resume.id); setTitle(resume.title) }}
                      className="size-5 p-1 text-white hover:bg-white/20 rounded transition-colors"
                    />
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-40 z-10 flex items-center justify-center"
          >
            <div onClick={e => e.stopPropagation()} className="relative bg-white border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                type="text"
                placeholder="Enter Resume Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
              <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => { setShowCreateResume(false); setTitle('') }}
              />
            </div>
          </form>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-40 z-10 flex items-center justify-center"
          >
            <div onClick={e => e.stopPropagation()} className="relative bg-white border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Upload a Resume</h2>
              <input
                type="text"
                placeholder="Enter Resume Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
              <div>
                <label htmlFor="resume-input" className="block text-sm text-slate-700">
                  Select resume file
                  <div className="flex flex-col items-center justify-center gap-2 border text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-green-700">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={e => setResume(e.target.files[0])}
                />
              </div>
              <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Upload Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => { setShowUploadResume(false); setTitle('') }}
              />
            </div>
          </form>
        )}

        {/* Edit Title Modal */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId('')}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-40 z-10 flex items-center justify-center"
          >
            <div onClick={e => e.stopPropagation()} className="relative bg-white border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                type="text"
                placeholder="Enter Resume Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
              <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => { setEditResumeId(''); setTitle('') }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Dashboard