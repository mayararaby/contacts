import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { fetchContacts } from '../../services/callContactsService';
import { CardItem } from "../../components/card/card"
import "./style.css";
import ActionMenu from '../../components/sidebarMenu';
import { HeaderNav } from '../../components/nav/header';
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
      <div className='home-page'>
        <div className='home-page-nav'>
          <HeaderNav />
        </div>
        <div className='home-page-content'>
        <div className='sidebar-container'><ActionMenu /></div>
            <div className='content-container'><CardItem rows={availableContacts} /></div>
            <div className='sidebar-container'><ActionMenu /></div>
        </div>
      </div>
      }
    </div>
  );
};
