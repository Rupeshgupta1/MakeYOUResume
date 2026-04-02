import React, { useRef } from 'react'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  LinkedinIcon,
  GlobeIcon,
} from 'lucide-react'

const PersonalInfoForm = ({ data = {}, onChange }) => {

  const imageInputRef = useRef(null)

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange('image', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const fields = [
    {
      key: 'name',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      type: 'text',
      icon: UserIcon,
      required: true,
    },
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email address',
      type: 'email',
      icon: MailIcon,
      required: true,
    },
    {
      key: 'phone',
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      type: 'text',
      icon: PhoneIcon,
      required: false,
    },
    {
      key: 'location',
      label: 'Location',
      placeholder: 'Enter your location',
      type: 'text',
      icon: MapPinIcon,
      required: false,
    },
    {
      key: 'profession',
      label: 'Profession',
      placeholder: 'Enter your profession',
      type: 'text',
      icon: BriefcaseIcon,
      required: false,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn Profile',
      placeholder: 'Enter your linkedin profile',
      type: 'url',
      icon: LinkedinIcon,
      required: false,
    },
    {
      key: 'website',
      label: 'Personal Website',
      placeholder: 'Enter your personal website',
      type: 'url',
      icon: GlobeIcon,
      required: false,
    },
  ]

  return (
    <div className="space-y-4">

      {/* Upload Image */}
      <div>
<input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => imageInputRef.current.click()}
          className="flex items-center gap-3 group"
        >
          {/* Circle with icon or uploaded image */}
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 
                          flex items-center justify-center overflow-hidden
                          group-hover:border-indigo-400 transition-all bg-slate-50">
            {data.image ? (
              <img
                src={data.image}
                alt="user"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <UserIcon className="size-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            )}
          </div>
          <span className="text-sm text-slate-500 group-hover:text-indigo-500 transition-colors">
            upload user image
          </span>
        </button>
      </div>

      {/* Fields */}
      {fields.map(({ key, label, placeholder, type, icon: Icon, required }) => (
        <div key={key}>
<label htmlFor={key} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
            <Icon className="size-3.5 text-slate-400" />
            {label}
            {required && <span className="text-red-400">*</span>}
          </label>
<input
            id={key}
            name={key}
            type={type}
            placeholder={placeholder}
            value={data[key] || ''}
            onChange={e => handleChange(key, e.target.value)}
            required={required}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg
                       placeholder:text-slate-300
                       focus:outline-none focus:ring-2 focus:ring-indigo-200
                       focus:border-indigo-400 transition-all bg-white"
          />
        </div>
      ))}

    </div>
  )
}

export default PersonalInfoForm