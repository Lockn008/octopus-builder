import { useState } from 'react'
import './ProjectManagement.css'
import TaskCard from './TaskCard.jsx'
import Modal from './Modal.jsx'

function ProjectManagement() {
  const [selectedView, setSelectedView] = useState('flowchart')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Dummy task data
  const dummyTasks = [
    {
      id: 1,
      name: 'Foundation Work',
      laborHours: 120,
      startDate: '2026-02-15',
      completionDate: '2026-02-28',
      x: 50,
      y: 50
    },
    {
      id: 2,
      name: 'Framing',
      laborHours: 200,
      startDate: '2026-03-01',
      completionDate: '2026-03-20',
      x: 350,
      y: 50
    },
    {
      id: 3,
      name: 'Electrical Installation',
      laborHours: 80,
      startDate: '2026-03-15',
      completionDate: '2026-03-25',
      x: 50,
      y: 250
    }
  ]

  const handleExpandTask = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

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
            <div className="view-section flowchart-container">
              <h2>Flowchart View</h2>
              <p>Drag the task cards to organize your workflow.</p>
              <div className="flowchart-canvas">
                {dummyTasks.map((task) => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    onExpand={handleExpandTask}
                  />
                ))}
              </div>
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
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3>Task Details</h3>
        <p>Task details will be displayed here.</p>
      </Modal>
    </div>
  )
}

export default ProjectManagement
