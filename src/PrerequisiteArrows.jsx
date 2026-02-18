import { useState } from 'react'
import './PrerequisiteArrows.css'

function PrerequisiteArrows({ tasks }) {
  const [hoveredArrow, setHoveredArrow] = useState(null)

  // Calculate connection point on the edge of a task card
  const getConnectionPoint = (task, targetTask) => {
    // Task card dimensions (measured from actual rendering)
    const cardWidth = 286
    const cardHeight = 164
    
    const taskCenterX = task.x + cardWidth / 2
    const taskCenterY = task.y + cardHeight / 2
    const targetCenterX = targetTask.x + cardWidth / 2
    const targetCenterY = targetTask.y + cardHeight / 2
    
    // Determine which edge to connect from based on relative position
    const dx = targetCenterX - taskCenterX
    const dy = targetCenterY - taskCenterY
    
    let fromPoint, toPoint
    
    // From point (on the prerequisite task)
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal connection preferred
      if (dx > 0) {
        // Target is to the right
        fromPoint = { x: task.x + cardWidth, y: taskCenterY }
      } else {
        // Target is to the left
        fromPoint = { x: task.x, y: taskCenterY }
      }
    } else {
      // Vertical connection preferred
      if (dy > 0) {
        // Target is below
        fromPoint = { x: taskCenterX, y: task.y + cardHeight }
      } else {
        // Target is above
        fromPoint = { x: taskCenterX, y: task.y }
      }
    }
    
    // To point (on the target task)
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal connection preferred
      if (dx > 0) {
        // Target is to the right
        toPoint = { x: targetTask.x, y: targetCenterY }
      } else {
        // Target is to the left
        toPoint = { x: targetTask.x + cardWidth, y: targetCenterY }
      }
    } else {
      // Vertical connection preferred
      if (dy > 0) {
        // Target is below
        toPoint = { x: targetCenterX, y: targetTask.y }
      } else {
        // Target is above
        toPoint = { x: targetCenterX, y: targetTask.y + cardHeight }
      }
    }
    
    return { fromPoint, toPoint }
  }

  // Generate cardinal direction path with rounded corners
  const generatePath = (fromPoint, toPoint) => {
    const cornerRadius = 8
    
    // Simple two-segment path: horizontal then vertical, or vertical then horizontal
    const dx = toPoint.x - fromPoint.x
    const dy = toPoint.y - fromPoint.y
    
    let path = `M ${fromPoint.x} ${fromPoint.y} `
    
    if (Math.abs(dx) > cornerRadius * 2 || Math.abs(dy) > cornerRadius * 2) {
      // Choose path based on which direction is larger
      if (Math.abs(dx) >= Math.abs(dy)) {
        // Go horizontal first, then vertical
        const midX = fromPoint.x + dx / 2
        
        if (Math.abs(dy) > cornerRadius * 2) {
          // Has vertical component with corner
          path += `L ${midX - Math.sign(dx) * cornerRadius} ${fromPoint.y} `
          path += `Q ${midX} ${fromPoint.y} ${midX} ${fromPoint.y + Math.sign(dy) * cornerRadius} `
          path += `L ${midX} ${toPoint.y - Math.sign(dy) * cornerRadius} `
          path += `Q ${midX} ${toPoint.y} ${midX + Math.sign(dx) * cornerRadius} ${toPoint.y} `
          path += `L ${toPoint.x} ${toPoint.y}`
        } else {
          // Only horizontal movement
          path += `L ${toPoint.x} ${toPoint.y}`
        }
      } else {
        // Go vertical first, then horizontal
        const midY = fromPoint.y + dy / 2
        
        if (Math.abs(dx) > cornerRadius * 2) {
          // Has horizontal component with corner
          path += `L ${fromPoint.x} ${midY - Math.sign(dy) * cornerRadius} `
          path += `Q ${fromPoint.x} ${midY} ${fromPoint.x + Math.sign(dx) * cornerRadius} ${midY} `
          path += `L ${toPoint.x - Math.sign(dx) * cornerRadius} ${midY} `
          path += `Q ${toPoint.x} ${midY} ${toPoint.x} ${midY + Math.sign(dy) * cornerRadius} `
          path += `L ${toPoint.x} ${toPoint.y}`
        } else {
          // Only vertical movement
          path += `L ${toPoint.x} ${toPoint.y}`
        }
      }
    } else {
      // Direct connection (too small for corners)
      path += `L ${toPoint.x} ${toPoint.y}`
    }
    
    return path
  }

  // Generate arrow marker at the end
  const generateArrowHead = (fromPoint, toPoint) => {
    const dx = toPoint.x - fromPoint.x
    const dy = toPoint.y - fromPoint.y
    const angle = Math.atan2(dy, dx)
    const arrowSize = 8
    
    // Calculate arrow head points
    const arrowPoint1 = {
      x: toPoint.x - arrowSize * Math.cos(angle - Math.PI / 6),
      y: toPoint.y - arrowSize * Math.sin(angle - Math.PI / 6)
    }
    const arrowPoint2 = {
      x: toPoint.x - arrowSize * Math.cos(angle + Math.PI / 6),
      y: toPoint.y - arrowSize * Math.sin(angle + Math.PI / 6)
    }
    
    return `M ${arrowPoint1.x} ${arrowPoint1.y} L ${toPoint.x} ${toPoint.y} L ${arrowPoint2.x} ${arrowPoint2.y}`
  }

  // Generate all arrows
  const arrows = []
  tasks.forEach(task => {
    if (task.prerequisites && task.prerequisites.length > 0) {
      task.prerequisites.forEach(prereqId => {
        const prereqTask = tasks.find(t => t.id === prereqId)
        if (prereqTask) {
          const { fromPoint, toPoint } = getConnectionPoint(prereqTask, task)
          const path = generatePath(fromPoint, toPoint)
          const arrowHead = generateArrowHead(fromPoint, toPoint)
          const arrowId = `${prereqId}-${task.id}`
          
          arrows.push({
            id: arrowId,
            path,
            arrowHead,
            fromTask: prereqTask,
            toTask: task
          })
        }
      })
    }
  })

  if (arrows.length === 0) {
    return null
  }

  return (
    <>
      {/* Normal arrows layer - behind task cards */}
      <svg 
        className="prerequisite-arrows" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <defs>
          <marker
            id="arrowhead-normal"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#667eea" />
          </marker>
        </defs>
        {arrows.map(arrow => (
          <g 
            key={arrow.id}
            className="arrow-group"
            style={{ 
              pointerEvents: 'auto',
              display: hoveredArrow === arrow.id ? 'none' : 'block'
            }}
            onMouseEnter={() => setHoveredArrow(arrow.id)}
            onMouseLeave={() => setHoveredArrow(null)}
          >
            <path
              d={arrow.path}
              className="arrow-path"
              stroke="#667eea"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead-normal)"
            />
            {/* Invisible wider path for easier hovering */}
            <path
              d={arrow.path}
              className="arrow-hover-area"
              stroke="transparent"
              strokeWidth="12"
              fill="none"
            />
          </g>
        ))}
      </svg>
      
      {/* Hovered arrow layer - in front of task cards */}
      {hoveredArrow && (
        <svg 
          className="prerequisite-arrows-hover" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          <defs>
            <marker
              id="arrowhead-hover"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
            </marker>
          </defs>
          {arrows.filter(arrow => arrow.id === hoveredArrow).map(arrow => (
            <g 
              key={arrow.id}
              style={{ 
                pointerEvents: 'auto'
              }}
              onMouseEnter={() => setHoveredArrow(arrow.id)}
              onMouseLeave={() => setHoveredArrow(null)}
            >
              <path
                d={arrow.path}
                stroke="#10b981"
                strokeWidth="3"
                fill="none"
                markerEnd="url(#arrowhead-hover)"
              />
              {/* Invisible wider path for easier hovering */}
              <path
                d={arrow.path}
                stroke="transparent"
                strokeWidth="12"
                fill="none"
              />
            </g>
          ))}
        </svg>
      )}
    </>
  )
}

export default PrerequisiteArrows
