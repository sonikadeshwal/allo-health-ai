import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Heart, LayoutDashboard, MessageCircleHeart, User, LogOut, Menu, X } from 'lucide-react'
import './Navbar.css'

export default function Navbar({ user, setUser }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  const navLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
    { to: '/consult', icon: <MessageCircleHeart size={16} />, label: 'AI Consult' },
    { to: '/profile', icon: <User size={16} />, label: 'My Profile' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-logo">
          <div className="logo-icon">
            <Heart size={18} fill="white" />
          </div>
          <span>Allo<span className="logo-accent">Health</span></span>
          <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>AI</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          <div className="user-avatar">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="user-name">{user?.name?.split(' ')[0]}</span>
          <button className="btn-ghost logout-btn" onClick={handleLogout} id="logout-btn">
            <LogOut size={15} />
            Logout
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} id="menu-toggle">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.icon} {link.label}
            </Link>
          ))}
          <button className="mobile-link logout-mobile" onClick={handleLogout}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </nav>
  )
}
