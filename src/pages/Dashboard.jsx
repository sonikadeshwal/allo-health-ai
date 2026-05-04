import { Link } from 'react-router-dom'
import { MessageCircleHeart, Activity, Heart, TrendingUp, Calendar, Zap, ArrowRight, User, Shield, Brain } from 'lucide-react'
import './Dashboard.css'

const tips = [
  { icon: '💧', title: 'Stay Hydrated', desc: 'Drink 8 glasses of water daily to support hormonal balance.' },
  { icon: '🧘', title: 'Manage Stress', desc: 'Practice 10 mins of mindfulness to reduce cortisol levels.' },
  { icon: '🥗', title: 'Eat Balanced', desc: 'Include zinc-rich foods for reproductive health support.' },
  { icon: '😴', title: 'Quality Sleep', desc: '7-8 hours of sleep is essential for hormonal regulation.' },
]

const quickActions = [
  { to: '/consult', icon: <MessageCircleHeart size={22} />, label: 'Ask AI Doctor', desc: 'Get instant health answers', color: 'purple', id: 'qa-consult' },
  { to: '/profile', icon: <User size={22} />, label: 'Update Profile', desc: 'Manage your health data', color: 'teal', id: 'qa-profile' },
  { to: '/consult', icon: <Brain size={22} />, label: 'Symptom Check', desc: 'AI-powered analysis', color: 'pink', id: 'qa-symptom' },
]

