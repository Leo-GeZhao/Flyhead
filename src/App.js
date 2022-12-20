import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SearchMap from './pages/SearchMap/SearchMap'
import { Landing } from './pages/Landing/Landing'
import Event from './pages/Event/Event'

const App = () => {
  return (
      <main className='App'>
          <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/map" element={<SearchMap/>}/>
              <Route path="/event" element={<Event/>}/>
          </Routes>
      </main>
  )
}

export default App