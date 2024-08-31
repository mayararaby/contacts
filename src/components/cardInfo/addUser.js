import React, { useState } from 'react'
import "./index.css"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormField from './formikField';
import { Alert } from '@mui/material';
import { useRegisterContact } from '../../hooks/useRegisterContact';
import { validationSchema } from '../../constants/form';
import { accessUserLocation } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmergencyIcon from '@mui/icons-material/Emergency';
/**
 * @module Add
 * @description form for adding new contact user
 * @param {*} param0 
 * @returns {JSX}
 */
export const UserDataActions = ({ selectedContact }) => {
  const { setUserContact } = useRegisterContact()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const initialValues = {
    gender: selectedContact?.gender || '',
    name: {
      title: selectedContact?.name?.title || '',
      first: selectedContact?.name?.first || '',
      last: selectedContact?.name?.last || ''
    },
    location: {
      street: {
        number: selectedContact?.location?.street?.number || '',
        name: selectedContact?.location?.street?.name || ''
      },
      city: selectedContact?.location?.city || '',
      state: selectedContact?.location?.state || '',
      country: selectedContact?.location?.country || '',
      coordinates: {
        latitude: selectedContact?.location?.coordinates?.latitude || "",
        longitude: selectedContact?.location?.coordinates?.longitude || ""
      },
    },
    email: selectedContact?.email || '',
    phone: selectedContact?.phone || '',
    picture: {
      large: selectedContact?.picture?.large || ''
    }
  };

  const [preview, setPreview] = useState(selectedContact?.picture.large);
  const availableContacts = useSelector((state) => state.contacts);

  /**
   * @description render image run time to user
   * @param {*} event 
   * @param {Function} setFieldValue formik built-in function to set value for field in run time
   */
  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];

    if (file) {
      // Convert the file to a base64 string to prevent mutation issues
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFieldValue('picture.large', base64String);
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setFieldValue('picture.large', null);
      setPreview(null);
    }
  };


  /**
   * @description Add user location
   * @param {*} setFieldValue 
   */
  const handleLocationClick = (setFieldValue) => {
    accessUserLocation(({ latitude, longitude }) => {
      setFieldValue('location.coordinates.latitude', latitude);
      setFieldValue('location.coordinates.longitude', longitude);
    });
  };


  /**
   * @description submit form
   * @param {*} values 
   * @param {*} param1 
   */
  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    setUserContact({ data: values, uuid: selectedContact?.uuid, type: selectedContact ? "edit" : "add", dispatch, navigate, availableContacts })
  };

  return (
    <div className='user-card-info-add'>
      <div className='user-card-info-container user-card-info-container-form'>
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
                    <FormField label="Title" name="name.title"
                      value={initialValues.name.title} type="text" hasError={errors?.name?.title} />
                  </div>

                  <div>
                    <FormField label="First Name" name="name.first"
                      value={initialValues.name.first} type="text" hasError={errors?.name?.first} />
                  </div>

                  <div>
                    <FormField label="Last Name" name="name.last"
                      value={initialValues.name.last} type="text" hasError={errors?.name?.last} />
                  </div>
                  <div>
                    <div className='field-label-container'> <label className="input-label">Profile image</label> <span><EmergencyIcon sx={{ color: "var(--error-color)" }} /></span></div>
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
                    <div>{preview && < img className='image-container' src={preview} alt="profile" />}</div>
                  </div>

                  <div>
                    <FormField label="Phone" name="phone"
                      value={initialValues.phone} type="text" hasError={errors?.phone} />
                  </div>

                  <div>
                    <FormField label="Email" name="email"
                      value={initialValues.email} type="email" hasError={errors?.email} />
                  </div>

                  <div className=''>
                    <div className='field-label-container'> <label className="input-label">Gender</label> <span><EmergencyIcon sx={{ color: "var(--error-color)" }} /></span></div>
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

                    <ErrorMessage name="gender" className=''>
                      {msg => (
                        <Alert severity="error">{msg}</Alert>
                      )}
                    </ErrorMessage>

                  </div>

                  <div>
                    <FormField label="Street Number" name="location.street.number"
                      value={initialValues.location.street.number}
                      hasError={errors?.location?.street?.number} type="number" />
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

                  <div>
                    <div onClick={() => { handleLocationClick(setFieldValue) }} className='sub-theme-button'>
                      Get Location
                    </div>

                    <FormField label="Longitude" name="location.coordinates.longitude"
                      value={initialValues.location.coordinates.longitude}
                      hasError={errors?.location?.coordinates?.longitude} type="text" disabled={true} />
                    <FormField label="Latitude" name="location.coordinates.latitude"
                      value={initialValues.location.coordinates.latitude}
                      hasError={errors?.location?.coordinates?.latitude} type="text" disabled={true} />
                  </div>

                  <button type="submit" className='main-theme-button' disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>


        </div>
      </div>

    </div>
  )
}
