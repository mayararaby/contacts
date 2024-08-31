import React, { useEffect, useState } from 'react';
import { HeaderNav } from '../../components/nav/header';
import { Footer } from '../../components/footer';
import "./index.css";
import { CardContact } from '../../components/card/cards';
import { useSelector } from 'react-redux';
import { chooseContactView } from '../../helpers';
import { AddNewContactIcon } from '../../components/addIcon';
export const Contacts = () => {  
  const detailedContacts = useSelector((state) => state.detailedContacts)?.contacts ;
  const detailedContactsNo = useSelector((state) => state.detailedContacts) ;

  const availableContacts = useSelector((state) => state.filteredContacts);

  const [categories, setCategories] = useState(availableContacts);
  const sortedCharacters = Object.keys(categories)
  const sortedCharactersFiltered = detailedContacts&& Object.keys(detailedContacts)?.length


  useEffect(() => {
    const filteredCategories = chooseContactView(detailedContacts?detailedContacts:availableContacts,"activeListFilter");

    setCategories(filteredCategories);
  }, [availableContacts, sortedCharactersFiltered, detailedContacts]);


  return (
    <div className='body-container'>
      <HeaderNav />
      <div className={`content-contacts-container ${!sortedCharacters.length?"content-contacts-container-center" :""}`}>
      {sortedCharacters.length?<CardContact filteredContacts={categories} sortedCharacters={sortedCharacters} />:<div className='no-msg'>No result fount</div>}
      <AddNewContactIcon filteredContacts={availableContacts} categories={categories}  sortedCharacters={sortedCharacters} type={"contacts"}/>
      </div>
      <Footer />
    </div>
  );
}


// sortedCharacters.length ? <CardContact filteredContacts={categories} sortedCharacters={sortedCharacters} /> : <div> No available contacts </div>