import React from "react"
import { HeaderNav } from '../../components/nav/header'
import { Footer } from '../../components/footer'
import { UserDataActions } from "../../components/cardInfo/addUser"
import "../contactInfo/index.css"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const EditContact = () => {
  const { uuid } = useParams();
  const availableContacts = useSelector((state) => state.contacts);
  const selectedContact =availableContacts?.find(contact=>contact?.uuid === uuid)
  return (
    <>
      <div className='body-container'>
        <HeaderNav />
        <div className={`card-info-background`}>
          <UserDataActions selectedContact={selectedContact} />
        </div>
        <Footer />

      </div>
    </>
  )
}