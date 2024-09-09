import { Button, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../styles/Accounts.css'
import { useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import TransactionHistory from './components/TransactionHistory'
import sweetAlert from 'sweetalert'

const Account = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('View Profile')
  const [userData, setUserData] = useState({})
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  const allRegisteredUsers = !!localStorage.getItem('allRegisteredUsers')
    ? JSON.parse(localStorage.getItem('allRegisteredUsers'))
    : []

  useEffect(() => {
    if (!loggedInUser?.username) {
      navigate('/')
      sweetAlert('Oops...', 'Please login first!!', 'info')
    }
    setUserData(
      allRegisteredUsers.find((user) => user.username == loggedInUser?.username)
    )
  }, [])

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  return (
    <div className="accountWrapper">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <Paper elevation={4} className="accContainer">
        <h1>{activeTab}</h1>
        {activeTab == 'View Profile' ? (
          <Profile userData={userData} setUserData={setUserData} />
        ) : (
          <TransactionHistory transactions={userData?.transactionHistory} />
        )}
        <Button
          className="bttn"
          variant="outlined"
          color="error"
          onClick={logout}
        >
          Logout
        </Button>
      </Paper>
    </div>
  )
}

export default Account
