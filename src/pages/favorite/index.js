import React, { useEffect, useState } from 'react'
import { HeaderNav } from '../../components/nav/header'
import { Footer } from '../../components/footer'
import { CardContact } from '../../components/card/cards'
import { useSelector } from 'react-redux'
import "./index.css"
import { chooseContactView, getLikedContacts } from '../../helpers'
import { AddNewContactIcon } from '../../components/addIcon'
export const FavoriteList = () => {

  const availableContacts = useSelector((state) => state.filteredContacts);
  const detailedContacts = useSelector((state) => state.detailedContacts)?.favorite ;

  const [categories, setCategories] = useState(availableContacts);
  const sortedCharacters = Object.keys(categories)
  const sortedCharactersFiltered = detailedContacts&& Object.keys(detailedContacts)?.length


  useEffect(() => {
    const filteredCategories = chooseContactView(sortedCharactersFiltered?detailedContacts:availableContacts, "activeFavoriteFilter");
    const likedContacts = getLikedContacts(filteredCategories)
    setCategories(likedContacts);

  }, [availableContacts, sortedCharactersFiltered, detailedContacts]);



  return (
    <div className='body-container'>
      <HeaderNav />
      <div className={`content-contacts-container ${!sortedCharacters.length ? "content-container content-contacts-container-center" : "content-contacts-container-start"}`}>
        {sortedCharacters?.length ? <CardContact filteredContacts={categories} sortedCharacters={sortedCharacters} /> : <div className='favorite-container '>
          No favorite contacts
        </div>
        }
        <AddNewContactIcon  filteredContacts={availableContacts}  sortedCharacters={sortedCharacters} type="favorite" />
      </div>
      <Footer />

    </div>
  )
}
