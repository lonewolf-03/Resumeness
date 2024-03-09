import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Home from './pages/Home/Home';
import Resume from './pages/Resume/Resume';
import CurrentResume from './pages/CurrentResume/CurrentResume';
import CoverLetter from './pages/CoverLetter/CoverLetter';
import About from './pages/About/About';
import './App.css'

// I used Routes instead of Switch becuase I am using react router v6

function App() {
  return (
    <BrowserRouter>
          <header>
              <nav className='nav'>
                <NavBar/>
              </nav>
          </header>
          <main className="AppContent">
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route path='/resume' element={<Resume/>}/>
              <Route path='/resume/:id' element={<CurrentResume/>}/>
              <Route path='/coverletter' element={<CoverLetter/>}/>
              <Route path='/about' element={<About/>}/>
            </Routes>
          </main>
    </BrowserRouter>
  );
}

export default App;