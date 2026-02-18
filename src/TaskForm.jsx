import { useState, useMemo } from 'react'
import './TaskForm.css'

function TaskForm({ task, onSubmit, onCancel, availableTasks = [] }) {
  const [formData, setFormData] = useState({
    name: task?.name || '',
    laborHours: task?.laborHours || '',
    startDate: task?.startDate || '',
    completionDate: task?.completionDate || '',
    prerequisites: task?.prerequisites || []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  // Filter tasks that can be prerequisites (exclude current task and already selected)
  const filteredTasks = useMemo(() => {
    return availableTasks.filter(t => {
      // Exclude current task being edited
      if (task && t.id === task.id) return false
      
      // Exclude already selected prerequisites
      if (formData.prerequisites.includes(t.id)) return false
      
      // Filter by search term
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        return (
          t.name.toLowerCase().includes(search) ||
          t.id.toString().includes(search)
        )
      }
      return true
    })
  }, [availableTasks, task, searchTerm, formData.prerequisites])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddPrerequisite = (taskToAdd) => {
    if (!formData.prerequisites.includes(taskToAdd.id)) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, taskToAdd.id]
      }))
    }
    setSearchTerm('')
    setShowDropdown(false)
  }

  const handleRemovePrerequisite = (taskId) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter(id => id !== taskId)
    }))
  }

  const getTaskById = (id) => {
    return availableTasks.find(t => t.id === id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{task ? 'Edit Task' : 'New Task'}</h3>
      
      <div className="form-group">
        <label htmlFor="name">Task Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="laborHours">Labor Hours</label>
        <input
          type="number"
          id="laborHours"
          name="laborHours"
          value={formData.laborHours}
          onChange={handleChange}
          required
          min="0"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="completionDate">Completion Date</label>
        <input
          type="date"
          id="completionDate"
          name="completionDate"
          value={formData.completionDate}
          onChange={handleChange}
          required
          min={formData.startDate}
        />
      </div>

      <div className="form-group">
        <label htmlFor="prerequisites">Prerequisites</label>
        <div className="prerequisites-container">
          <div className="selected-prerequisites">
            {formData.prerequisites.map(prereqId => {
              const prereqTask = getTaskById(prereqId)
              return prereqTask ? (
                <div key={prereqId} className="prerequisite-tag">
                  <span>ID: {prereqTask.id} - {prereqTask.name}</span>
                  <button
                    type="button"
                    className="remove-prerequisite"
                    onClick={() => handleRemovePrerequisite(prereqId)}
                    aria-label={`Remove ${prereqTask.name}`}
                  >
                    ×
                  </button>
                </div>
              ) : null
            })}
          </div>
          <div className="prerequisite-search">
            <input
              type="text"
              id="prerequisites"
              placeholder="Search by task ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => {
                // Delay hiding dropdown to allow button click events to fire
                // onMouseDown prevents default on buttons to ensure click completes
                setTimeout(() => setShowDropdown(false), 200)
              }}
            />
            {showDropdown && filteredTasks.length > 0 && (
              <div className="prerequisite-dropdown" role="listbox">
                {filteredTasks.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className="prerequisite-option"
                    onClick={() => handleAddPrerequisite(t)}
                    onMouseDown={(e) => e.preventDefault()}
                    role="option"
                    aria-selected="false"
                  >
                    <span className="option-id">ID: {t.id}</span>
                    <span className="option-name">{t.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Submit
        </button>
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
