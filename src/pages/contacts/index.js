import React from 'react'
import { HeaderNav } from '../../components/nav/header'
import { Footer } from '../../components/footer'
import "./index.css"
import { CardContact } from '../../components/card/cards'
import { useSelector } from 'react-redux'
export const Contacts = () => {
  const availableContacts = useSelector((state) => state.contacts);

  return (
    <div className='body-container'>
      <HeaderNav />

      <div className='content-contacts-container'>
        <CardContact rows={availableContacts} />
      </div>
      <Footer />

    </div>
  )
}
