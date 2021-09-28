import { Box, Paper, Typography } from '@material-ui/core'

export const About = () => {
  return (
    <Paper>
      <Box component="span" m={1}>
        <Typography>This is a simple TODO application.</Typography>
      </Box>
    </Paper>
  )
}
