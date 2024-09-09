import React, { useEffect } from 'react'
import '../../styles/Accounts.css'
import moment from 'moment'

const TransactionHistory = ({ transactions }) => {
  useEffect(() => {
    console.log('transactions: ', transactions)
  }, [])

  return (
    <div className="details-wrapper">
      <table>
        <thead>
          <tr>
            <th
              style={{
                width: 100,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Sr No.
            </th>
            <th
              style={{
                width: 125,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Date
            </th>
            <th
              style={{
                width: 500,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Details
            </th>
            <th
              style={{
                width: 125,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Credit
            </th>
            <th
              style={{
                width: 125,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Debit
            </th>
            <th
              style={{
                width: 200,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {!!transactions?.length ? (
            [...transactions]?.reverse()?.map((row, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}>{i + 1}</td>
                <td>
                  {moment(row?.dateOfTransaction).format(
                    'DD-MM-YYYY hh:mm:ss A'
                  )}
                </td>
                <td>{row?.details}</td>
                <td>
                  {row?.isCredit ? `Rs. ${Number(row?.amount).toFixed(2)}` : ''}
                </td>
                <td>
                  {!row?.isCredit
                    ? `Rs. ${Number(row?.amount).toFixed(2)}`
                    : ''}
                </td>
                <td>Rs. {Number(row?.balanceAtThatTime).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                No Transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionHistory
