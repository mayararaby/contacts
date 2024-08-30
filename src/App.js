import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Error } from './pages/error';
import { ContactInfo } from './pages/contactInfo';
import { Contacts } from './pages/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from './services/callContactsService';
import { FavoriteList } from './pages/favorite';
import { AddContact } from './pages/add';
import { setFilterContacts } from './redux/actions';
import { mapResultWithLetters } from './helpers';

function App() {
  const dispatch = useDispatch();
  const availableContacts = useSelector((state) => state.contacts);

  useEffect(() => {
    fetchContacts(dispatch);
  }, [dispatch]);

  useEffect(()=>{
    const filteredResult = mapResultWithLetters(availableContacts)
    console.log("filteredResult --> ", filteredResult)
    console.log("availableContacts --> ", availableContacts)

    dispatch(setFilterContacts(filteredResult))
  },[availableContacts])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contact/:uuid" element={<ContactInfo />} />
          <Route path="/myFavorite" element={<FavoriteList />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/*" element={<Error />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
