import React, { useContext } from 'react'
import Popular from './components/Popular'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AnimeItem from './components/AnimeItem'
import Homepage from './components/Homepage'
import Gallery from './components/Gallery'


const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/anime/:id' element={<AnimeItem />} />
        <Route path='/character/:id' element={<Gallery />} />
      </Routes>
    </Router>
  )
}

export default App
