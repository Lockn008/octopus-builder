import { useState } from 'react'
import './TaskForm.css'

function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: task?.name || '',
    laborHours: task?.laborHours || '',
    startDate: task?.startDate || '',
    completionDate: task?.completionDate || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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
        />
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
