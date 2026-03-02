import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ResumeProvider } from './context/ResumeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Build from './pages/Build';
import History from './pages/History';
import Score from './pages/Score';
import Templates from './pages/Templates';

const Contact = () => <h2>Contact Us (Coming Soon)</h2>;

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="build" element={<Build />} />
              <Route path="history" element={<History />} />
              <Route path="score" element={<Score />} />
              <Route path="templates" element={<Templates />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;
