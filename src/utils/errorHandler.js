import React from 'react'
import sweetAlert from 'sweetalert'

const errorHandler = (err) => {
  console.log(err)
  const error = err.response.data

  sweetAlert(
    error?.message ?? 'Oops...',
    error?.description ?? 'Something went wrong!',
    'error'
  )
}

export default errorHandler
