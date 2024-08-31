import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Alert } from '@mui/material';
import EmergencyIcon from '@mui/icons-material/Emergency';

/**
 * @module FormikField
 * @param {*} param0 
 * @returns {JSX}
 */
const FormField = ({ label, name, type = 'text', className = '', hasError, value, disabled = false }) => (

  <div className={`form-field ${className}`}>
    <div className='field-label-container'> <label className="input-label">{label}</label> <span><EmergencyIcon sx={{ color: "var(--error-color)" }} /></span></div>
    <Field
      disabled={disabled}
      type={type}
      name={name}
      className={`input-field ${hasError ? 'error input-field-error' : ''}`}
    />
    <ErrorMessage name={name}>
      {msg => (
        <div className='inline-error'>
          < Alert severity="error">{msg}</Alert>
        </div>

      )}
    </ErrorMessage>
  </div>
);

export default FormField;
