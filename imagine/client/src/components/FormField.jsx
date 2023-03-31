import React from 'react'

const FormField = ({
  value,
  labelName,
  type,
  name,
  placeholder,
  handleChange,
  isSurpriseMe,
  handleSurprise,
  required,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-sm font-semibold text-gray-900">
          {labelName} {required && <span className="text-sm text-red-500">*</span>}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurprise}
            className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-md text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  )
}

export default FormField
