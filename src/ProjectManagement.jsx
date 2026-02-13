import { useState } from 'react'
import './ProjectManagement.css'

function ProjectManagement() {
  const [selectedView, setSelectedView] = useState('flowchart')

  const handleKeyDown = (e, view) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelectedView(view)
    }
  }

  return (
    <div className="project-management">
      <div className="sidebar">
        <h3>Project Management</h3>
        <ul className="view-options">
          <li 
            className={selectedView === 'flowchart' ? 'active' : ''}
            onClick={() => setSelectedView('flowchart')}
            onKeyDown={(e) => handleKeyDown(e, 'flowchart')}
            role="button"
            tabIndex={0}
          >
            Flowchart
          </li>
          <li 
            className={selectedView === 'timeline' ? 'active' : ''}
            onClick={() => setSelectedView('timeline')}
            onKeyDown={(e) => handleKeyDown(e, 'timeline')}
            role="button"
            tabIndex={0}
          >
            Timeline
          </li>
        </ul>
      </div>
      
      <div className="main-content">
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
