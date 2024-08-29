import React from 'react'
import { HeaderNav } from '../../components/nav/header'
import { Footer } from '../../components/footer'
import { CardContact } from '../../components/card/cards'
import { useSelector } from 'react-redux'
import "./index.css"
import { getLikedContacts } from '../../helpers'
export const FavoriteList = () => {
  // const availableContacts = useSelector((state) => state.contacts);
  const availableContacts = useSelector((state) => state.filteredContacts);

  const likedContacts = getLikedContacts(availableContacts)


  return (
    <div className='body-container'>
      <HeaderNav />
      <div className={`content-contacts-container ${!Object.keys(likedContacts).length ? "content-container content-contacts-container-center" : "content-contacts-container-start"}`}>
        {Object.keys(likedContacts).length ? <CardContact filteredContacts={likedContacts} /> : <div className='favorite-container '>
          No favorite contacts
        </div>
        }
      </div>
      <Footer />

    </div>
  )
}
