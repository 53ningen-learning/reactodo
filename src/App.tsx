import { Box, Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Task } from './components/Task'
import { TaskList } from './components/Tasks'

const API_URL = 'http://localhost:5000'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  const addTask = async (task: Task): Promise<boolean> => {
    try {
      await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      })
      setTasks([...tasks, task])
      return true
    } catch (e) {
      alert(`${e}`)
      return false
    }
  }
  const deleteTask = async (id: string) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
      setTasks(tasks.filter((t) => t.id !== id))
    } catch (e) {
      alert(`${e}`)
    }
  }
  const toggleTaskState = async (task: Task) => {
    try {
      const updatedTask: Task = {
        ...task,
        state: task.state === 'Pending' ? 'Completed' : 'Pending',
      }
      await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })
      const updatedTasks: Task[] = tasks.map((t) =>
        t.id === task.id ? updatedTask : t
      )
      setTasks(updatedTasks)
    } catch (e) {
      alert(`${e}`)
    }
  }
  useEffect(() => {
    const loadTask = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks`)
        const tasks = (await res.json()) as Task[]
        setTasks(tasks)
        setLoaded(true)
      } catch (e) {
        alert(`${e}`)
      }
    }
    loadTask()
  }, [])

  return (
    <Router>
      <Container maxWidth="md" className="App">
        <Header addTask={addTask} />
        <Box component="span" m={1}>
          <Route
            path="/"
            exact
            render={() => (
              <TaskList
                loaded={loaded}
                tasks={tasks}
                deleteTask={deleteTask}
                toggleTaskState={toggleTaskState}
              />
            )}
          />

          <Route path="/about">
            <About />
          </Route>
        </Box>
        <Box component="span" m={1}>
          <Footer />
        </Box>
      </Container>
    </Router>
  )
}

export default App
