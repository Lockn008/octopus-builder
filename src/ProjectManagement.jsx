import { useState } from 'react'
import './ProjectManagement.css'
import TaskCard from './TaskCard.jsx'
import Modal from './Modal.jsx'
import TaskForm from './TaskForm.jsx'
import PrerequisiteArrows from './PrerequisiteArrows.jsx'

function ProjectManagement() {
  const [selectedView, setSelectedView] = useState('flowchart')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Foundation Work',
      laborHours: 120,
      startDate: '2026-02-15',
      completionDate: '2026-02-28',
      prerequisites: [],
      x: 50,
      y: 50
    },
    {
      id: 2,
      name: 'Framing',
      laborHours: 200,
      startDate: '2026-03-01',
      completionDate: '2026-03-20',
      prerequisites: [1],
      x: 350,
      y: 50
    },
    {
      id: 3,
      name: 'Electrical Installation',
      laborHours: 80,
      startDate: '2026-03-15',
      completionDate: '2026-03-25',
      prerequisites: [2],
      x: 50,
      y: 250
    }
  ])

  const handleNewTask = () => {
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const handleExpandTask = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  const handleSubmitTask = (formData) => {
    if (selectedTask) {
      // Edit existing task
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === selectedTask.id
            ? { ...task, ...formData }
            : task
        )
      )
    } else {
      // Add new task
      const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0
      const newTask = {
        id: maxId + 1,
        ...formData,
        laborHours: Number(formData.laborHours),
        x: 100,
        y: 100
      }
      setTasks(prevTasks => [...prevTasks, newTask])
    }
    handleCloseModal()
  }

  const handleKeyDown = (e, view) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelectedView(view)
    }
  }

  const handleTaskPositionChange = (taskId, newPosition) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, x: newPosition.x, y: newPosition.y }
          : task
      )
    )
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
        <button 
          className="new-task-button"
          onClick={handleNewTask}
        >
          + New Task
        </button>
      </div>
      
      <div className="main-content">
        <div className="content-area">
          {selectedView === 'flowchart' && (
            <div className="flowchart-container">
              <div className="tooltip-container">
                <div className="tooltip-icon">?</div>
                <div className="tooltip-text">Drag the task cards to organize your workflow.</div>
              </div>
              <PrerequisiteArrows tasks={tasks} />
              {tasks.map((task) => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onExpand={() => handleExpandTask(task)}
                  onPositionChange={handleTaskPositionChange}
                />
              ))}
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
        <TaskForm
          key={selectedTask?.id || 'new'}
          task={selectedTask}
          availableTasks={tasks}
          onSubmit={handleSubmitTask}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  )
}

export default ProjectManagement
