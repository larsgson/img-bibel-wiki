import React from 'react'
import './App.css'
import { I18nextProvider } from 'react-i18next'
import i18n from './constants/i18n'
import { BrowserDataProvider } from "./context/browser-data-context"
import BibleviewerApp from './components/bible-viewer-app'

const App = () => {

  return (
    <I18nextProvider i18n={ i18n }>
      <BrowserDataProvider>
          <BibleviewerApp/>
      </BrowserDataProvider>
    </I18nextProvider>
  )
}

export default App
