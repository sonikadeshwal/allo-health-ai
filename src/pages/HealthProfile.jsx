import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Calendar, Ruler, Weight, Edit3, Check, X, Shield, Activity, Heart } from 'lucide-react'
import './HealthProfile.css'

export default function HealthProfile({ user, setUser }) {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...user })
  const [saved, setSaved] = useState(false)

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }))

  const handleSave = () => {
    const bmi = form.height && form.weight
      ? (form.weight / ((form.height / 100) ** 2)).toFixed(1)
      : user.bmi
    setUser({ ...form, bmi })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleCancel = () => {
    setForm({ ...user })
    setEditing(false)
  }

  const bmi = parseFloat(user?.bmi || 22)
  const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'
  const bmiColor = bmi < 18.5 ? '#F59E0B' : bmi < 25 ? '#22C55E' : bmi < 30 ? '#F59E0B' : '#EF4444'
  const wellness = user?.wellnessScore || 78

  const CONDITIONS = ['PCOS/PCOD', 'Diabetes', 'Thyroid', 'Hypertension', 'Anxiety/Depression', 'None']
  const GOALS = ['Improve Sexual Health', 'Track Menstrual Cycle', 'Manage Chronic Condition', 'General Wellness', 'Weight Management', 'Reduce Stress']

  const toggleArr = (field, val) => {
    setForm(f => {
      const arr = f[field] || []
      return { ...f, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }
    })
  }

  return (
    <div className="profile-page">
      <div className="orb" style={{ width: 350, height: 350, background: '#EC4899', top: 60, right: -80, opacity: 0.1 }} />

      <div className="profile-inner">
        {/* Header */}
        <div className="profile-header fade-in">
          <div className="profile-hero-card glass">
            <div className="profile-hero-left">
              <div className="profile-big-avatar">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="profile-hero-info">
                <h1>{user?.name}</h1>
                <p className="profile-email"><Mail size={13} />{user?.email}</p>
                <p className="profile-email"><Phone size={13} />{user?.phone}</p>
                <div className="profile-badges">
                  <span className="badge badge-green">✓ Verified Member</span>
                  <span className="badge badge-purple">Joined {user?.joinedAt}</span>
                </div>
              </div>
            </div>
            <div className="profile-hero-actions">
              {saved && (
                <div className="save-toast">
                  <Check size={14} /> Profile Saved!
                </div>
              )}
              {!editing ? (
                <button className="btn-primary" onClick={() => setEditing(true)} id="edit-profile-btn">
                  <Edit3 size={15} /> Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn-outline" onClick={handleCancel} id="cancel-edit-btn">
                    <X size={15} /> Cancel
                  </button>
                  <button className="btn-primary" onClick={handleSave} id="save-profile-btn">
                    <Check size={15} /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Two column */}
        <div className="profile-grid fade-in-2">
          {/* Left — Personal & Health Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Personal Info */}
            <div className="profile-section glass">
              <div className="section-head">
                <User size={16} style={{ color: 'var(--primary-light)' }} />
                <h3>Personal Information</h3>
              </div>
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label">Full Name</span>
                  {editing
                    ? <input className="input-field" value={form.name} onChange={e => update('name', e.target.value)} id="edit-name" />
                    : <span className="info-val">{user?.name}</span>}
                </div>
                <div className="info-row">
                  <span className="info-label">Email</span>
                  {editing
                    ? <input className="input-field" type="email" value={form.email} onChange={e => update('email', e.target.value)} id="edit-email" />
                    : <span className="info-val">{user?.email}</span>}
                </div>
                <div className="info-row">
                  <span className="info-label">Phone</span>
                  {editing
                    ? <input className="input-field" value={form.phone} onChange={e => update('phone', e.target.value)} id="edit-phone" />
                    : <span className="info-val">{user?.phone}</span>}
                </div>
                <div className="info-row">
                  <span className="info-label">Date of Birth</span>
                  {editing
                    ? <input className="input-field" type="date" value={form.dob} onChange={e => update('dob', e.target.value)} id="edit-dob" />
                    : <span className="info-val">{user?.dob || '—'}</span>}
                </div>
                <div className="info-row">
                  <span className="info-label">Gender</span>
                  <span className="info-val">{user?.gender || '—'}</span>
                </div>
              </div>
            </div>

            {/* Body Stats */}
            <div className="profile-section glass">
              <div className="section-head">
                <Activity size={16} style={{ color: 'var(--teal-light)' }} />
                <h3>Body Measurements</h3>
              </div>
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label"><Ruler size={13} /> Height (cm)</span>
                  {editing
                    ? <input className="input-field" type="number" value={form.height} onChange={e => update('height', e.target.value)} id="edit-height" style={{ maxWidth: 120 }} />
                    : <span className="info-val">{user?.height} cm</span>}
                </div>
                <div className="info-row">
                  <span className="info-label"><Weight size={13} /> Weight (kg)</span>
                  {editing
                    ? <input className="input-field" type="number" value={form.weight} onChange={e => update('weight', e.target.value)} id="edit-weight" style={{ maxWidth: 120 }} />
                    : <span className="info-val">{user?.weight} kg</span>}
                </div>
                <div className="info-row">
                  <span className="info-label">BMI</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="info-val" style={{ color: bmiColor }}>{bmi}</span>
                    <span className="badge" style={{ background: `${bmiColor}20`, color: bmiColor, border: `1px solid ${bmiColor}40`, fontSize: '0.7rem', padding: '2px 8px' }}>{bmiCategory}</span>
                  </div>
                </div>
              </div>
              {/* BMI Gauge */}
              <div className="bmi-gauge">
                <div className="bmi-scale">
                  <div className="bmi-zone" style={{ background: '#F59E0B', width: '20%' }}>Under</div>
                  <div className="bmi-zone" style={{ background: '#22C55E', width: '30%' }}>Normal</div>
                  <div className="bmi-zone" style={{ background: '#F59E0B', width: '25%' }}>Over</div>
                  <div className="bmi-zone" style={{ background: '#EF4444', width: '25%' }}>Obese</div>
                </div>
                <div className="bmi-pointer" style={{ left: `${Math.min((bmi / 40) * 100, 98)}%` }} />
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Wellness */}
            <div className="profile-section glass">
              <div className="section-head">
                <Heart size={16} style={{ color: 'var(--accent-light)' }} />
                <h3>Wellness Overview</h3>
              </div>
              <div className="wellness-ring-wrap">
                <div className="wellness-ring" style={{ '--pct': `${wellness}%`, '--color': wellness >= 80 ? '#22C55E' : wellness >= 60 ? '#F59E0B' : '#EF4444' }}>
                  <div className="wellness-ring-inner">
                    <span className="wellness-score">{wellness}</span>
                    <span className="wellness-label">/ 100</span>
                  </div>
                </div>
                <div className="wellness-stats">
                  <div className="w-stat"><span className="w-stat-val">{user?.consultations || 0}</span><span className="w-stat-lbl">Consultations</span></div>
                  <div className="w-stat"><span className="w-stat-val">{wellness >= 80 ? 'Excellent' : wellness >= 60 ? 'Good' : 'Needs Attention'}</span><span className="w-stat-lbl">Status</span></div>
                  <div className="w-stat"><span className="w-stat-val">{user?.goals?.length || 0}</span><span className="w-stat-lbl">Active Goals</span></div>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="profile-section glass">
              <div className="section-head">
                <Shield size={16} style={{ color: 'var(--primary-light)' }} />
                <h3>Health Conditions</h3>
              </div>
              {editing ? (
                <div className="chip-group">
                  {CONDITIONS.map(c => (
                    <button key={c} className={`chip ${(form.conditions || []).includes(c) ? 'chip-selected' : ''}`} onClick={() => toggleArr('conditions', c)}>
                      {(form.conditions || []).includes(c) && <Check size={12} />} {c}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {(user?.conditions?.length ? user.conditions : ['None']).map((c, i) => (
                    <span key={i} className="badge badge-pink">{c}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Goals */}
            <div className="profile-section glass">
              <div className="section-head">
                <Activity size={16} style={{ color: 'var(--teal-light)' }} />
                <h3>Health Goals</h3>
              </div>
              {editing ? (
                <div className="chip-group">
                  {GOALS.map(g => (
                    <button key={g} className={`chip ${(form.goals || []).includes(g) ? 'chip-selected' : ''}`} onClick={() => toggleArr('goals', g)}>
                      {(form.goals || []).includes(g) && <Check size={12} />} {g}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {(user?.goals?.length ? user.goals : ['Not set']).map((g, i) => (
                    <span key={i} className="badge badge-teal">{g}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
