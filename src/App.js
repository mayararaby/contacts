import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Error } from './pages/error';
import { ContactInfo } from './pages/contactInfo/contactInfo';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/*" element={<Error />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
