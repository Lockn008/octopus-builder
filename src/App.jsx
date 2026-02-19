import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import ProjectManagement from './ProjectManagement.jsx'
import LaborManagement from './LaborManagement.jsx'

function Home() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🐙 Octopus Builder</h1>
        <p className="tagline">Construction ERP System</p>
      </header>
      
      <main className="app-main">
        <div className="welcome-section">
          <h2>Welcome to Octopus Builder</h2>
          <p>A comprehensive web-based ERP system designed specifically for construction projects and contractors.</p>
        </div>
        
        <div className="features-grid">
          <Link to="/project-management" className="feature-card-link">
            <div className="feature-card">
              <h3>📋 Project Management</h3>
              <p>Track and manage construction projects from start to finish</p>
            </div>
          </Link>

          <Link to="/labor-management" className="feature-card-link">
            <div className="feature-card">
              <h3>👷 Labor Management</h3>
              <p>Manage work schedules, shifts, and labor resources</p>
            </div>
          </Link>
          
          <div className="feature-card">
            <h3>💰 Financial Tracking</h3>
            <p>Monitor budgets, expenses, and invoicing in real-time</p>
          </div>
          
          <div className="feature-card">
            <h3>📊 Reporting & Analytics</h3>
            <p>Generate insights and reports for better decision making</p>
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Built with React + Vite</p>
      </footer>
    </div>
  )
}

function App() {
  // Using basename to match the base path configured in vite.config.js
  return (
    <Router basename="/octopus-builder">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/labor-management" element={<LaborManagement />} />
      </Routes>
    </Router>
  )
}

export default App
