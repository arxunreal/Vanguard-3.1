import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EnhancedHomePage } from './components/EnhancedHomePage'
import { AboutPage } from './components/AboutPage'
import { VisionPage } from './components/VisionPage'
import { ProgramsPage } from './components/ProgramsPage'
import { EnhancedCandidateSelection } from './components/EnhancedCandidateSelection'
import { EnhancedClassTypeSelection } from './components/EnhancedClassTypeSelection'
import { EnhancedFeedbackOverview } from './components/EnhancedFeedbackOverview'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnhancedHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/candidates" element={<EnhancedCandidateSelection />} />
        <Route path="/candidate/:candidateId/class-type" element={<EnhancedClassTypeSelection />} />
        <Route path="/candidate/:candidateId/feedback/:moduleId/:sessionType" element={<EnhancedFeedbackOverview />} />
      </Routes>
    </Router>
  )
}

export default App