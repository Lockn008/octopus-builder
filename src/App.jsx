import './App.css'

function App() {
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
          <div className="feature-card">
            <h3>📋 Project Management</h3>
            <p>Track and manage construction projects from start to finish</p>
          </div>
          
          <div className="feature-card">
            <h3>👷 Contractor Management</h3>
            <p>Organize and coordinate with contractors and subcontractors</p>
          </div>
          
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

export default App
