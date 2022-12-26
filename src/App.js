import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SearchMap from './pages/SearchMap/SearchMap'
import { Landing } from './pages/Landing/Landing'
import Event from './pages/Event/Event'
import Spending from './pages/Spending/Spending'

const App = () => {
  

  
  return (
      <main className='App'>
          <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/map" element={<SearchMap />}/>
              <Route path="/event" element={<Event />}/>
              <Route path="/spending" element={<Spending />}/>
          </Routes>
      </main>
  )
}

export default App