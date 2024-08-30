import React from 'react'
import { HeaderNav } from '../../components/nav/header'
import { Footer } from '../../components/footer'
import { useParams } from 'react-router-dom';
import { CardInfo } from '../../components/cardInfo/cardInfo';
import "./index.css"
import { useSelector } from 'react-redux';

export const ContactInfo = () => {
  const { uuid } = useParams();
  const availableContacts = useSelector((state) => state.contacts);
  const selectedContact =availableContacts?.find(contact=>contact?.uuid === uuid)

  return (
    <div className='body-container'>
    <HeaderNav />
    <div className={`card-info-background`}>
      <CardInfo  selectedContact={selectedContact}/>
    </div>
    <Footer />

  </div>
  )
}
