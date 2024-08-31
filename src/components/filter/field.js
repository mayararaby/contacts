import React from "react"
export const InputField = ({ label, type, value, name, handleInputChange }) => {
  return (
    <div className={`form-field`}>
      <label className="input-label">{label}</label>
      <input type={type} value={value} name={name} className={`input-field`} onChange={handleInputChange} />
    </div>
  )
}

export const RadioField = ({ label, options , handleInputChange }) => {
  return (
  <div className='radio-field'>
    <label className="input-label">{label}</label>
    <div className='gender-form-container'>
      {options.map(((option,index) => (
        <span className='gender-form-item' key={`${label}${option.name}${index}`}>
          <span>{option.title}</span>
          <span> <input type="radio"  checked= {option.value === option.inputName} id={option.name}  name={option.inputName} onChange={handleInputChange} /></span>
        </span>
      )))
      }
    </div>
  </div>
  )
}