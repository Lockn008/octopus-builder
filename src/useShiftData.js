import { useState } from 'react'

function useShiftData() {
  const [shifts, setShifts] = useState([
    {
      id: 1,
      name: 'Day Shift',
      startTime: '07:00',
      endTime: '15:30',
      paidBreakMinutes: 30,
      unpaidBreakMinutes: 0,
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }
  ])

  const addShift = (shiftData) => {
    const maxId = shifts.length > 0 ? Math.max(...shifts.map(s => s.id)) : 0
    const newShift = {
      id: maxId + 1,
      ...shiftData
    }
    setShifts(prevShifts => [...prevShifts, newShift])
  }

  const updateShift = (shiftId, shiftData) => {
    setShifts(prevShifts =>
      prevShifts.map(shift =>
        shift.id === shiftId
          ? { ...shift, ...shiftData }
          : shift
      )
    )
  }

  return {
    shifts,
    addShift,
    updateShift
  }
}

export default useShiftData
