import * as Yup from 'yup';

export const validationSchema = Yup.object({
  gender: Yup.string().required('Gender is required'),
  name: Yup.object({
    title: Yup.string().required('Title is required'),
    first: Yup.string().required('First name is required'),
    last: Yup.string().required('Last name is required'),
  }),
  location: Yup.object({
    street: Yup.object({
      number: Yup.number().required('Street number is required'),
      name: Yup.string().required('Street name is required'),
    }),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    coordinates:Yup.object({
      longitude: Yup.string().required('Longitude is required'),
      latitude: Yup.string().required('Latitude is required'),
    })
  }),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Phone number must be only digits'),
  picture: Yup.object({
    large: Yup.string().required('Image is required'),
  }),
});
