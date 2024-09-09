import React, { useState } from 'react'
import '../../styles/Accounts.css'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import sweetAlert from 'sweetalert'

const Profile = ({ userData, setUserData }) => {
  const [allRegisteredUsers, setAllRegisteredUsers] = useState(
    !!localStorage.getItem('allRegisteredUsers')
      ? JSON.parse(localStorage.getItem('allRegisteredUsers'))
      : []
  )

  const {
    register,
    setError,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      details: '',
      amount: 0,
    },
  })

  const checkValidations = (data) => {
    const isValidDetails = !!data?.details
    const isValidAmount = !!Number(data?.amount)

    if (!isValidDetails) {
      setError('details', {
        type: 'manual',
        message: 'Please enter transaction details',
      })
    }
    if (!isValidAmount) {
      setError('amount', {
        type: 'manual',
        message: 'Please enter a valid amount',
      })
    }

    return isValidDetails && isValidAmount
  }

  const transaction = (typeOfTransaction) => {
    if (
      checkValidations({ details: watch('details'), amount: watch('amount') })
    ) {
      if (
        typeOfTransaction == 'debit' &&
        userData?.balance - +watch('amount') < 0
      ) {
        sweetAlert('Oops...', 'Insufficient balance!', 'error')
      } else {
        // Add transaction history
        const user = {
          ...userData,
          balance:
            typeOfTransaction == 'credit'
              ? +userData?.balance + +watch('amount')
              : +userData?.balance - +watch('amount'),
          transactionHistory: [
            ...userData?.transactionHistory,
            {
              dateOfTransaction: new Date(),
              details: watch('details'),
              isCredit: typeOfTransaction == 'credit',
              amount: watch('amount'),
              balanceAtThatTime:
                typeOfTransaction == 'credit'
                  ? +userData?.balance + +watch('amount')
                  : +userData?.balance - +watch('amount'),
            },
          ],
        }
        // Update balance
        const updatedUserList = allRegisteredUsers?.map((savedUser) =>
          savedUser?.username == userData?.username ? user : savedUser
        )

        localStorage.setItem(
          'allRegisteredUsers',
          JSON.stringify(updatedUserList)
        )
        localStorage.setItem('balance', JSON.stringify(+user?.balance))
        setUserData(user)
        setAllRegisteredUsers(updatedUserList)

        sweetAlert(
          'Transaction Successful',
          `${
            typeOfTransaction == 'credit' ? 'Credited' : 'Debited'
          } Rs. ${+watch('amount')} successfully`,
          'success'
        )

        reset()
      }
    }
  }

  return (
    <div className="details-wrapper">
      <table>
        <tbody>
          <tr>
            <th>Name: </th>
            <td>{userData?.fullName}</td>
          </tr>
          <tr>
            <th>Account No: </th>
            <td>{userData?.accountNo}</td>
          </tr>
          <tr>
            <th>Mobile No.: </th>
            <td>{userData?.mobileNumber}</td>
          </tr>
          <tr>
            <th>E-mail: </th>
            <td>{userData?.username}</td>
          </tr>
          <tr>
            <th>Available balance: </th>
            <th>Rs. {userData?.balance}</th>
          </tr>
        </tbody>
      </table>
      <div className="transactionWrapper">
        <h3>Transaction</h3>
        <div className="inputFields">
          <TextField
            required
            label="Transaction Details"
            variant="outlined"
            {...register('details')}
            onChange={() => clearErrors('details')}
            error={!!errors.details}
            helperText={errors?.details?.message ?? ''}
            FormHelperTextProps={{ style: { marginLeft: 5 } }} // Remove margin
            sx={{ width: '65%' }}
          />
          <TextField
            required
            label="Amount"
            variant="outlined"
            {...register('amount')}
            onChange={() => clearErrors('amount')}
            error={!!errors.amount}
            helperText={errors?.amount?.message ?? ''}
            FormHelperTextProps={{ style: { marginLeft: 5 } }} // Remove margin
            sx={{ width: '35%' }}
          />
        </div>
        <div className="transactionBttns">
          <Button
            className="bttn"
            variant="contained"
            color="success"
            onClick={() => transaction('credit')}
            sx={{ width: '50%' }}
          >
            Credit
          </Button>
          <Button
            className="bttn"
            variant="contained"
            color="error"
            onClick={() => transaction('debit')}
            sx={{ width: '50%' }}
          >
            Debit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
