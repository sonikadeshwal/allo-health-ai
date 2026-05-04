import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Landing from './pages/Landing.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AIConsult from './pages/AIConsult.jsx'
import HealthProfile from './pages/HealthProfile.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      {user && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/register" />} />
        <Route path="/consult" element={user ? <AIConsult user={user} /> : <Navigate to="/register" />} />
        <Route path="/profile" element={user ? <HealthProfile user={user} setUser={setUser} /> : <Navigate to="/register" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}
