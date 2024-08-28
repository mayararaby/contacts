import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { fetchContacts } from '../../services/callContactsService';
import "./style.css";
import { HeaderNav } from '../../components/nav/header';
import { Footer } from '../../components/footer';
import { CardContact } from '../../components/card/cards';
import { useNavigate } from 'react-router-dom';
export const Home = () => {

  const availableContacts = useSelector((state) => state.contacts);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    if(availableContacts.length) setLoading(false)
  },[availableContacts])
  

  const navigateToContacts = () => {
    navigate('/contacts');

  }
  return (
    <div className="home-container">

      <div className='body-container'>
        <HeaderNav />

        <div className='content-container'>
          {loading ? (
            <div className='loading'>
              <CircularProgress color="inherit" />
            </div>
          ) : <div className='cards-container'>
            <button className="home-explore-button" onClick={navigateToContacts}> Explore Contacts</button>

            {/* <CardContact rows={availableContacts} /> */}
          </div>
          }
        </div>
        <Footer />

      </div>

    </div>
  );
};
