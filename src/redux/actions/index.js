import * as actionsType from "../../constants/actions";

export const setNewContacts = (contacts) => ({
  type: actionsType.SET_NEW_CONTACTS,
  payload: contacts
})

export const setFilterContacts = (contacts) => ({
  type: actionsType.SET_FILTER_CONTACT,
  payload: contacts
})


export const setFilter = (filter)=>({
  type: actionsType.SET_FILTER,
  payload: filter
})

export const setDetailedContacts =(contacts)=>({
  type: actionsType.SET_DETAILED_FILTERED_CONTACTS,
  payload: contacts
})