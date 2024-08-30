import { setFilterContacts } from "../redux/actions"

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