import { Link } from 'react-router-dom'
import { Heart, Brain, Shield, Zap, ArrowRight, Star, CheckCircle2, Activity, MessageCircleHeart, Lock } from 'lucide-react'
import './Landing.css'

const features = [
  { icon: <Brain size={22} />, title: 'AI Symptom Analysis', desc: 'Powered by Groq LLM — get instant, medically-informed responses to your health queries.', color: 'purple' },
  { icon: <Shield size={22} />, title: '100% Private & Safe', desc: 'Your data is encrypted and never shared. Consult freely without fear of judgment.', color: 'teal' },
  { icon: <Activity size={22} />, title: 'Health Tracking', desc: 'Track BMI, wellness scores, and health goals on your personal dashboard.', color: 'pink' },
  { icon: <Lock size={22} />, title: 'Secure Registration', desc: 'Quick onboarding with a secure health profile tailored to your needs.', color: 'purple' },
]

const stats = [
  { value: '50K+', label: 'Consultations Done' },
  { value: '98%', label: 'User Satisfaction' },
  { value: '< 2s', label: 'AI Response Time' },
  { value: '24/7', label: 'Always Available' },
]

const testimonials = [
  { name: 'Priya S.', role: 'User', text: 'Finally a platform where I could discuss my concerns without embarrassment. The AI was incredibly helpful!', rating: 5 },
  { name: 'Arjun M.', role: 'User', text: 'The health dashboard and AI consult feature are game changers. Highly recommended!', rating: 5 },
  { name: 'Sneha R.', role: 'User', text: 'Professional, private, and fast. Got clarity on my symptoms in minutes.', rating: 5 },
]

export default function Landing() {
  return (
    <div className="landing">
      {/* Ambient Orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: '#7C3AED', top: '-100px', left: '-150px' }} />
      <div className="orb" style={{ width: 400, height: 400, background: '#EC4899', top: '200px', right: '-100px', animationDelay: '3s' }} />
      <div className="orb" style={{ width: 300, height: 300, background: '#14B8A6', bottom: '100px', left: '30%', animationDelay: '6s' }} />

      {/* Top Bar */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="navbar-logo">
            <div className="logo-icon">
              <Heart size={18} fill="white" />
            </div>
            <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.2rem' }}>
              Allo<span className="logo-accent">Health</span>
            </span>
            <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>AI</span>
          </div>
          <div className="header-actions">
            <Link to="/register" className="btn-ghost" id="landing-login-btn">Sign In</Link>
            <Link to="/register" className="btn-primary" id="landing-get-started-btn">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="fade-in">
            <span className="badge badge-teal" style={{ marginBottom: 20 }}>
              <Zap size={12} /> AI-Powered Health Platform
            </span>
          </div>
          <h1 className="hero-title fade-in-2">
            Your <span className="grad-text">Private Health</span><br />
            Companion, Powered by AI
          </h1>
          <p className="hero-subtitle fade-in-3">
            Ask anything about sexual & reproductive health. Get instant AI-driven insights,<br />
            track your wellness, and consult privately — anytime, anywhere.
          </p>
          <div className="hero-cta fade-in-4">
            <Link to="/register" className="btn-primary" id="hero-register-btn" style={{ padding: '16px 36px', fontSize: '1rem' }}>
              Register Free <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn-outline" id="hero-consult-btn">
              <MessageCircleHeart size={16} /> Try AI Consult
            </Link>
          </div>
          <div className="hero-trust fade-in-4">
            <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />
            <span>No credit card needed</span>
            <span className="dot" />
            <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />
            <span>100% Anonymous</span>
            <span className="dot" />
            <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />
            <span>HIPAA Inspired Privacy</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual fade-in-3">
          <div className="hero-card glass-strong">
            <div className="hero-card-header">
              <div className="pulse-dot" />
              <span>AI Consultation Live</span>
            </div>
            <div className="hero-chat">
              <div className="chat-msg user-msg">I've been experiencing irregular cycles for 2 months...</div>
              <div className="chat-msg ai-msg">
                <div className="ai-badge"><Brain size={11} /> Allo AI</div>
                Irregular cycles can have several causes including stress, hormonal changes, or PCOS. I recommend tracking your cycle for 3 months and consulting a specialist if it persists...
              </div>
            </div>
            <div className="hero-metrics">
              <div className="metric-pill">
                <Activity size={14} />
                <span>Wellness Score: <strong>82</strong></span>
              </div>
              <div className="metric-pill">
                <Shield size={14} />
                <span>Private & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        {stats.map((s, i) => (
          <div key={i} className="stat-card glass">
            <div className="stat-value grad-text">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-label">
          <span className="badge badge-purple">Features</span>
        </div>
        <h2 className="section-title">Everything You Need for <br /><span className="grad-text">Better Health</span></h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className={`feature-card glass feature-${f.color}`}>
              <div className={`feature-icon icon-${f.color}`}>{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">Loved by <span className="grad-text">Thousands</span></h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card glass">
              <div className="stars">
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name[0]}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="cta-card glass-strong">
          <div className="orb" style={{ width: 300, height: 300, background: '#7C3AED', top: '-80px', right: '-60px', opacity: 0.15 }} />
          <Heart size={40} className="cta-icon" />
          <h2 className="cta-title">Start Your Health Journey Today</h2>
          <p className="cta-subtitle">Join 50,000+ users who trust Allo Health AI for private, intelligent health guidance.</p>
          <Link to="/register" className="btn-primary" id="cta-register-btn" style={{ padding: '16px 40px', fontSize: '1rem' }}>
            Create Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-logo">
          <Heart size={16} fill="var(--primary-light)" color="var(--primary-light)" />
          <span>AlloHealth AI</span>
        </div>
        <p className="footer-disclaimer">
          ⚠️ This platform provides AI-generated health information for educational purposes only. 
          Always consult a qualified medical professional for diagnosis and treatment.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>© 2025 Allo Health AI. Built with ❤️ using React + Groq API.</p>
      </footer>
    </div>
  )
}
