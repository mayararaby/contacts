import { colorPalette } from "../constants"
import { setFilterContacts } from "../redux/actions"
import { v4 as uuidv4 } from 'uuid';


export const mapResultWithLetters = (contactsResult) => {
  const contacts = {};
  
  contactsResult.forEach(contact => {
    const contactWithUuid = { ...contact, uuid: uuidv4() };
    const letter = contactWithUuid.name.first.charAt(0);
    
    if (contacts[letter]) {
      contacts[letter].contacts.push(contactWithUuid);
    } else {
      contacts[letter] = {
        color: colorPalette[getRandomColor(colorPalette)],
        activeListFilter: false,
        activeFavoriteFilter: false,
        contacts: [contactWithUuid],
      };
    }
  });

  return contacts;
};

export const getRandomColor = (colors) => {
  return Math.floor(Math.random() * colors.length);
}


export const getLikedContacts = (filteredContacts) => {
  let likedContactsByCategory = {}
  Object.keys(filteredContacts).forEach(category => {
    const contacts = filteredContacts[category].contacts.filter(contact => contact.liked)
    if (contacts.length) likedContactsByCategory = { ...likedContactsByCategory, [category]: { ...filteredContacts[category], contacts } }
  })

  return likedContactsByCategory
}

export const toggleContactFilter = (char, filteredContacts,dispatch) => {  
  const newFilter = {...filteredContacts}
  const updatedFilteredContacts = {
    ...newFilter, [char]: {
      ...newFilter[char],
      activeListFilter: !newFilter[char].activeListFilter,
    }
  }
  dispatch(setFilterContacts(updatedFilteredContacts))
}

export const toggleFavoriteFilter = (char, filteredContacts,dispatch) => {  
  const newFilter = {...filteredContacts}
  const updatedFilteredContacts = {
    ...newFilter, [char]: {
      ...newFilter[char],
      activeFavoriteFilter: !newFilter[char].activeFavoriteFilter,
    }
  }
  dispatch(setFilterContacts(updatedFilteredContacts))
}

export const chooseContactView = (filteredContacts, keyName)=>{
  let returnedContacts = {}
  const categories =  Object.keys(filteredContacts)
  categories.forEach(charCategory=>{
    if(filteredContacts[charCategory][keyName]) {
      returnedContacts = {
        [charCategory] : {...filteredContacts[charCategory]}
      }
    }
  })

  return Object.keys(returnedContacts).length ? returnedContacts : filteredContacts
}