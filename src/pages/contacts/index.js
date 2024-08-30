import React, { useEffect, useState } from 'react';
import { HeaderNav } from '../../components/nav/header';
import { Footer } from '../../components/footer';
import "./index.css";
import { CardContact } from '../../components/card/cards';
import { useSelector } from 'react-redux';
import { chooseContactView } from '../../helpers';
import { AddNewContactIcon } from '../../components/addIcon';
export const Contacts = () => {  
  const availableContacts = useSelector((state) => state.filteredContacts);
  const [categories, setCategories] = useState(availableContacts);
  const sortedCharacters = Object.keys(categories)


  useEffect(() => {
    const filteredCategories = chooseContactView(availableContacts,"activeListFilter");

    setCategories(filteredCategories);
  }, [availableContacts]);

  return (
    <div className='body-container'>
      <HeaderNav />
      <div className={`content-contacts-container ${!sortedCharacters.length?"content-contacts-container-center" :""}`}>
        <CardContact filteredContacts={categories} sortedCharacters={sortedCharacters} />
      <AddNewContactIcon filteredContacts={availableContacts}  sortedCharacters={sortedCharacters} s/>
      </div>
      <Footer />
    </div>
  );
}
