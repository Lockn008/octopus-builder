import { useState } from 'react'
import './LaborManagement.css'
import useShiftData from './useShiftData.js'

function LaborManagement() {
  const [selectedView, setSelectedView] = useState('shifts')
  const { shifts } = useShiftData()

  const handleKeyDown = (e, view) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelectedView(view)
    }
  }

  return (
    <div className="labor-management">
      <div className="sidebar">
        <h3>Labor Management</h3>
        <ul className="view-options">
          <li
            className={selectedView === 'shifts' ? 'active' : ''}
            onClick={() => setSelectedView('shifts')}
            onKeyDown={(e) => handleKeyDown(e, 'shifts')}
            role="button"
            tabIndex={0}
          >
            Shifts
          </li>
        </ul>
      </div>

      <div className="main-content">
        {selectedView === 'shifts' && (
          <div className="shifts-table-wrapper">
            <h2>Shifts</h2>
            <table className="shifts-table">
              <thead>
                <tr>
                  <th>Shift Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Paid Break (min)</th>
                  <th>Unpaid Break (min)</th>
                  <th>Days of Week</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift) => (
                  <tr key={shift.id}>
                    <td>{shift.name}</td>
                    <td>{shift.startTime}</td>
                    <td>{shift.endTime}</td>
                    <td>{shift.paidBreakMinutes}</td>
                    <td>{shift.unpaidBreakMinutes}</td>
                    <td>{shift.daysOfWeek.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default LaborManagement
