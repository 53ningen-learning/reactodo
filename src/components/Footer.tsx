import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <>
      <Typography>Reactodo</Typography>
      <Typography>
        <Link to="/">HOME</Link> - <Link to="/about">ABOUT</Link>
      </Typography>
    </>
  )
}
