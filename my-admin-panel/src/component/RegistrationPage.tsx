// registration.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './RegistrationPage.css'; // Make sure to import the registration styles
import axios from 'axios';
const Registration: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: () => {
      // Handle registration logic here
      axios.post("https://levitationbackend-3wav.onrender.com/register",{
        name: formik.values.name,
        email: formik.values.email,
        password: formik.values.password
      })
      .then((res)=>{
        console.log(res);
        // if(){
        //   alert("User Registered");
        //   console.log(res);
        // } 
      })
      .catch((err)=>{
        console.log(err);
      })
    },
  });

  return (
    <div className="registration-box">
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            required
          />
          <label htmlFor="name">Name:</label>
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="user-box">
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          <label htmlFor="email">Email:</label>
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="user-box">
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
          />
          <label htmlFor="password">Password:</label>
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <button className='register' type="submit">Register</button>
      </form>

      {/* Add your navigation link here if needed */}
      {/* Example: <a href="/">Already have an account? Login here</a> */}
    </div>
  );
};

export default Registration;
