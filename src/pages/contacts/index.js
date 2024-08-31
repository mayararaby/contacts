import React, { useEffect, useState } from 'react';
import { HeaderNav } from '../../components/nav/header';
import { Footer } from '../../components/footer';
import "./index.css";
import { CardContact } from '../../components/card/cards';
import { useDispatch, useSelector } from 'react-redux';
import { applyFiler, chooseContactView } from '../../helpers';
import { AddNewContactIcon } from '../../components/addIcon';

export const Contacts = () => {
  const filter = useSelector((state) => state.filter).contactsList;
  const availableContacts = useSelector((state) => state.filteredContacts);
  const contacts = useSelector((state) => state.contacts);

  const [categories, setCategories] = useState(availableContacts);
  const [filteredCategories, seFilteredCategories] = useState(availableContacts);

  const dispatch = useDispatch()
  const sortedCharacters = Object.keys(categories)

  useEffect(() => {
    const filteredCategories = chooseContactView(availableContacts, "activeListFilter");
    setCategories(filteredCategories);
    !filter&&seFilteredCategories(availableContacts)
  }, [availableContacts, contacts, filter]);

  useEffect(() => {
    if (filter && Object.keys(filter)) {
      const Result = applyFiler(contacts, filter, "contactsList", dispatch, availableContacts)
      seFilteredCategories(Result)
    }
  }, [filter, contacts, dispatch])


  return (
    <div className='body-container'>
      <HeaderNav />
      <div className={`content-contacts-container ${!sortedCharacters.length ? "content-contacts-container-center" : ""}`}>
        {sortedCharacters.length ? <CardContact filteredCategories={filteredCategories} filteredContacts={categories} sortedCharacters={sortedCharacters} /> : <div className='no-msg'>No result fount</div>}
        <AddNewContactIcon filteredContacts={availableContacts} categories={categories} sortedCharacters={sortedCharacters} type={"contactsList"} />
      </div>
      <Footer />
    </div>
  );
}