import Navbar from './components/navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router";
import Home from './pages';
import Projects from './pages/projects';
import Qualifications from './pages/qualifications';
import Contact from './pages/contact';
import './App.css';

function App() {
  return (
    <Router>
      <body>
        <div id="container">
          <header>
            <h1>Portfolio Website</h1>
            <Navbar />
          </header>
          <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/qualifications' element={<Qualifications />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
          </main>
        </div>
      </body>
    </Router>
  )
}

export default App;