import React from 'react'

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  const handleGoLogin = () => {
    window.location.href = '/login'
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGoLogin}>Login</button>
    </div>
  )
}

export default Home
