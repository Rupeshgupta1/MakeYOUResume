import React from 'react'

const ResumePreview = ({ data }) => {
  const info = data?.personal_info || {}
  const accent = data?.accent_color || '#3B82F6'

  return (
    <div className="flex justify-center">
      <div
        id="resume-preview"
        style={{
          width: '794px',       // A4 width
          minHeight: '1123px',  // A4 height
          padding: '32px',
          background: '#fff',
        }}
        className="shadow-md"
      >

        {/* Header */}
        <div className="text-center mb-4">
          {info.image && (
            <img
              src={info.image}
              alt="profile"
              className="w-20 h-20 mx-auto rounded-full mb-3"
            />
          )}
          <h1 className="text-3xl font-bold" style={{ color: accent }}>
            {info.name || 'Your Name'}
          </h1>
          <p className="text-sm text-gray-500">{info.profession}</p>
        </div>

        <hr className="mb-4" />

        {/* Contact */}
        <div className="text-center text-xs text-gray-500 mb-6 space-x-3">
          <span>{info.email}</span>
          <span>{info.phone}</span>
          <span>{info.location}</span>
        </div>

        {/* Summary */}
        {data.professional_summary && (
          <div className="mb-5">
            <h2 className="text-xs font-bold mb-1" style={{ color: accent }}>Summary</h2>
            <hr style={{ borderColor: accent }} className="mb-2" />
            <p className="text-xs text-gray-700">{data.professional_summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold mb-1" style={{ color: accent }}>Experience</h2>
            <hr style={{ borderColor: accent }} className="mb-2" />
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs font-semibold">{exp.role}</p>
                    <p className="text-xs text-gray-500">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-xs text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <div className="mb-5">
            <h2 className="text-xs font-bold mb-1" style={{ color: accent }}>Education</h2>
            <hr style={{ borderColor: accent }} className="mb-2" />
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between mb-2">
                <div>
                  <p className="text-xs font-semibold">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.school}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div>
            <h2 className="text-xs font-bold mb-1" style={{ color: accent }}>Skills</h2>
            <hr style={{ borderColor: accent }} className="mb-2" />
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 border rounded"
                  style={{ borderColor: accent, color: accent }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ResumePreview