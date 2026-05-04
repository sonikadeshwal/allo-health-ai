import { useState, useRef, useEffect } from 'react'
import { Send, Brain, User, Trash2, Shield, Loader2, Sparkles, Server } from 'lucide-react'
import './AIConsult.css'

// Backend API URL — API key lives securely on the server, never in the browser
const API_BASE = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000')

const SUGGESTED = [
  "What are common symptoms of PCOS?",
  "How can I track my menstrual cycle accurately?",
  "What foods improve sexual health?",
  "How to manage stress for better hormonal balance?",
  "What is a healthy BMI range?",
  "Tips for improving sleep quality naturally",
]

export default function AIConsult({ user }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello ${user?.name?.split(' ')[0] || 'there'} 👋 I'm **Allo AI**, your private health companion. I'm here to help with questions about sexual health, reproductive wellness, and general health concerns.\n\n**How can I help you today?** Feel free to ask me anything — your conversation is completely private and secure. 🔒`,
      ts: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const content = text || input.trim()
    if (!content || loading) return

    setInput('')
    setError('')

    const userMsg = { role: 'user', content, ts: new Date() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      // Build history (exclude the initial greeting from API call)
      const history = messages
        .filter((_, i) => i > 0) // skip initial greeting
        .map(m => ({ role: m.role, content: m.content }))

      let aiContent = ''

      try {
        // Call our secure backend — API key stays on the server 🔒
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...history, { role: 'user', content }],
            user_name: user?.name || 'User'
          })
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.detail || `Server error: ${res.status}`)
        }

        const data = await res.json()
        aiContent = data.reply

      } catch (fetchErr) {
        // Backend unreachable — fall back to demo responses
        console.warn('Backend unavailable, using demo mode:', fetchErr.message)
        await new Promise(r => setTimeout(r, 1200))
        const demos = {
          default: `Thank you for your question! Here's what I can share:\n\n• **Backend not connected** — start the FastAPI server with \`uvicorn main:app --reload\` in the \`backend/\` folder\n• Add your **Groq API key** to \`backend/.env\` as \`GROQ_API_KEY\`\n• The AI uses **Llama 3** model via Groq for ultra-fast responses\n• Your API key is **never exposed** to the browser — it stays securely on the server 🔒\n\n> ⚠️ This platform provides educational health information only. Always consult a qualified healthcare provider for medical advice.`,
          pcos: `**PCOS (Polycystic Ovary Syndrome) Overview:**\n\n**Common Symptoms:**\n• Irregular or missed periods\n• Excess androgen (facial/body hair, acne)\n• Polycystic ovaries on ultrasound\n• Weight gain, difficulty losing weight\n• Hair thinning on scalp\n\n**Management Tips:**\n• Regular exercise (30 min/day)\n• Low-glycemic diet\n• Stress management\n• Doctor-prescribed hormonal therapy if needed\n\n> ⚠️ Please consult a gynecologist for proper diagnosis and treatment.`,
          bmi: `**Healthy BMI Ranges:**\n\n• **Underweight:** < 18.5\n• **Normal weight:** 18.5 – 24.9 ✅\n• **Overweight:** 25 – 29.9\n• **Obese:** ≥ 30\n\nYour current BMI is **${user?.bmi || 'not calculated'}**.\n\n> ⚠️ BMI is a general indicator. Consult a doctor for personalized health assessment.`,
          stress: `**Managing Stress for Hormonal Balance:**\n\n• **Mindfulness:** 10 min daily meditation reduces cortisol by up to 30%\n• **Exercise:** Regular physical activity boosts endorphins and serotonin\n• **Sleep:** 7-8 hours regulates melatonin and growth hormone\n• **Diet:** Limit caffeine and sugar which spike cortisol\n• **Breathing:** Deep diaphragmatic breathing activates the parasympathetic system\n\n> ⚠️ Persistent stress-related symptoms should be evaluated by a healthcare professional.`
        }
        const q = content.toLowerCase()
        aiContent = q.includes('pcos') ? demos.pcos
          : q.includes('bmi') ? demos.bmi
          : q.includes('stress') ? demos.stress
          : demos.default
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiContent, ts: new Date() }])
    } catch (err) {
      setError(`Something went wrong: ${err.message}`)
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: `Chat cleared! How can I help you, ${user?.name?.split(' ')[0] || 'there'}? 🌱`, ts: new Date() }])
  }

  const formatContent = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.*)/gm, '<li>$1</li>')
      .replace(/^> (.*)/gm, '<blockquote>$1</blockquote>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className="consult-page">
      <div className="orb" style={{ width: 350, height: 350, background: '#7C3AED', top: 80, left: -100, opacity: 0.08 }} />
      <div className="orb" style={{ width: 250, height: 250, background: '#14B8A6', bottom: 100, right: -60, opacity: 0.08, animationDelay: '4s' }} />

      <div className="consult-layout">
        {/* Sidebar */}
        <aside className="consult-sidebar glass fade-in">
          <div className="sidebar-header">
            <Brain size={18} style={{ color: 'var(--primary-light)' }} />
            <h3>Allo AI</h3>
            <span className="badge badge-green" style={{ fontSize: '0.65rem', padding: '2px 8px', marginLeft: 'auto' }}>
              Online
            </span>
          </div>

          <div className="sidebar-about">
            <div className="ai-avatar">
              <Brain size={22} />
            </div>
            <p className="ai-name">Allo Health AI</p>
            <p className="ai-desc">Powered by Groq + Llama 3</p>
            <div className="ai-badges">
              <span className="badge badge-teal">🔒 Private</span>
              <span className="badge badge-purple">⚡ Fast</span>
            </div>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-label">Suggested Questions</p>
            <div className="suggestions">
              {SUGGESTED.map((s, i) => (
                <button key={i} className="suggestion-btn" id={`suggestion-${i}`} onClick={() => sendMessage(s)} disabled={loading}>
                  <Sparkles size={12} />
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-ghost clear-btn" onClick={clearChat} id="clear-chat-btn">
            <Trash2 size={14} /> Clear Chat
          </button>

          <div className="sidebar-disclaimer">
            <Shield size={12} />
            <p>For educational purposes only. Not a substitute for professional medical advice.</p>
          </div>
        </aside>

        {/* Chat Panel */}
        <div className="chat-panel glass fade-in-2">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="ai-status-dot" />
              <div>
                <h3>AI Health Consultation</h3>
                <p>Private & Encrypted Session</p>
              </div>
            </div>
            <div className="chat-header-right">
              <span className="badge badge-purple">
                <Brain size={11} /> Llama 3 via Groq
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.role}`}>
                <div className={`msg-avatar ${msg.role}`}>
                  {msg.role === 'assistant' ? <Brain size={14} /> : <User size={14} />}
                </div>
                <div className="msg-bubble-wrap">
                  <div className={`msg-bubble ${msg.role}`}
                    dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                  />
                  <span className="msg-time">
                    {msg.ts?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-row assistant">
                <div className="msg-avatar assistant"><Brain size={14} /></div>
                <div className="msg-bubble assistant typing-bubble">
                  <Loader2 size={16} className="spin" />
                  <span>Analyzing your question...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="error-banner">⚠️ {error}</div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <div className="chat-input-wrap">
              <textarea
                ref={inputRef}
                id="chat-input"
                className="chat-textarea"
                placeholder="Ask about your health concerns..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                rows={1}
                disabled={loading}
              />
              <button
                className={`send-btn ${input.trim() && !loading ? 'active' : ''}`}
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                id="send-message-btn"
              >
                {loading ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
              </button>
            </div>
            <p className="input-hint">Press Enter to send · Shift+Enter for new line · Powered by Groq AI</p>
          </div>
        </div>
      </div>
    </div>
  )
}
