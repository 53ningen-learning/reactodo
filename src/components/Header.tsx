import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import MenuIcon from '@material-ui/icons/Menu'
import { useState } from 'react'
import { useLocation } from 'react-router'
import { Task } from './Task'
import { TaskForm } from './TaskForm'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  addButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

type Props = {
  addTask: (task: Task) => Promise<boolean>
}

export const Header = ({ addTask }: Props) => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()
  const location = useLocation()
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" className={classes.title}>
          Reactodo
        </Typography>
        {location.pathname === '/' && (
          <IconButton
            onClick={handleClickOpen}
            edge="end"
            className={classes.addButton}
            color="inherit"
            aria-label="menu">
            <AddIcon />
          </IconButton>
        )}
        <TaskForm open={open} handleClose={handleClose} addTask={addTask} />
      </Toolbar>
    </AppBar>
  )
}
