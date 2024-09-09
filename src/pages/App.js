import React, { useState } from 'react'
import '../styles/App.css'
import { Button, CircularProgress, Paper, TextField } from '@mui/material'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import sweetAlert from 'sweetalert'

const App = () => {
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const checkValidations = (data) => {
    const isValidUsername = validator.isEmail(data.username)
    const isValidPassword =
      validator.isAlphanumeric(data.password) && data.password?.length >= 8

    if (!isValidUsername) {
      setError('username', {
        type: 'manual',
        message: 'Please enter a valid email',
      })
    }

    if (!isValidPassword) {
      setError('password', {
        type: 'manual',
        message: (
          <ul style={{ margin: 0 }}>
            <li>Only alphanumeric characters allowed</li>
            <li>Minimum 8 characters allowed</li>
          </ul>
        ),
      })
    }

    return isValidUsername && isValidPassword
  }

  const login = (data) => {
    if (checkValidations(data)) {
      setLoader(true)

      const allRegisteredUsers = !!localStorage.getItem('allRegisteredUsers')
        ? JSON.parse(localStorage.getItem('allRegisteredUsers'))
        : []

      const user = allRegisteredUsers.find(
        (user) =>
          user.username === data.username && user.password === data.password
      )

      if (user) {
        setLoader(false)
        localStorage.setItem('loggedInUser', JSON.stringify(user))
        navigate('/account')
      } else {
        setLoader(false)
        sweetAlert('Oops...', 'Invalid Username or Password!!', 'error')
      }
    }
  }

  return (
    <div className="wrapper">
      <Paper elevation={4} className="container">
        <form className="formWrapper" onSubmit={handleSubmit(login)}>
          <h1>LOGIN</h1>
          <TextField
            required
            label="Email"
            variant="outlined"
            {...register('username')}
            error={!!errors.username}
            helperText={errors?.username?.message ?? ''}
          />
          <TextField
            required
            label="Password"
            variant="outlined"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors?.password?.message ?? ''}
            FormHelperTextProps={{ style: { marginLeft: 0 } }} // Remove margin
          />

          <Button
            className="bttn"
            disabled={loader}
            variant="contained"
            type="submit"
            color="success"
          >
            {loader ? <CircularProgress color="success" size={20} /> : 'Login'}
          </Button>
          <div className="register-label">
            Don't have an account?
            <Link to="/register"> Create here</Link>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default App
