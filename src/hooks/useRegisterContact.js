import { useEffect, useState } from "react";


export const useRegisterContact = (initialContact = {}) => {
  const [userContact, setUserContact] = useState(initialContact);

  console.log("initialContact ==>",  initialContact)
  useEffect(() => {
    if (Object.keys(userContact)?.length) {
    }
    console.log("userContact ==>", userContact)

  },[userContact])
  return { setUserContact };
}
