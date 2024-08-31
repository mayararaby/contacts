import { colorPalette } from "../constants"
import { setDetailedContacts } from "../redux/actions";


export const mapResultWithLetters = (contactsResult) => {
  const contacts = {};

  contactsResult.forEach(contact => {
    const letter = contact.name.first.charAt(0).toUpperCase();

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


export const chooseContactView = (filteredContacts, keyName) => {
  let returnedContacts = {}
  const categories = Object.keys(filteredContacts)
  categories.forEach(charCategory => {
    if (filteredContacts[charCategory][keyName]) {
      returnedContacts = {
        [charCategory]: { ...filteredContacts[charCategory] }
      }
    }
  })

  return Object.keys(returnedContacts).length ? returnedContacts : filteredContacts
}

export const userLocation = (location) => {
  window.open(location, '_blank', 'noopener,noreferrer');
}

export const accessUserLocation = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        callback({ latitude, longitude });
      },
      (error) => {
        console.error('Error retrieving location', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

export const applyContactFilter = (filter, contacts, type, dispatch, oldFilter,filteredChat) => {  
  const filteredContacts = contacts.filter(contact => isMatch(filter, contact));
  let result = mapResultWithLetters(filteredContacts)
  if(filter.char) result = result[filter.char]
  dispatch(setDetailedContacts({...oldFilter , [type]:result}))

};


const isMatch = (filter, contact) => {
  return Object.keys(filter).every(key => {
    if (typeof filter[key] === 'object' && filter[key] !== null) {
      return isMatch(filter[key], contact[key]);
    }
    if (filter[key] !== '') {

      return String(contact[key]).toLowerCase().trim().startsWith(String(filter[key]).toLowerCase().trim());
    }

    return true;
  });
};


export const resetObjectValues = (obj) => {
  const resetObj = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      resetObj[key] = resetObjectValues(obj[key]); 
    } else {
      resetObj[key] = ''; 
    }
  }
  return resetObj;
};

export const getActiveFilterChar = (categories, activeKey)=>{
let character;
console.log("categories", categories)
console.log("activeKey", activeKey)

  Object.keys(categories).forEach(char=>{
    if(categories[char][activeKey] )
   {
    console.log("HEEEREE")
    character = char
    console.log("HEEEREE2", character)

   }
  })
  console.log("character =", character)
  return character
}