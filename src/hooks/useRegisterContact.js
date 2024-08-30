import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { setNewContact } from "../redux/actions";

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
    const {dispatch , navigate} = userContact
    dispatch(setNewContact({...userContact,uuid: uuidv4() }))
    navigate("/contacts")

  }
  return { setUserContact };
}
