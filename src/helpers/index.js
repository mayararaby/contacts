import { colorPalette } from "../constants"
import { setFilterContacts } from "../redux/actions";
import { updateFilterKey } from "./characterFilter";
import _ from 'lodash';

/**
 * @description mapping all names with the same first char at one category
 * @param {Array} contactsResult 
 * @returns {Object}
 */
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

/**
 * @description generate random index to select random color from array
 * @param {Array} colors 
 * @returns {Number}
 */
export const getRandomColor = (colors) => {
  return Math.floor(Math.random() * colors.length);
}

/**
 * @description get all liked contacts in the categories
 * @param {Object} filteredContacts 
 * @returns {Object} Liked contacts in category
 */
export const getLikedContacts = (filteredContacts) => {
  let likedContactsByCategory = {}
  Object.keys(filteredContacts).forEach(category => {
    const contacts = filteredContacts[category].contacts.filter(contact => contact.liked)
    if (contacts.length) likedContactsByCategory = { ...likedContactsByCategory, [category]: { ...filteredContacts[category], contacts } }
  })

  return likedContactsByCategory
}

/**
 * @description choose display all categories or display just char category filter
 * @param {Object} filteredContacts contact categories
 * @param {String} keyName to determine if its favorite filter or contacts filter
 * @returns {Object}
 */
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

/**
 * @description open google map url with use [x , y]
 * @param {url} location 
 */
export const userLocation = (location) => {
  window.open(location, '_blank', 'noopener,noreferrer');
}

/**
 * @description get current position [x,y] from user browser
 * @param {Function} callback 
 */
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

/**
 * @description get number of filtered data
 * @param {Object} filter selected filter 
 * @param {Array} contacts current contacts  
 * @param {Object} availableContacts 
 * @returns {Number} length of result of filter
 */
export const applyContactFilter = (filter, contacts) => {
  let result = contacts.filter(contact => isMatch(filter, contact));
  return result.length
};

/**
 * @description filter current categories
 * @param {Array} contacts current contacts
 * @param {Object} filter selected filter 
 * @param {String} type page type to separate pages filter
 * @param {Function} dispatch 
 * @param {Object} availableContacts 
 * @returns {Object} filtered catagories
 */
export const applyFiler = (contacts, filter, type, dispatch, availableContacts) => {
  let resultOptions = contacts.filter(contact => isMatch(filter, contact));
  const updateFilterChar = mapResultWithLetters(resultOptions)
  const filterKey = type === "contactsList" ? "activeListFilter" : "activeFavoriteFilter"
  const groups = updateFilterKey(filter?.char, updateFilterChar, filterKey)
  updateSelectedKey(availableContacts, groups, dispatch, filterKey)
  return groups

}

/**
 * @description update character filter with filters
 * @param {Object} availableContacts current categories
 * @param {Object} newContacts new filtered categories
 * @param {Function} dispatch 
 * @param {String} type page type
 */
const updateSelectedKey = (availableContacts, newContacts, dispatch, type) => {

  let cloneAvailableContacts = _.cloneDeep(availableContacts)
  Object.keys(cloneAvailableContacts).forEach(character => {
    if (newContacts[character]) cloneAvailableContacts = { ...cloneAvailableContacts, [character]: newContacts[character] }
    else cloneAvailableContacts={ ...cloneAvailableContacts, [character]: {...cloneAvailableContacts[character] , [type]:false} }
  })

  dispatch(setFilterContacts(cloneAvailableContacts))

}

/**
 * @description recursive function to get nested filter object an contact value
 * @param {Object} filter selected filter
 * @param {Object} contact 
 * @returns {boolean}
 */
const isMatch = (filter, contact) => {
  return Object.keys(filter).every(key => {
    if (typeof filter[key] === 'object' && filter[key] !== null && !Array.isArray(filter[key])) {
      return isMatch(filter[key], contact[key]);
    }
    if (filter[key] !== '') {
      return String(contact[key]).toLowerCase().trim().startsWith(String(filter[key]).toLowerCase().trim());
    }
    return true;
  });
};

/**
 * @description recursive function to reset filter schema input after reset all filters
 * @param {Object} obj filter schema input
 * @returns {Object}
 */
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

/**
 * @description get the current active filter on char to update schema filter with it
 * @param {Object} categories 
 * @param {String} activeKey 
 * @returns {String} active char filter
 */
export const getActiveFilterChar = (categories, activeKey) => {
  let character;
  Object.keys(categories).forEach(char => {
    if (categories[char][activeKey]) character = char
  })
  return character || ""
}