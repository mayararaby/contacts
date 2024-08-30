import React, { useState } from 'react'
import "./index.css"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormField from './formField';
import { Alert } from '@mui/material';
import { useRegisterContact } from '../../hooks/useRegisterContact';
import { validationSchema } from '../../constants/form';

export const AddUser = () => {
  const { setUserContact } = useRegisterContact()
  const initialValues = {
    gender: '',
    name: {
      title: '',
      first: '',
      last: ''
    },
    location: {
      street: {
        number: '',
        name: ''
      },
      city: '',
      state: '',
      country: '',
      coordinates: {
        latitude: "",
        longitude: ""
      },
    },
    email: '',
    phone: '',
    picture: {
      large: ''
    }
  };
  const [preview, setPreview] = useState(null);


  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue('picture.large', file);
    // Set the image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };


  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log("values ==>", values)
    setUserContact(values)
  };

  return (
    <div className='user-card-info-add'>
      <div className='user-card-info-container'>
        <div className='user-card-image-header'>
          Create New Contact
        </div>
        <div className='user-card-info-description'>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={onSubmit}
            >
              {({ setFieldValue, isSubmitting, errors }) => (
                <Form>
                  <div>
                    <FormField label="First Name" name="name.first"
                      value={initialValues.name.first} type="text" hasError={errors?.name?.first} />
                  </div>

                  <div>
                    <FormField label="Last Name" name="name.last"
                      value={initialValues.name.last} type="text" hasError={errors?.name?.last} />
                  </div>
                  <div>
                    <Field
                      type={"file"}
                      onChange={(event) => handleImageChange(event, setFieldValue)}
                      name={"initialValues.picture.large"}
                      className={`input-field file-input-image ${errors?.picture?.large ? 'error input-field-error' : ''}`}
                    />

                    <ErrorMessage name={"picture.large"}>
                      {msg => (
                        <div className='inline-error'>
                          < Alert severity="error">{msg}</Alert>
                        </div>

                      )}
                    </ErrorMessage>
                    <div>{preview && < img className='image-container' src={preview} alt="mayar" />}</div>
                  </div>

                  <div className=''>
                    <div className='gender-form-container'>
                      <span className='gender-form-item'>
                        <span>Mr</span>
                        <span> <Field type="radio" name="name.title" value="Mr" /> </span>
                      </span>
                      <span className='gender-form-item'>
                        <span>Mrs</span>
                        <span> <Field type="radio" name="name.title" value="Mrs" /> </span>
                      </span>

                      <span className='gender-form-item'>
                        <span>Ms</span>
                        <span> <Field type="radio" name="name.title" value="Ms" /> </span>
                      </span>
                    </div>

                    <ErrorMessage name={"name.title"} className=''>
                      {msg => (
                        <Alert severity="error">{msg}</Alert>
                      )}
                    </ErrorMessage>
                  </div>

                  <div>
                    <FormField label="Phone" name="phone"
                      value={initialValues.phone} type="text" hasError={errors?.phone} />
                  </div>

                  <div>
                    <FormField label="Email" name="email"
                      value={initialValues.email} type="text" hasError={errors?.email} />
                  </div>

                  <div className=''>
                    <div className='gender-form-container'>
                      <span className='gender-form-item'>
                        <span>Male</span>
                        <span> <Field type="radio" name="gender" value="male" /> </span>
                      </span>
                      <span className='gender-form-item'>
                        <span>Female</span>
                        <span> <Field type="radio" name="gender" value="female" /> </span>
                      </span>
                    </div>

                    <ErrorMessage name={"gender"} className=''>
                      {msg => (
                        <Alert severity="error">{msg}</Alert>
                      )}
                    </ErrorMessage>

                  </div>

                  <div>
                    <FormField label="Street Number" name="location.street.number"
                      value={initialValues.location.street.number}
                      hasError={errors?.location?.street?.number} type="text" />
                  </div>

                  <div>
                    <FormField label="Street Name" name="location.street.name"
                      value={initialValues.location.street.name}
                      hasError={errors?.location?.street?.name} type="text" />
                  </div>

                  <div>
                    <FormField label="City" name="location.city"
                      value={initialValues.location.city}
                      hasError={errors?.location?.city} type="text" />
                  </div>

                  <div>
                    <FormField label="State" name="location.state"
                      value={initialValues.location.state}
                      hasError={errors?.location?.state} type="text" />

                  </div>

                  <div>
                    <FormField label="Country" name="location.country"
                      value={initialValues.location.country}
                      hasError={errors?.location?.country} type="text" />
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className='user-info-location cursor'
          >
            {/* <span> {`${street.number} ${street.name}, ${city}, ${state}, ${country}`} </span> */}

          </div>
        </div>
        {/* <div className='user-card-actions-container'>

        </div> */}
      </div>

    </div>
  )
}
