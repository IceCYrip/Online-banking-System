import React, { useState } from 'react'
import '../styles/Register.css'
import { Button, CircularProgress, Paper, TextField } from '@mui/material'

import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import sweetAlert from 'sweetalert'

const Register = () => {
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm()

  const checkValidations = (data) => {
    const isValidFullName = !!data?.fullName
    const isValidUsername = validator.isEmail(data.username)
    const isValidPassword =
      validator.isAlphanumeric(data.password) && data.password?.length >= 8
    const isValidConfirmPassword = data?.password === data?.confirmPassword
    const isValidAccountNo = !!data?.accountNo && data?.accountNo?.length == 12
    const isValidMobileNumber = !data?.mobileNumber
      ? true
      : validator.isNumeric(data?.mobileNumber) &&
        data?.mobileNumber?.length === 10

    if (!isValidFullName) {
      setError('fullName', {
        type: 'manual',
        message: 'Please enter a name',
      })
    }

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

    if (!isValidConfirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Password does not match',
      })
    }

    if (!isValidAccountNo) {
      setError('accountNo', {
        type: 'manual',
        message: 'Please enter a 12 digit valid account no.',
      })
    }

    if (!isValidMobileNumber) {
      setError('mobileNumber', {
        type: 'manual',
        message: 'Invalide mobile number',
      })
    }

    return (
      isValidFullName &&
      isValidUsername &&
      isValidPassword &&
      isValidConfirmPassword &&
      isValidAccountNo &&
      isValidMobileNumber
    )
  }

  const registerUser = (data) => {
    if (checkValidations(data)) {
      setLoader(true)

      const allRegisteredUsers = !!localStorage.getItem('allRegisteredUsers')
        ? JSON.parse(localStorage.getItem('allRegisteredUsers'))
        : []

      const isExisting = allRegisteredUsers?.find(
        (user) => user?.username === data?.username
      )

      if (isExisting?.username) {
        sweetAlert('Oops...', 'User already exists', 'error')
        setLoader(false)
      } else {
        const { confirmPassword, ...restData } = data
        const newUser = {
          ...restData,
          transactionHistory: [],
          balance: 0,
        }
        allRegisteredUsers.push(newUser)

        localStorage.setItem(
          'allRegisteredUsers',
          JSON.stringify(allRegisteredUsers)
        )

        sweetAlert('Success', 'User registered successfully', 'success')
        setLoader(false)
        localStorage.setItem('loggedInUser', JSON.stringify(newUser))
        navigate('/account')
      }
    }
  }

  return (
    <div className="wrapper">
      <Paper elevation={4} className="container">
        <form
          className="registerFormWrapper"
          onSubmit={handleSubmit(registerUser)}
        >
          <h1>REGISTER</h1>
          <TextField
            label="Name"
            variant="outlined"
            {...register('fullName')}
            error={!!errors.fullName}
            helperText={errors?.fullName?.message ?? ''}
          />
          <TextField
            label="Account No."
            variant="outlined"
            {...register('accountNo')}
            error={!!errors.accountNo}
            helperText={errors?.accountNo?.message ?? ''}
          />
          <TextField
            label="Email"
            variant="outlined"
            {...register('username')}
            error={!!errors.username}
            helperText={errors?.username?.message ?? ''}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors?.password?.message ?? ''}
            FormHelperTextProps={{ style: { marginLeft: 0 } }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message ?? ''}
          />

          <TextField
            // required
            label="Mobile Number"
            variant="outlined"
            {...register('mobileNumber')}
            error={!!errors.mobileNumber}
            helperText={errors?.mobileNumber?.message ?? ''}
            FormHelperTextProps={{ style: { marginLeft: 0 } }} // Remove margin
          />

          <Button
            className="bttn"
            disabled={loader}
            variant="contained"
            type="submit"
            color="success"
          >
            {loader ? (
              <CircularProgress color="success" size={20} />
            ) : (
              'Create an account'
            )}
          </Button>
          <div className="register-label">
            Already have an account?
            <Link to="/"> Login</Link>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default Register
