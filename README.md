# 🏥 Allo Health AI — Smart Health Companion

> An AI-powered sexual & reproductive health platform with private consultations, health tracking, and personalized wellness dashboards.

[![Live Demo](https://img.shields.io/badge/Live-Demo-purple?style=for-the-badge)](https://allo-health-ai.netlify.app)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Groq](https://img.shields.io/badge/Groq-Llama3-orange?style=for-the-badge)](https://groq.com)
[![Vite](https://img.shields.io/badge/Vite-5-yellow?style=for-the-badge&logo=vite)](https://vitejs.dev)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **3-Step Registration** | Personal info → Health profile → Secure password |
| 📊 **Health Dashboard** | BMI, Wellness Score, body stats, daily tips |
| 🤖 **AI Consultation** | Chat with Llama 3 via Groq API for health queries |
| 👤 **Editable Profile** | Update personal info, conditions, and goals |
| 🌗 **Dark Mode Design** | Premium glassmorphism UI with gradient accents |
| 📱 **Fully Responsive** | Works perfectly on mobile, tablet, and desktop |

---

## 🚀 Getting Started

### 1. Clone & Install
\`\`\`bash
git clone https://github.com/yourusername/allo-health-ai.git
cd allo-health-ai
npm install
\`\`\`

### 2. Configure API Key
\`\`\`bash
cp .env.example .env
# Edit .env and add your Groq API key
# Get free key at: https://console.groq.com
\`\`\`

### 3. Run Development Server
\`\`\`bash
npm run dev
# Open http://localhost:5173
\`\`\`

### 4. Build for Production
\`\`\`bash
npm run build
\`\`\`

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite 5
- **Routing:** React Router DOM v6
- **AI Backend:** Groq API (Llama 3 8B)
- **Styling:** Vanilla CSS with glassmorphism design system
- **Icons:** Lucide React
- **Deployment:** Netlify / Vercel

---

## 📁 Project Structure

\`\`\`
allo-health-ai/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Fixed navigation with mobile menu
│   │   └── Navbar.css
│   ├── pages/
│   │   ├── Landing.jsx       # Marketing landing page
│   │   ├── Register.jsx      # 3-step registration flow
│   │   ├── Dashboard.jsx     # Health metrics dashboard
│   │   ├── AIConsult.jsx     # Groq AI chat interface
│   │   └── HealthProfile.jsx # Editable user profile
│   ├── App.jsx               # Routes & auth state
│   ├── main.jsx              # React entry point
│   └── index.css             # Global design system
├── .env.example
├── index.html
├── vite.config.js
└── package.json
\`\`\`

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GROQ_API_KEY` | Your Groq API key for AI chat | Optional (demo mode works without it) |

---

## ⚠️ Disclaimer

This platform provides **AI-generated health information for educational purposes only**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.

---

## 👩‍💻 Built By

Made with ❤️ as part of a 90-day placement sprint.

**Tech used:** React, Groq API, Llama 3, Vite, Vanilla CSS
