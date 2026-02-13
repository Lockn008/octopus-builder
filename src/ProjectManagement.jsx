import { useState } from 'react'
import './ProjectManagement.css'

function ProjectManagement() {
  const [selectedView, setSelectedView] = useState('flowchart')

  return (
    <div className="project-management">
      <div className="sidebar">
        <h3>View</h3>
        <ul className="view-options">
          <li 
            className={selectedView === 'flowchart' ? 'active' : ''}
            onClick={() => setSelectedView('flowchart')}
          >
            Flowchart
          </li>
          <li 
            className={selectedView === 'timeline' ? 'active' : ''}
            onClick={() => setSelectedView('timeline')}
          >
            Timeline
          </li>
        </ul>
      </div>
      
      <div className="main-content">
        <header className="pm-header">
          <h1>📋 Project Management</h1>
        </header>
        
        <div className="content-area">
          {selectedView === 'flowchart' && (
            <div className="view-section">
              <h2>Flowchart View</h2>
              <p>Flowchart visualization will be displayed here.</p>
            </div>
          )}
          
          {selectedView === 'timeline' && (
            <div className="view-section">
              <h2>Timeline View</h2>
              <p>Timeline visualization will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectManagement
