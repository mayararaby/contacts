import React from "react"
export const InputField = ({ label, type, value, name, handleInputChange }) => {
  return (
    <div className={`form-field`}>
      <label className="input-label">{label}</label>
      <input type={type} value={value} name={name} className={`input-field`} onChange={handleInputChange} />
    </div>
  )
}

export const RadioField = ({ label, options }) => {
  return (
  <div className='radio-field'>
    <label className="input-label">{label}</label>
    <div className='gender-form-container'>
      {options.map((option => (
        <span className='gender-form-item'>
          <span>{option.title}</span>
          <span> <input type="radio" name={option.name} value={option.value} /></span>
        </span>
      )))
      }
    </div>
  </div>
  )
}