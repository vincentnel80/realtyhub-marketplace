import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

import Navbar from '../navbar/Navbar'
import DrawerComp from '../drawercomp/DrawerComp'
import {
  AppBar,
  Button,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

//import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded'
//import DrawerComp from "./Drawer";

import './PageHeader.scss'

function PageHeader() {
  const [value, setValue] = useState()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  const auth = getAuth()
  let isUserAuthed = auth.currentUser

  const navigate = useNavigate()
  const onLogout = () => {
    auth.signOut()
    window.location.reload('/')
  }

  const onLogin = () => {
    navigate('/sign-in')
  }
  return (
    <>
      <AppBar sx={{ background: '#541f77' }}>
        <Toolbar>
          {/* To Do: Add svg logo*/}
          {/*<AddBusinessRoundedIcon sx={{ transform: 'scale(2)' }} />*/}
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: '2rem', paddingLeft: '10%' }}>
                Realty Hub
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: 'auto' }}
                indicatorColor="none"
                textColor="inherit"
                value={0}
                onChange={(e, value) => setValue(value)}
              >
                <Navbar />
              </Tabs>

              {isUserAuthed !== null ? (
                <Button
                  sx={{ marginLeft: 'auto' }}
                  type="button"
                  color="secondary"
                  variant="contained"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  sx={{ marginLeft: 'auto' }}
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={onLogin}
                >
                  Login
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default PageHeader
