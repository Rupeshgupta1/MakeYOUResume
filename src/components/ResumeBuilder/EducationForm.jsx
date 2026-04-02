import React, { useState, useEffect } from 'react'
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon, GraduationCapIcon } from 'lucide-react'

const EducationForm = ({ data = [], onChange, shouldCloseAll }) => {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    if (shouldCloseAll) {
      setOpenIndex(null)
    }
  }, [shouldCloseAll])

  const addEducation = () => {
    onChange([...data, { school: '', degree: '', startDate: '', endDate: '' }])
    setOpenIndex(data.length)
  }

  const removeEducation = (i) => {
    onChange(data.filter((_, idx) => idx !== i))
    setOpenIndex(null)
  }

  const updateEducation = (i, field, value) => {
    onChange(data.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
  }

  return (
    <div className="space-y-3">

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-slate-300">
          <GraduationCapIcon className="size-10 mb-3 stroke-1" />
          <p className="text-sm">No education added yet.</p>
          <p className="text-xs">Click "Add Education" to get started.</p>
        </div>
      )}

      {data.map((item, i) => (
        <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
          <div
            className="flex items-center justify-between px-4 py-3 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-all"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="text-sm font-medium text-slate-700 truncate">
              {item.degree || item.school || `Education ${i + 1}`}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <TrashIcon
                onClick={e => { e.stopPropagation(); removeEducation(i) }}
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
                { field: 'school',    label: 'School / University', placeholder: 'MIT' },
                { field: 'degree',    label: 'Degree',              placeholder: 'B.Tech Computer Science' },
                { field: 'startDate', label: 'Start Date',          placeholder: '2018' },
                { field: 'endDate',   label: 'End Date',            placeholder: '2022' },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={item[field] || ''}
                    onChange={e => updateEducation(i, field, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all bg-white"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all"
      >
        <PlusIcon className="size-4" />
        Add Education
      </button>
    </div>
  )
}

export default EducationForm