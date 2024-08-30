import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { setFilterContacts, setNewContact, setNewContacts } from "../redux/actions";
import { mapResultWithLetters } from "../helpers";

export const useRegisterContact = (initialContact = {}) => {
  const [userContact, setUserContact] = useState(initialContact);

  console.log("initialContact ==>",  initialContact)
  useEffect(() => {
    if (Object.keys(userContact)?.length) {
      const {type } = userContact
      type === "add" && handleNewContact()
    }
    console.log("userContact ==>", userContact)

  },[userContact])

  const handleNewContact = ()=>{
    const {dispatch , navigate,availableContacts} = userContact
    const newContacts = [...availableContacts ,{...userContact.data,uuid: uuidv4() } ]
   
    dispatch(setNewContacts(newContacts))
    const filteredResult = mapResultWithLetters(newContacts)
    dispatch(setFilterContacts(filteredResult))

    console.log({newContacts},"<= hook")
    navigate("/contacts")

  }
  return { setUserContact };
}
