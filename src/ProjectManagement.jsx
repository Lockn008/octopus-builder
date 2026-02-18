import { useState } from 'react'
import './ProjectManagement.css'
import TaskCard from './TaskCard.jsx'
import Modal from './Modal.jsx'
import TaskForm from './TaskForm.jsx'
import PrerequisiteArrows from './PrerequisiteArrows.jsx'
import Timeline from './Timeline.jsx'
import useTaskData from './useTaskData.js'

function ProjectManagement() {
  const [selectedView, setSelectedView] = useState('flowchart')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const { tasks, addTask, updateTask, updateTaskPosition } = useTaskData()

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
      updateTask(selectedTask.id, formData)
    } else {
      // Add new task
      addTask(formData)
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
    updateTaskPosition(taskId, newPosition)
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
            <Timeline tasks={tasks} onTaskClick={handleExpandTask} />
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
