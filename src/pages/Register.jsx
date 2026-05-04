import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Heart, User, Mail, Phone, Calendar, ChevronRight, ChevronLeft, Check, Eye, EyeOff, Lock } from 'lucide-react'
import './Register.css'

const STEPS = ['Personal Info', 'Health Profile', 'Set Password']

export default function Register({ setUser }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    name: '', email: '', phone: '', dob: '', gender: '',
    height: '', weight: '', conditions: [], goals: [],
    password: '', confirmPassword: ''
  })

  const CONDITIONS = ['PCOS/PCOD', 'Diabetes', 'Thyroid', 'Hypertension', 'Anxiety/Depression', 'None']
  const GOALS = ['Improve Sexual Health', 'Track Menstrual Cycle', 'Manage Chronic Condition', 'General Wellness', 'Weight Management', 'Reduce Stress']

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const toggleArr = (field, val) => {
    setForm(f => {
      const arr = f[field]
      return { ...f, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }
    })
  }

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Name is required'
      if (!form.email.includes('@')) e.email = 'Valid email required'
      if (form.phone.length < 10) e.phone = 'Valid phone required'
      if (!form.dob) e.dob = 'Date of birth required'
      if (!form.gender) e.gender = 'Please select gender'
    }
    if (step === 1) {
      if (!form.height) e.height = 'Height required'
      if (!form.weight) e.weight = 'Weight required'
      if (form.goals.length === 0) e.goals = 'Select at least one goal'
    }
    if (step === 2) {
      if (form.password.length < 6) e.password = 'Minimum 6 characters'
      if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validate()) setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)

  const handleSubmit = () => {
    if (!validate()) return
    const bmi = (form.weight / ((form.height / 100) ** 2)).toFixed(1)
    const userData = {
      ...form,
      bmi,
      wellnessScore: Math.floor(Math.random() * 20 + 70),
      joinedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      consultations: 0
    }
    setUser(userData)
    navigate('/dashboard')
  }

  return (
    <div className="register-page">
      <div className="orb" style={{ width: 400, height: 400, background: '#7C3AED', top: '-80px', left: '-100px' }} />
      <div className="orb" style={{ width: 300, height: 300, background: '#EC4899', bottom: '-60px', right: '-80px', animationDelay: '4s' }} />

      <div className="register-container fade-in">
        {/* Logo */}
        <div className="reg-logo">
          <div className="logo-icon" style={{ width: 40, height: 40, borderRadius: 14 }}>
            <Heart size={20} fill="white" />
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.3rem' }}>
            Allo<span className="logo-accent">Health</span> AI
          </span>
        </div>

        <div className="register-card glass-strong">
          {/* Stepper */}
          <div className="stepper">
            {STEPS.map((s, i) => (
              <div key={i} className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="step-circle">
                  {i < step ? <Check size={14} /> : <span>{i + 1}</span>}
                </div>
                <span className="step-label">{s}</span>
                {i < STEPS.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
              </div>
            ))}
          </div>

          <div className="step-title">
            <h2>{step === 0 ? '👋 Welcome!' : step === 1 ? '🏥 Health Details' : '🔒 Secure Account'}</h2>
            <p>{step === 0 ? 'Tell us a little about yourself' : step === 1 ? 'Help us personalize your experience' : 'Create a strong password'}</p>
          </div>

          {/* Step 0 — Personal Info */}
          {step === 0 && (
            <div className="form-grid">
              <div className="form-group full">
                <label className="input-label">Full Name</label>
                <div className="input-wrap">
                  <User size={16} className="input-icon" />
                  <input id="reg-name" className={`input-field input-with-icon ${errors.name ? 'error' : ''}`} placeholder="Priya Sharma" value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                {errors.name && <span className="err-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="input-label">Email Address</label>
                <div className="input-wrap">
                  <Mail size={16} className="input-icon" />
                  <input id="reg-email" className={`input-field input-with-icon ${errors.email ? 'error' : ''}`} type="email" placeholder="you@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                {errors.email && <span className="err-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="input-label">Phone Number</label>
                <div className="input-wrap">
                  <Phone size={16} className="input-icon" />
                  <input id="reg-phone" className={`input-field input-with-icon ${errors.phone ? 'error' : ''}`} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                {errors.phone && <span className="err-msg">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="input-label">Date of Birth</label>
                <div className="input-wrap">
                  <Calendar size={16} className="input-icon" />
                  <input id="reg-dob" className={`input-field input-with-icon ${errors.dob ? 'error' : ''}`} type="date" value={form.dob} onChange={e => update('dob', e.target.value)} />
                </div>
                {errors.dob && <span className="err-msg">{errors.dob}</span>}
              </div>

              <div className="form-group full">
                <label className="input-label">Biological Gender</label>
                <div className="gender-pills">
                  {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => (
                    <button key={g} id={`gender-${g.toLowerCase().replace(/\s/g,'-')}`} className={`gender-pill ${form.gender === g ? 'selected' : ''}`} onClick={() => update('gender', g)}>
                      {g === 'Male' ? '♂' : g === 'Female' ? '♀' : '⚧'} {g}
                    </button>
                  ))}
                </div>
                {errors.gender && <span className="err-msg">{errors.gender}</span>}
              </div>
            </div>
          )}

          {/* Step 1 — Health Profile */}
          {step === 1 && (
            <div className="form-grid">
              <div className="form-group">
                <label className="input-label">Height (cm)</label>
                <input id="reg-height" className={`input-field ${errors.height ? 'error' : ''}`} type="number" placeholder="165" min="100" max="250" value={form.height} onChange={e => update('height', e.target.value)} />
                {errors.height && <span className="err-msg">{errors.height}</span>}
              </div>
              <div className="form-group">
                <label className="input-label">Weight (kg)</label>
                <input id="reg-weight" className={`input-field ${errors.weight ? 'error' : ''}`} type="number" placeholder="60" min="20" max="300" value={form.weight} onChange={e => update('weight', e.target.value)} />
                {errors.weight && <span className="err-msg">{errors.weight}</span>}
              </div>

              <div className="form-group full">
                <label className="input-label">Existing Conditions (select all that apply)</label>
                <div className="chip-group">
                  {CONDITIONS.map(c => (
                    <button key={c} id={`cond-${c.toLowerCase().replace(/\//g,'-').replace(/\s/g,'-')}`} className={`chip ${form.conditions.includes(c) ? 'chip-selected' : ''}`} onClick={() => toggleArr('conditions', c)}>
                      {form.conditions.includes(c) && <Check size={12} />} {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group full">
                <label className="input-label">Health Goals *</label>
                <div className="chip-group">
                  {GOALS.map(g => (
                    <button key={g} id={`goal-${g.toLowerCase().replace(/\s/g,'-')}`} className={`chip ${form.goals.includes(g) ? 'chip-selected' : ''}`} onClick={() => toggleArr('goals', g)}>
                      {form.goals.includes(g) && <Check size={12} />} {g}
                    </button>
                  ))}
                </div>
                {errors.goals && <span className="err-msg">{errors.goals}</span>}
              </div>
            </div>
          )}

          {/* Step 2 — Password */}
          {step === 2 && (
            <div className="form-grid">
              <div className="form-group full">
                <label className="input-label">Create Password</label>
                <div className="input-wrap">
                  <Lock size={16} className="input-icon" />
                  <input id="reg-password" className={`input-field input-with-icon pr-icon ${errors.password ? 'error' : ''}`} type={showPass ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password} onChange={e => update('password', e.target.value)} />
                  <button className="pass-toggle" onClick={() => setShowPass(!showPass)} id="toggle-pass">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="err-msg">{errors.password}</span>}
                <div className="pass-strength">
                  <div className={`strength-bar ${form.password.length >= 8 ? 'strong' : form.password.length >= 6 ? 'medium' : form.password.length > 0 ? 'weak' : ''}`} />
                  <div className={`strength-bar ${form.password.length >= 8 ? 'strong' : ''}`} />
                  <div className={`strength-bar ${form.password.length >= 10 ? 'strong' : ''}`} />
                </div>
              </div>

              <div className="form-group full">
                <label className="input-label">Confirm Password</label>
                <div className="input-wrap">
                  <Lock size={16} className="input-icon" />
                  <input id="reg-confirm-password" className={`input-field input-with-icon ${errors.confirmPassword ? 'error' : ''}`} type="password" placeholder="Re-enter password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
                </div>
                {errors.confirmPassword && <span className="err-msg">{errors.confirmPassword}</span>}
              </div>

              <div className="form-group full">
                <div className="terms-box">
                  <input type="checkbox" id="agree-terms" defaultChecked />
                  <label htmlFor="agree-terms">
                    I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. I understand this is for educational health information only.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="step-actions">
            {step > 0 && (
              <button className="btn-outline" onClick={back} id="reg-back-btn">
                <ChevronLeft size={16} /> Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button className="btn-primary" onClick={next} id="reg-next-btn" style={{ marginLeft: 'auto' }}>
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit} id="reg-submit-btn" style={{ marginLeft: 'auto' }}>
                Create Account <Check size={16} />
              </button>
            )}
          </div>

          <p className="reg-signin">
            Already have an account? <Link to="/register">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
