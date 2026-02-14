import { useState, useEffect } from 'react'
import './TaskCard.css'

function TaskCard({ task, onExpand }) {
  const [position, setPosition] = useState({ x: task.x || 0, y: task.y || 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart])

  const handleMouseDown = (e) => {
    // Don't start dragging if clicking the expand button
    if (e.target.closest('.expand-button')) {
      return
    }
    
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="task-card-header">
        <h4 className="task-name">{task.name}</h4>
        <button 
          className="expand-button" 
          onClick={onExpand}
          aria-label="Expand task details"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M2 2L8 8M8 8L14 14M8 8L14 2M8 8L2 14" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="task-card-body">
        <div className="task-info">
          <span className="task-label">Labor Hours:</span>
          <span className="task-value">{task.laborHours}h</span>
        </div>
        <div className="task-info">
          <span className="task-label">Start Date:</span>
          <span className="task-value">{task.startDate}</span>
        </div>
        <div className="task-info">
          <span className="task-label">Completion Date:</span>
          <span className="task-value">{task.completionDate}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
