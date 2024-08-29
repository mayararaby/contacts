import { colorPalette } from "../constants"
import { setFilterContacts } from "../redux/actions"

export const mapResultWithLetters = (result) => {
  const contacts = {}
  result.forEach(contact => {
    const { name } = contact
    const { first } = name
    const letter = first.charAt(0)
    contacts[letter] ? contacts[letter].contacts.push(contact) : contacts[letter] = {
      color: colorPalette[getRandomColor(colorPalette)],
      activeListFilter: false,
      contacts: [contact]
    }
  })

  return contacts
}

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

export const toggleFilter = (char, filteredContacts,dispatch) => {  
  console.log("HERE 1" , filteredContacts)
  const newFilter = {...filteredContacts}
  const updatedFilteredContacts = {
    ...newFilter, [char]: {
      ...newFilter[char],
      activeListFilter: !newFilter[char].activeListFilter,
    }
  }
  dispatch(setFilterContacts(updatedFilteredContacts))
}


export const chooseContactView = (filteredContacts)=>{
  let returnedContacts = {}
  const categories =  Object.keys(filteredContacts)
  categories.forEach(charCategory=>{
    if(filteredContacts[charCategory].activeListFilter) {
      returnedContacts = {
        [charCategory] : {...filteredContacts[charCategory]}
      }
    }
  })

  return Object.keys(returnedContacts).length ? returnedContacts : filteredContacts
}