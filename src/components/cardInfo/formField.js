import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Alert } from '@mui/material';

const FormField = ({ label, name, type = 'text', className = '', hasError, value }) => (

  <div className={`form-field ${className}`}>
    <label className="input-label">{label}</label>
    <Field
      // value={value}
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
