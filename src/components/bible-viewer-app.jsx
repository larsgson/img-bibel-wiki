import React from 'react'
import BibleView from './bible-view'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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
  return (
    <div style={defaultBackgroundStyle}>
      <ThemeProvider theme={theme}>
        <BibleView
          onExitNavigation={() => console.log("onExitNavigation - BibleView")}
        />        
      </ThemeProvider>
    </div>
  )
}

export default BibleviewerApp
