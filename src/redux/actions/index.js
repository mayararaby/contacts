import * as actionsType from "../../constants/actions";

export const setNewContacts = (contacts) => ({
  type: actionsType.SET_NEW_CONTACTS,
  payload: contacts
})

export const setNewContact = (contact) => ({
  type: actionsType.SET_NEW_CONTACT,
  payload: contact
})