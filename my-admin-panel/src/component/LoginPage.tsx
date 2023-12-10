// LoginPage.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './LoginPage.css';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
const LoginPage: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      // Your login logic goes here
      axios.post("https://levitationbackend-3wav.onrender.com/login",{
        email: formik.values.email,
        password: formik.values.password
      })
      .then((res)=>{
        console.log(res);
        if(res.data.code==0){
          alert("Logged In");
          console.log(res);
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    },
  });

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
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
          <label>Email:</label>
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

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
          <label>Password:</label>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}

        <button className='register' type="submit">Login</button>

        <a href="#" className='loginreg'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        <Link  to="/register">Register</Link>
        </a>
      </form>
    </div>
  );
};

export default LoginPage;