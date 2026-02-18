import { useState } from 'react'

function useTaskData() {
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

  const addTask = (taskData) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0
    const newTask = {
      id: maxId + 1,
      ...taskData,
      laborHours: Number(taskData.laborHours),
      x: 100,
      y: 100
    }
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const updateTask = (taskId, taskData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...taskData }
          : task
      )
    )
  }

  const updateTaskPosition = (taskId, position) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, x: position.x, y: position.y }
          : task
      )
    )
  }

  return {
    tasks,
    addTask,
    updateTask,
    updateTaskPosition
  }
}

export default useTaskData
