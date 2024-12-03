import React from 'react'
import CustomAppBar from './app-bar'
import BibleView from './bible-view'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import useBrowserData from '../hooks/useBrowserData'
import { useTranslation } from 'react-i18next'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const defaultBackgroundStyle = {
  height: 'auto',
  minHeight: '100vh',
  background: '#181818',
  padding: 0,
  color: 'whitesmoke',
}

const BibleviewerApp = () => {
  const { size, width, height } = useBrowserData()
  const { t } = useTranslation()
  const viewRatio = width / height
  const showCloseButton = false
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setDrawerOpen(open)
  }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  }
  return (
    <div style={defaultBackgroundStyle}>
      <ThemeProvider theme={theme}>
        <CustomAppBar onClickMenu={toggleDrawer(true)}/>
        <BibleView
                // onExitNavigation={() => console.log("onExitNavigation - BibleView")}
                // onStartPlay={handleStartBiblePlay}
        />        
        <SwipeableDrawer
          anchor='right'
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Typography
              sx={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: 35,
                  textDecoration: 'none',
                  marginTop: 3,
                  marginLeft: 1
                }}
              color="inherit"
            >
              Weitere Inhalte
            </Typography>
            <Typography
              sx={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: (size === "sm") ? 22 : (size === "xs") ? 18 : 25,
                  textDecoration: 'none',
                  marginTop: 1,
                  marginLeft: 3
                }}
              color="inherit"
            >
              Visuelle Bibel
            </Typography>
            <Button 
              variant="contained" 
              sx={{
                marginTop: 3,
                marginLeft: 3
              }}
              onClick={() => openInNewTab("https://bibel.wiki")}
            >
              https://bibel.wiki
            </Button>
            <Typography
              sx={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: (size === "sm") ? 22 : (size === "xs") ? 18 : 25,
                  textDecoration: 'none',
                  marginTop: 2,
                  marginLeft: 3
                }}
              color="inherit"
            >
              Hörbibel
              <br/>Videoserien
              <br/>tägliche Inhalte
            </Typography>
            <Typography
              sx={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: (size === "sm") ? 18 : (size === "xs") ? 15 : 20,
                  textDecoration: 'none',
                  marginTop: 1,
                  marginLeft: 3
                }}
              color="inherit"
            >
              Open Source
            </Typography>
            <Typography
              sx={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: (size === "sm") ? 18 : (size === "xs") ? 15 : 20,
                  textDecoration: 'none',
                  marginTop: 3,
                  marginLeft: 2
                }}
              color="inherit"
            >
              zukünftig auch
            </Typography>
            <Typography
              sx={{
                  fontFamily: "'Work Sans', sans-serif",
                  fontSize: (size === "sm") ? 18 : (size === "xs") ? 15 : 20,
                  textDecoration: 'none',
                  marginLeft: 3
                }}
              color="inherit"
            >
              kollaborativ, 
              <br/>mit Geschichten 
              <br/>und Lebensthemen
            </Typography>
          </Box>
        </SwipeableDrawer>
      </ThemeProvider>
    </div>
  )
}

export default BibleviewerApp
