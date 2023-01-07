import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import Map from './Components/Map'

const App = () => {
  return (
    <Box minHeight="100vh">
    <AppBar position="relative" sx={{alignItems:'center'}} >
    <Toolbar>
      <Stack direction="row" >
        <Typography variant="h6" color="inherit" noWrap>
          Food Trucks Finder
        </Typography>
      </Stack>
    </Toolbar>
    </AppBar>
    <Map/>
    </Box>
  )
}

export default App
