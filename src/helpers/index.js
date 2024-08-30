import { colorPalette } from "../constants"


export const mapResultWithLetters = (contactsResult) => {
  const contacts = {};
  
  contactsResult.forEach(contact => {
    const letter = contact.name.first.charAt(0);
    
    if (contacts[letter]) {
      contacts[letter].contacts.push(contact);
    } else {
      contacts[letter] = {
        color: colorPalette[getRandomColor(colorPalette)],
        activeListFilter: false,
        activeFavoriteFilter: false,
        contacts: [contact],
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

export const userLocation = (location) =>{
  window.open(location, '_blank', 'noopener,noreferrer');
}