export default function Dashboard({ user }) {
  const bmi = parseFloat(user?.bmi || 22)
  const wellness = user?.wellnessScore || 78

  const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'
  const bmiColor = bmi < 18.5 ? '#F59E0B' : bmi < 25 ? '#22C55E' : bmi < 30 ? '#F59E0B' : '#EF4444'

  const wellnessColor = wellness >= 80 ? '#22C55E' : wellness >= 60 ? '#F59E0B' : '#EF4444'
  const wellnessLabel = wellness >= 80 ? 'Excellent' : wellness >= 60 ? 'Good' : 'Needs Attention'

  const age = user?.dob ? new Date().getFullYear() - new Date(user.dob).getFullYear() : 24

  return (
    <div className="dashboard-page">
      <div className="orb" style={{ width: 400, height: 400, background: '#7C3AED', top: 60, right: -100, opacity: 0.1 }} />

      <div className="dashboard-inner">
        {/* Welcome Header */}
        <div className="dash-header fade-in">
          <div>
            <p className="dash-greeting">Good evening 👋</p>
            <h1 className="dash-title">Welcome back, <span className="grad-text">{user?.name?.split(' ')[0] || 'User'}</span></h1>
            <p className="dash-subtitle">Here's your health overview for today.</p>
          </div>
          <Link to="/consult" className="btn-primary" id="dash-consult-btn">
            <MessageCircleHeart size={17} /> Talk to AI Doctor
          </Link>
        </div>

        {/* Metrics Row */}
        <div className="metrics-row fade-in-2">
          {/* BMI Card */}
          <div className="metric-card glass">
            <div className="metric-header">
              <div className="metric-icon icon-teal"><Activity size={18} /></div>
              <span className="metric-label">BMI Score</span>
            </div>
            <div className="metric-value" style={{ color: bmiColor }}>{bmi}</div>
            <div className="metric-sub">
              <span className="badge" style={{ background: `${bmiColor}20`, color: bmiColor, border: `1px solid ${bmiColor}40`, fontSize: '0.72rem', padding: '3px 10px' }}>
                {bmiCategory}
              </span>
            </div>
            <div className="bmi-bar">
              <div className="bmi-fill" style={{ width: `${Math.min((bmi / 40) * 100, 100)}%`, background: bmiColor }} />
            </div>
          </div>

          {/* Wellness Score */}
          <div className="metric-card glass">
            <div className="metric-header">
              <div className="metric-icon icon-purple"><Heart size={18} /></div>
              <span className="metric-label">Wellness Score</span>
            </div>
            <div className="metric-value" style={{ color: wellnessColor }}>{wellness}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span></div>
            <div className="metric-sub">
              <span className="badge" style={{ background: `${wellnessColor}20`, color: wellnessColor, border: `1px solid ${wellnessColor}40`, fontSize: '0.72rem', padding: '3px 10px' }}>
                {wellnessLabel}
              </span>
            </div>
            <div className="bmi-bar">
              <div className="bmi-fill" style={{ width: `${wellness}%`, background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }} />
            </div>
          </div>

          {/* Height / Weight */}
          <div className="metric-card glass">
            <div className="metric-header">
              <div className="metric-icon icon-pink"><TrendingUp size={18} /></div>
              <span className="metric-label">Body Stats</span>
            </div>
            <div className="body-stats">
              <div className="body-stat">
                <span className="body-stat-val">{user?.height || '—'}</span>
                <span className="body-stat-unit">cm</span>
                <span className="body-stat-lbl">Height</span>
              </div>
              <div className="body-stat-divider" />
              <div className="body-stat">
                <span className="body-stat-val">{user?.weight || '—'}</span>
                <span className="body-stat-unit">kg</span>
                <span className="body-stat-lbl">Weight</span>
              </div>
              <div className="body-stat-divider" />
              <div className="body-stat">
                <span className="body-stat-val">{age}</span>
                <span className="body-stat-unit">yr</span>
                <span className="body-stat-lbl">Age</span>
              </div>
            </div>
          </div>

          {/* Member Card */}
          <div className="metric-card glass">
            <div className="metric-header">
              <div className="metric-icon icon-teal"><Shield size={18} /></div>
              <span className="metric-label">My Profile</span>
            </div>
            <div className="profile-snap">
              <div className="user-avatar" style={{ width: 44, height: 44, fontSize: '1rem', marginBottom: 8 }}>
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <p className="profile-snap-name">{user?.name}</p>
              <p className="profile-snap-email">{user?.email}</p>
              <span className="badge badge-green" style={{ marginTop: 6 }}>Member since {user?.joinedAt}</span>
            </div>
          </div>
        </div>

        {/* Two column layout */}
        <div className="dash-grid fade-in-3">
          {/* Quick Actions */}
          <div className="dash-panel glass">
            <div className="panel-header">
              <Zap size={16} className="panel-icon" />
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions">
              {quickActions.map((a, i) => (
                <Link key={i} to={a.to} className={`quick-action qa-${a.color}`} id={a.id}>
                  <div className={`qa-icon icon-${a.color}`}>{a.icon}</div>
                  <div className="qa-text">
                    <div className="qa-label">{a.label}</div>
                    <div className="qa-desc">{a.desc}</div>
                  </div>
                  <ArrowRight size={16} className="qa-arrow" />
                </Link>
              ))}
            </div>
          </div>

          {/* Health Goals */}
          <div className="dash-panel glass">
            <div className="panel-header">
              <Calendar size={16} className="panel-icon" />
              <h3>My Health Goals</h3>
            </div>
            <div className="goals-list">
              {(user?.goals || ['General Wellness']).map((g, i) => (
                <div key={i} className="goal-item">
                  <div className="goal-check">✓</div>
                  <span>{g}</span>
                </div>
              ))}
            </div>
            {(user?.conditions?.filter(c => c !== 'None') || []).length > 0 && (
              <>
                <div className="divider" />
                <p className="panel-sub-label">Tracked Conditions</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                  {user.conditions.filter(c => c !== 'None').map((c, i) => (
                    <span key={i} className="badge badge-pink">{c}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Health Tips */}
        <div className="tips-section fade-in-4">
          <div className="panel-header" style={{ marginBottom: 20 }}>
            <Heart size={16} className="panel-icon" />
            <h3>Daily Health Tips</h3>
          </div>
          <div className="tips-grid">
            {tips.map((t, i) => (
              <div key={i} className="tip-card glass">
                <span className="tip-emoji">{t.icon}</span>
                <div className="tip-title">{t.title}</div>
                <div className="tip-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="dash-cta glass fade-in-4">
          <div className="orb" style={{ width: 200, height: 200, background: '#7C3AED', top: -40, right: -40, opacity: 0.15 }} />
          <div className="dash-cta-text">
            <Brain size={28} style={{ color: 'var(--primary-light)' }} />
            <div>
              <h3>Ready to consult with our AI Doctor?</h3>
              <p>Get instant, private, and personalized health guidance powered by Groq AI.</p>
            </div>
          </div>
          <Link to="/consult" className="btn-primary" id="dash-cta-btn">
            Start Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
