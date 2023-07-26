import React from 'react'

export const Input = ({ value, onChange, placeholder, containerClassName, inputClassName, isError, errorMessage}) => {
  return (
    <div className={containerClassName}>
      <input 
          value = {value}
          onChange = {(e) => onChange(e.target.value)}
          placeholder = {placeholder}
          className = {`${isError ? 'border-danger' : 'border-grey'} border border-1 w-100 rounded-1 ${inputClassName}`}
      />
      {
        isError
        ? <div style={{fontSize: '14px'}} className='text-danger mt-1'>{errorMessage}</div>
        : <></>
      }
    </div>
  )
}