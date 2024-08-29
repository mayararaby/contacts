import React, { useEffect, useState } from 'react';
import { HeaderNav } from '../../components/nav/header';
import { Footer } from '../../components/footer';
import "./index.css";
import { CardContact } from '../../components/card/cards';
import { useSelector } from 'react-redux';
import { chooseContactView } from '../../helpers';

export const Contacts = () => {
  const availableContacts = useSelector((state) => state.filteredContacts);
  const sortedCharacters = Object.keys(availableContacts)

  // const [categories, setCategories] = useState(availableContacts);

  useEffect(() => {
    const filteredCategories = chooseContactView(availableContacts);
    // setCategories(filteredCategories);
  }, [availableContacts]);

  // console.log("categories", categories);
  return (
    <div className='body-container'>
      <HeaderNav />
      <div className={`content-contacts-container ${!sortedCharacters.length?"content-contacts-container-center" :""}`}>
        <CardContact filteredContacts={availableContacts} sortedCharacters={sortedCharacters} />
      </div>
      <Footer />
    </div>
  );
}
