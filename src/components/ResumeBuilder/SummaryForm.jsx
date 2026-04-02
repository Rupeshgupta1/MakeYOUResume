import React, { useState } from 'react'
import { SparklesIcon } from 'lucide-react'

const SummaryForm = ({ data = '', onChange }) => {
  const [loading, setLoading] = useState(false)

  const handleAI = async () => {
    console.log('Key:', import.meta.env.VITE_OPENROUTER_KEY) // ← ye add karo
    if (!data) {
      alert('Write something first for  AI enhancing ')
      return
    }

    setLoading(true)

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "MakeYOURresume"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Improve this resume summary professionally:\n${data}`
            }
          ]
        })
      })

      const result = await res.json()
      const aiText = result?.choices?.[0]?.message?.content

      if (aiText) {
        onChange(aiText)
      } else {
        alert("AI failed")
      }

    } catch (err) {
      console.error(err)
      alert("Error using AI")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

      {/* AI Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={handleAI}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-purple-50 text-purple-500 rounded-full hover:bg-purple-100 transition-all disabled:opacity-50"
        >
          <SparklesIcon className="size-3.5" />
          {loading ? 'Generating...' : 'AI Enhance'}
        </button>
      </div>

      {/* Textarea */}
      <textarea
        rows={6}
        value={data}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg"
      />

    </div>
  )
}

export default SummaryForm