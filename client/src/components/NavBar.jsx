import React from 'react'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar  from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {

  const navigate = useNavigate()

  return(
    <Box sx={{flexGrow:1}}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar component="nav">
            <Typography sx={{flexGrow:1}} >
              <Link to="/home" style={{textDecoration:'none'}}>Home</Link>
            </Typography>

            <Button 
              variant='contained'
              size='small'
              color='secondary'
              onClick= {() => navigate('/task/new')}
            >
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}