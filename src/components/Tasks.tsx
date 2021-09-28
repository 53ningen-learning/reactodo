import {
  Box,
  CircularProgress,
  List,
  Paper,
  Typography,
} from '@material-ui/core'
import { Task, TaskItem } from './Task'

type Props = {
  tasks: Task[]
  loaded: boolean
  deleteTask: (id: string) => void
  toggleTaskState: (task: Task) => void
}

export const TaskList = ({
  tasks,
  loaded,
  deleteTask,
  toggleTaskState,
}: Props) => {
  const taskList = (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTaskState={toggleTaskState}
        />
      ))}
    </List>
  )
  const nothingToDoMessage = (
    <Box component="span" m={1}>
      <Typography>There is no task to do ✨</Typography>
    </Box>
  )
  const loadingDisplay = (
    <Box component="span" m={1}>
      <Typography>Loading...</Typography>
      <CircularProgress />
    </Box>
  )
  return (
    <Paper>
      {loaded
        ? tasks.length === 0
          ? nothingToDoMessage
          : taskList
        : loadingDisplay}
    </Paper>
  )
}
