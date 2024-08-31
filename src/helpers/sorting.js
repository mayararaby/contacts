import { setFilterContacts } from "../redux/actions"

/**
 * @description Sort displayed contacts
 * @param {Array} objectKeys character keys
 * @param {Object} filteredContacts all catagories 
 * @param {Function} dispatch 
 */
export const sortKeys = (objectKeys, filteredContacts , dispatch)=>{
  const sort = objectKeys.sort()
  const sortedObject = {}
  sort.forEach(char=>{
    sortedObject[char] = filteredContacts[char]
  })

  dispatch(setFilterContacts(sortedObject))

}