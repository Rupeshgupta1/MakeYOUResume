import React, { useState, useEffect } from 'react'
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon, BriefcaseIcon } from 'lucide-react'

const ExperienceForm = ({ data = [], onChange, shouldCloseAll }) => {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    if (shouldCloseAll) {
      setOpenIndex(null)
    }
  }, [shouldCloseAll])

  const addExperience = () => {
    const newItem = { company: '', role: '', startDate: '', endDate: '', description: '' }
    onChange([...data, newItem])
    setOpenIndex(data.length)
  }

  const removeExperience = (i) => {
    onChange(data.filter((_, idx) => idx !== i))
    setOpenIndex(null)
  }

  const updateExperience = (i, field, value) => {
    onChange(data.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
  }

  const improveWithAI = async (i, description) => {
    if (!description) return alert('Pehle description likho')
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'MakeYOURresume'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Improve this job experience description professionally:\n${description}`
            }
          ]
        })
      })
      const result = await res.json()
      const aiText = result?.choices?.[0]?.message?.content
      if (aiText) {
        updateExperience(i, 'description', aiText)
      } else {
        alert('AI failed — try again')
      }
    } catch (err) {
      console.error(err)
      alert('AI failed')
    }
  }

  return (
    <div className="space-y-3">

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-slate-300">
          <BriefcaseIcon className="size-10 mb-3 stroke-1" />
          <p className="text-sm">No work experience added yet.</p>
          <p className="text-xs">Click "Add Experience" to get started.</p>
        </div>
      )}

      {data.map((item, i) => (
        <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">

          <div
            className="flex items-center justify-between px-4 py-3 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-all"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="text-sm font-medium text-slate-700 truncate">
              {item.role && item.company
                ? `${item.role} at ${item.company}`
                : item.role || item.company || `Experience ${i + 1}`}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <TrashIcon
                onClick={e => { e.stopPropagation(); removeExperience(i) }}
                className="size-4 text-slate-400 hover:text-red-500 transition-colors"
              />
              {openIndex === i
                ? <ChevronUpIcon className="size-4 text-slate-400" />
                : <ChevronDownIcon className="size-4 text-slate-400" />
              }
            </div>
          </div>

          {openIndex === i && (
            <div className="px-4 py-4 space-y-3">
              {[
                { field: 'company',   label: 'Company',    placeholder: 'Google' },
                { field: 'role',      label: 'Job Title',  placeholder: 'Frontend Developer' },
                { field: 'startDate', label: 'Start Date', placeholder: 'Jan 2022' },
                { field: 'endDate',   label: 'End Date',   placeholder: 'Present' },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={item[field] || ''}
                    onChange={e => updateExperience(i, field, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all bg-white"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe your responsibilities and achievements..."
                  value={item.description || ''}
                  onChange={e => updateExperience(i, 'description', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all resize-none bg-white"
                />
                <button
                  onClick={() => improveWithAI(i, item.description)}
                  className="mt-2 text-xs text-purple-500 hover:underline"
                >
                  ✨ Improve with AI
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all"
      >
        <PlusIcon className="size-4" />
        Add Experience
      </button>

    </div>
  )
}

export default ExperienceForm