import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Error } from './pages/error';
import { ContactInfo } from './pages/contactInfo/contactInfo';
import { Contacts } from './pages/contacts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from './services/callContactsService';
import { FavoriteList } from './pages/favorite';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchContacts(dispatch);
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/myFavorite" element={<FavoriteList />} />
          <Route path="/*" element={<Error />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
