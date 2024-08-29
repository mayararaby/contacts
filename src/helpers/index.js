import { colorPalette } from "../constants"

export const mapResultWithLetters = (result) => {
  const contacts = {}
  result.forEach(contact => {
    const { name } = contact
    const { first } = name
    const letter = first.charAt(0)
    contacts[letter] ? contacts[letter].contacts.push(contact) : contacts[letter] = {
      color: colorPalette[getRandomColor(colorPalette)],
      contacts: [contact]
    }
  })

  return contacts
}

export const getRandomColor = (colors) => {
  return Math.floor(Math.random() * colors.length);
}


export const getLikedContacts = (filteredContacts) => {
  let likedContactsByCategory  = {}
  Object.keys(filteredContacts).forEach(category => {
    const contacts = filteredContacts[category].contacts.filter(contact=>contact.liked)
    if(contacts.length) likedContactsByCategory  = {...likedContactsByCategory  , [category]: {...filteredContacts[category] , contacts}}
  })

  return likedContactsByCategory 
}