import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { setFilterContacts, setNewContacts } from "../redux/actions";
import { mapResultWithLetters } from "../helpers";

export const useRegisterContact = (initialContact = {}) => {
  const [userContact, setUserContact] = useState(initialContact);

  useEffect(() => {
    if (Object.keys(userContact)?.length) {
      const { type } = userContact
      type === "add" ? handleNewContact() : handleEditContact()
    }

  }, [userContact])

  const handleNewContact = () => {
    const { dispatch, navigate, availableContacts, data } = userContact
    const newContacts = [...availableContacts, { ...data, uuid: uuidv4() }]
    updateRedux(newContacts , dispatch, navigate)
  }

  const handleEditContact = ()=>{
    const { dispatch,  availableContacts , uuid,data, navigate} = userContact
    const updatedContact = availableContacts.map(contact=>{
      if(contact.uuid === uuid) {
        contact = data
      }
      return contact
    })
    updateRedux(updatedContact , dispatch, navigate)

  }

  const updateRedux = (newContacts, dispatch, navigate)=>{
    dispatch(setNewContacts(newContacts))
    const filteredResult = mapResultWithLetters(newContacts)
    dispatch(setFilterContacts(filteredResult))
    navigate("/contacts")

  }
  return { setUserContact };
}
