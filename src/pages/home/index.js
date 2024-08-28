import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { fetchContacts } from '../../services/callContactsService';
import "./style.css";
import { HeaderNav } from '../../components/nav/header';
import { Footer } from '../../components/footer';
export const Home = () => {
  const dispatch = useDispatch();
  const availableContacts = useSelector((state) => state.contacts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contacts and handle loading state
    try {
      fetchContacts(dispatch);
    } finally {
      // Ensure loading is turned off after fetching data
      setLoading(false);
    }
  }, [dispatch]);

  // Determine if contacts are still being fetched
  const isLoading = loading || (availableContacts && availableContacts.length === 0);

  return (
    <div className="home-container">
      {isLoading ? (
        <div className='loading'>
          <CircularProgress color="inherit" />
        </div>
      ) :
        <div className='home-body-container'>
          <HeaderNav />

          <div className='content-container'></div>
          <Footer />

        </div>
      }
    </div>
  );
};
