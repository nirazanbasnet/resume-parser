import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Upload from './pages/Upload';
import ResumeList from './pages/ResumeList';
import Details from './pages/Details';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route redirects to upload */}
        <Route path="/" element={<Upload />} />
        
        {/* Resume list route */}
        <Route path="/resumes" element={<ResumeList />} />
        
        {/* Individual resume details route */}
        <Route path="/resume/:id" element={<Details />} />
        
        {/* Catch all route - redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;