import { useState } from 'react'
import './PrerequisiteArrows.css'

// Z-index constants for arrow layering
const Z_INDEX_ARROWS_DEFAULT = 0  // Behind task cards
const Z_INDEX_ARROWS_HOVERED = 10  // In front of task cards

// Task card dimensions (should match TaskCard component)
// TODO: Consider moving to shared constants file
const CARD_WIDTH = 286
const CARD_HEIGHT = 164

function PrerequisiteArrows({ tasks }) {
  const [hoveredArrow, setHoveredArrow] = useState(null)

  // Calculate connection point on the edge of a task card
  const getConnectionPoint = (task, targetTask) => {
    const taskCenterX = task.x + CARD_WIDTH / 2
    const taskCenterY = task.y + CARD_HEIGHT / 2
    const targetCenterX = targetTask.x + CARD_WIDTH / 2
    const targetCenterY = targetTask.y + CARD_HEIGHT / 2
    
    // Determine which edge to connect from based on relative position
    const dx = targetCenterX - taskCenterX
    const dy = targetCenterY - taskCenterY
    
    let fromPoint, toPoint
    
    // From point (on the prerequisite task)
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal connection preferred
      if (dx > 0) {
        // Target is to the right
        fromPoint = { x: task.x + CARD_WIDTH, y: taskCenterY }
      } else {
        // Target is to the left
        fromPoint = { x: task.x, y: taskCenterY }
      }
    } else {
      // Vertical connection preferred
      if (dy > 0) {
        // Target is below
        fromPoint = { x: taskCenterX, y: task.y + CARD_HEIGHT }
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
        toPoint = { x: targetTask.x + CARD_WIDTH, y: targetCenterY }
      }
    } else {
      // Vertical connection preferred
      if (dy > 0) {
        // Target is below
        toPoint = { x: targetCenterX, y: targetTask.y }
      } else {
        // Target is above
        toPoint = { x: targetCenterX, y: targetTask.y + CARD_HEIGHT }
      }
    }
    
    return { fromPoint, toPoint }
  }

  // Generate cardinal direction path with rounded corners
  const generatePath = (fromPoint, toPoint) => {
    const cornerRadius = 8
    
    // Path only uses cardinal directions (up, down, left, right) with corners
    const dx = toPoint.x - fromPoint.x
    const dy = toPoint.y - fromPoint.y
    
    let path = `M ${fromPoint.x} ${fromPoint.y} `
    
    // If both dx and dy are non-zero, we need to make a corner
    if (Math.abs(dx) > 0.1 && Math.abs(dy) > 0.1) {
      // Choose path based on which direction is larger
      if (Math.abs(dx) >= Math.abs(dy)) {
        // Go horizontal all the way to target x, then vertical to target y
        if (Math.abs(dy) > cornerRadius * 2) {
          // Has room for corner
          path += `L ${toPoint.x - Math.sign(dx) * cornerRadius} ${fromPoint.y} `
          path += `Q ${toPoint.x} ${fromPoint.y} ${toPoint.x} ${fromPoint.y + Math.sign(dy) * cornerRadius} `
          path += `L ${toPoint.x} ${toPoint.y}`
        } else {
          // Too small for corner, use sharp corner
          path += `L ${toPoint.x} ${fromPoint.y} `
          path += `L ${toPoint.x} ${toPoint.y}`
        }
      } else {
        // Go vertical all the way to target y, then horizontal to target x
        if (Math.abs(dx) > cornerRadius * 2) {
          // Has room for corner
          path += `L ${fromPoint.x} ${toPoint.y - Math.sign(dy) * cornerRadius} `
          path += `Q ${fromPoint.x} ${toPoint.y} ${fromPoint.x + Math.sign(dx) * cornerRadius} ${toPoint.y} `
          path += `L ${toPoint.x} ${toPoint.y}`
        } else {
          // Too small for corner, use sharp corner
          path += `L ${fromPoint.x} ${toPoint.y} `
          path += `L ${toPoint.x} ${toPoint.y}`
        }
      }
    } else {
      // Only horizontal or only vertical movement
      path += `L ${toPoint.x} ${toPoint.y}`
    }
    
    return path
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
          const arrowId = `${prereqId}-${task.id}`
          
          arrows.push({
            id: arrowId,
            path,
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
    <svg 
      className="prerequisite-arrows" 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        pointerEvents: 'none',
        // Dynamic z-index changes on hover to bring arrows above cards
        zIndex: hoveredArrow ? Z_INDEX_ARROWS_HOVERED : Z_INDEX_ARROWS_DEFAULT
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
      {arrows.map(arrow => {
        const isHovered = hoveredArrow === arrow.id
        return (
          <g 
            key={arrow.id}
            className={`arrow-group ${isHovered ? 'hovered' : ''}`}
            style={{ 
              pointerEvents: 'auto'
            }}
            onMouseEnter={() => setHoveredArrow(arrow.id)}
            onMouseLeave={() => setHoveredArrow(null)}
          >
            <path
              d={arrow.path}
              className="arrow-path"
              stroke={isHovered ? '#10b981' : '#667eea'}
              strokeWidth={isHovered ? '3' : '2'}
              fill="none"
              markerEnd={isHovered ? 'url(#arrowhead-hover)' : 'url(#arrowhead-normal)'}
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
        )
      })}
    </svg>
  )
}

export default PrerequisiteArrows
