import { setFilterContacts } from "../redux/actions"

export const sortKeys = (objectKeys, filteredContacts , dispatch)=>{
  const sort = objectKeys.sort()
  const sortedObject = {}
  sort.forEach(char=>{
    sortedObject[char] = filteredContacts[char]
  })

  dispatch(setFilterContacts(sortedObject))

}