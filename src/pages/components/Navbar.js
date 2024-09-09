import React from 'react'
import '../../styles/Navbar.css'

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = ['View Profile', 'Transaction Details']

  return (
    <div className="navbarWrapper">
      <div className="tabs">
        {tabs?.map((tab, i) => (
          <label
            style={{
              backgroundColor: `rgb(65, 105, 225, ${
                activeTab == tab ? '1' : '0.5'
              })`,
            }}
            key={i}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </label>
        ))}
      </div>
    </div>
  )
}

export default Navbar
