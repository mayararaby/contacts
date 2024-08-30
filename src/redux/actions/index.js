import * as actionsType from "../../constants/actions";

export const setNewContacts = (contacts) => ({
  type: actionsType.SET_NEW_CONTACTS,
  payload: contacts
})

export const setFilterContacts = (contacts) => ({
  type: actionsType.SET_FILTER_CONTACTS,
  payload: contacts
})
