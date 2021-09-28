import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@material-ui/core'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Task } from './Task'

type Props = {
  open: boolean
  handleClose: () => void
  addTask: (task: Task) => Promise<boolean>
}

export const TaskForm = ({ open, handleClose, addTask }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [completed, setCompleted] = useState(false)

  const handleSubmit = async () => {
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      date,
      state: completed ? 'Completed' : 'Pending',
    }
    const done = await addTask(task)
    if (done) {
      setTitle('')
      setDescription('')
      setDate(new Date().toISOString().split('T')[0])
      setCompleted(false)
      handleClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="title"
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
          fullWidth
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id="completed"
                onChange={(e) => setCompleted(e.currentTarget.checked)}
              />
            }
            label="Completed"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button
          onClick={(e) => {
            e.preventDefault()
            handleSubmit()
          }}>
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  )
}
