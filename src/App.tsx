// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SchoolInfo from './pages/schoolinfo';
import SchoolDetail from './pages/schoolDetail';
import Specialinfo from './pages/specialinfo';
import SpecialDetail from './pages/specialDetail';
import SchoolRecommend from './pages/schoolRecommend';
import Login from './pages/login';
import Home from './pages/home';

function App() {

  return (
      <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route index element={<Login />} />

            <Route path="school" element={<SchoolInfo />} />
            <Route path="school/:schoolId" element={<SchoolDetail />} />
            <Route path="special" element={<Specialinfo />} />
            <Route path="special/:specialId" element={<SpecialDetail />} />
            <Route path="recommend" element={<SchoolRecommend />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
