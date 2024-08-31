import React, { useEffect, useState } from 'react'
import { HeaderNav } from '../../components/nav/header'
import { Footer } from '../../components/footer'
import { CardContact } from '../../components/card/cards'
import { useDispatch, useSelector } from 'react-redux'
import "./index.css"
import { applyFiler, chooseContactView, getLikedContacts } from '../../helpers'
import { AddNewContactIcon } from '../../components/addIcon'
export const FavoriteList = () => {

  const availableContacts = useSelector((state) => state.filteredContacts);
  const filter = useSelector((state) => state.filter).favorite;
  
  const contacts = useSelector((state) => state.contacts);
  const detailedContacts = useSelector((state) => state.detailedContacts)?.favorite ;

  const [categories, setCategories] = useState(availableContacts);
  const [filteredCategories, seFilteredCategories] = useState(availableContacts);

  const sortedCharacters = Object.keys(categories)
  const dispatch = useDispatch()


  useEffect(() => {
    const filteredCategories = chooseContactView(availableContacts, "activeFavoriteFilter");
    const likedContacts = getLikedContacts(filteredCategories)
    setCategories(likedContacts);
    !filter&&seFilteredCategories(availableContacts)
  }, [availableContacts, contacts, filter]);

  useEffect(() => {
    if (filter && Object.keys(filter)) {
      const Result = applyFiler(contacts, filter, "favorite", dispatch, availableContacts)
      seFilteredCategories(Result)
    }
  }, [filter, contacts, dispatch])



  return (
    <div className='body-container'>
      <HeaderNav />
      <div className={`content-contacts-container ${!sortedCharacters.length ? "content-container content-contacts-container-center" : "content-contacts-container-start"}`}>
        {sortedCharacters?.length ? <CardContact filteredCategories={filteredCategories} filteredContacts={categories} sortedCharacters={sortedCharacters} /> : <div className='favorite-container '>
          No favorite contacts
        </div>
        }
        <AddNewContactIcon  filteredContacts={availableContacts}  sortedCharacters={sortedCharacters} categories={categories}  type="favorite" />
      </div>
      <Footer />

    </div>
  )
}
