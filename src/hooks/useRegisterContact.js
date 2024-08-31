import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { setFilterContacts, setNewContacts } from "../redux/actions";
import { mapResultWithLetters } from "../helpers";

/**
 * @module Add
 * @description custom hook to add or edit user
 * @param {Object} initialContact 
 * @returns {Function}
 */
export const useRegisterContact = (initialContact = {}) => {
  const [userContact, setUserContact] = useState(initialContact);

  useEffect(() => {
    if (Object.keys(userContact)?.length) {
      const { type } = userContact
      type === "add" ? handleNewContact() : handleEditContact()
    }

  }, [userContact])

  /**
   * @description create new contact user
   */
  const handleNewContact = () => {
    const { dispatch, navigate, availableContacts, data } = userContact
    const newContacts = [...availableContacts, { ...data, uuid: uuidv4() ,char:data.name.first.charAt(0)}]
    updateRedux(newContacts , dispatch, navigate)
  }

  /**
   * @description get selected user and update its data
   */
  const handleEditContact = ()=>{
    const { dispatch,  availableContacts , uuid,data, navigate} = userContact

    const updatedContact = availableContacts.map(contact=>{
      if(contact.uuid === uuid) {
        contact = {...contact,...data}
      }
      return contact
    })
    console.log({updatedContact})
    updateRedux(updatedContact , dispatch, navigate)

  }

  /**
   * @description update redux with new contacts and redirect to contacts page
   * @param {Array} newContacts 
   * @param {Function} dispatch 
   * @param {Function} navigate 
   */
  const updateRedux = (newContacts, dispatch, navigate)=>{
    dispatch(setNewContacts(newContacts))
    const filteredResult = mapResultWithLetters(newContacts)
    dispatch(setFilterContacts(filteredResult))
    navigate("/contacts")

  }
  return { setUserContact };
}
