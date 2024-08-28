import { useEffect, useState } from "react";


export const useRegisterContact = (initialContact = {}) => {
  const [userContact, setUserContact] = useState(initialContact);

  useEffect(() => {
    if (userContact) console.log("userContact hook --> ", userContact)
  })
  return { setUserContact };
}
