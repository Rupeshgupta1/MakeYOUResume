import React, { useState } from 'react'
import { PlusIcon, WrenchIcon } from 'lucide-react'

const SkillsForm = ({ data = [], onChange }) => {
  const [input, setInput] = useState('')

  const addSkill = () => {
    const trimmed = input.trim()
    if (trimmed && !data.includes(trimmed)) {
      onChange([...data, trimmed])
      setInput('')
    }
  }

  const removeSkill = (skill) => {
    onChange(data.filter(s => s !== skill))
  }

  return (
    <div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-slate-300 mb-3">
          <WrenchIcon className="size-10 mb-3 stroke-1" />
          <p className="text-sm">No skills added yet.</p>
          <p className="text-xs">Type a skill and press Enter or click Add.</p>
        </div>
      )}

      {/* Skills Tags */}
      {data.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {data.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-red-500 transition-colors text-indigo-400 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. React, Python, Figma..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addSkill()}
          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg
                     placeholder:text-slate-300
                     focus:outline-none focus:ring-2 focus:ring-indigo-200
                     focus:border-indigo-400 transition-all bg-white"
        />
        <button
          onClick={addSkill}
          className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-all active:scale-95"
        >
          <PlusIcon className="size-4" />
          Add
        </button>
      </div>

    </div>
  )
}

export default SkillsForm