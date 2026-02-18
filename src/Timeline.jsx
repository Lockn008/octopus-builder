import { useMemo } from 'react'
import './Timeline.css'

// Constants
const MS_PER_DAY = 1000 * 60 * 60 * 24

// Helper function for date formatting
const formatDateRange = (date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function Timeline({ tasks, onTaskClick }) {
  // Calculate timeline bounds
  const { minDate, maxDate, totalDays } = useMemo(() => {
    if (tasks.length === 0) {
      return { minDate: new Date(), maxDate: new Date(), totalDays: 1 }
    }

    const dates = tasks.flatMap(task => [
      new Date(task.startDate),
      new Date(task.completionDate)
    ])

    const min = new Date(Math.min(...dates))
    const max = new Date(Math.max(...dates))
    
    // Calculate total days between min and max
    const diffTime = Math.abs(max - min)
    const diffDays = Math.ceil(diffTime / MS_PER_DAY)

    return { minDate: min, maxDate: max, totalDays: diffDays || 1 }
  }, [tasks])

  // Calculate position and width for each task block
  const getTaskBlockStyle = (task) => {
    const taskStart = new Date(task.startDate)
    const taskEnd = new Date(task.completionDate)
    
    // Calculate days from start
    const startOffset = Math.abs(taskStart - minDate) / MS_PER_DAY
    const duration = Math.abs(taskEnd - taskStart) / MS_PER_DAY
    
    // Convert to percentage
    const leftPercent = (startOffset / totalDays) * 100
    const widthPercent = (duration / totalDays) * 100
    
    return {
      left: `${leftPercent}%`,
      width: `${Math.max(widthPercent, 1)}%` // Minimum 1% width for visibility
    }
  }

  // Generate month markers for the timeline
  const generateMonthMarkers = () => {
    const markers = []
    const currentDate = new Date(minDate)
    currentDate.setDate(1) // Start from the first of the month
    
    while (currentDate <= maxDate) {
      const offsetDays = Math.abs(currentDate - minDate) / MS_PER_DAY
      const position = (offsetDays / totalDays) * 100
      
      markers.push({
        date: new Date(currentDate),
        position: `${position}%`,
        label: currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      })
      
      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1)
    }
    
    return markers
  }

  const monthMarkers = generateMonthMarkers()

  // Generate colors for task blocks
  const getTaskColor = (taskId) => {
    const colors = [
      '#667eea',
      '#f093fb',
      '#4facfe',
      '#43e97b',
      '#fa709a',
      '#feca57',
      '#48dbfb',
      '#ff9ff3'
    ]
    return colors[taskId % colors.length]
  }

  if (tasks.length === 0) {
    return (
      <div className="timeline-container">
        <div className="timeline-empty">
          <p>No tasks to display. Create a task to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h2>Project Timeline</h2>
        <p className="timeline-info">
          {minDate.toLocaleDateString()} - {maxDate.toLocaleDateString()} ({totalDays} days)
        </p>
      </div>

      <div className="timeline-content">
        {/* Timeline axis with month markers */}
        <div className="timeline-axis">
          {monthMarkers.map((marker, index) => (
            <div 
              key={index} 
              className="timeline-marker" 
              style={{ left: marker.position }}
            >
              <div className="timeline-marker-line"></div>
              <div className="timeline-marker-label">{marker.label}</div>
            </div>
          ))}
        </div>

        {/* Task rows */}
        <div className="timeline-tasks">
          {tasks.map((task) => (
            <div key={task.id} className="timeline-row">
              <div className="timeline-row-label">
                <span className="task-id">#{task.id}</span>
              </div>
              <div className="timeline-row-content">
                <div
                  className="task-block"
                  style={{
                    ...getTaskBlockStyle(task),
                    backgroundColor: getTaskColor(task.id)
                  }}
                  onClick={() => onTaskClick(task)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onTaskClick(task)
                    }
                  }}
                  aria-label={`View details for ${task.name}`}
                >
                  <div className="task-block-content">
                    <span className="task-block-name">{task.name}</span>
                    <span className="task-block-dates">
                      {formatDateRange(new Date(task.startDate))} - 
                      {formatDateRange(new Date(task.completionDate))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Timeline
