import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  listItem: {
    '&:hover': {
      backgroundColor: '#eeeeee',
    },
  },
}))

export type Task = {
  id: string
  title: string
  description: string
  date: string
  state: 'Pending' | 'Completed'
}

type Props = {
  task: Task
  deleteTask: (id: string) => void
  toggleTaskState: (task: Task) => void
}

export const TaskItem = ({ task, deleteTask, toggleTaskState }: Props) => {
  const classes = useStyles()
  return (
    <ListItem className={classes.listItem}>
      <Checkbox
        checked={task.state === 'Completed'}
        onChange={() => toggleTaskState(task)}
      />
      <ListItemText>
        <Typography variant="h5">{task.title}</Typography>
        <Typography>{task.description}</Typography>
        <Typography>{task.date}</Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={() => deleteTask(task.id)}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
