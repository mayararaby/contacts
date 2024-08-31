import { setFilterContacts} from "../redux/actions"

/**
 * @description toggle filter on character on contacts page 
 * @param {String} char selected character 
 * @param {Object} filteredContacts selected catagories 
 * @param {Function} dispatch 
 */
export const toggleContactFilter = (char, filteredContacts, dispatch) => {
  const newFilter = updateFilterKey (char, filteredContacts, "activeListFilter",dispatch,"contactsList")

  dispatch(setFilterContacts(newFilter));
};

/**
 * @description toggle filter on character on favorite page 
 * @param {String} char selected character 
 * @param {Object} filteredContacts selected catagories 
 * @param {Function} dispatch 
 */
export const toggleFavoriteFilter = (char, filteredContacts, dispatch) => {

  const newFilter = updateFilterKey(char, filteredContacts,"activeFavoriteFilter",dispatch,"favorite")
  dispatch(setFilterContacts(newFilter));
}

/**
 * @description Apply filter on character
 * @param {String} char  selected character 
 * @param {Object} filteredContacts selected catagories 
 * @param {String} objectKey selected key based on filter page to separate filters 
 * @param {Function} dispatch 
 * @returns {Object}
 */
export const updateFilterKey = (char, filteredContacts ,objectKey,dispatch) => {
  const newFilter = {};

  Object.keys(filteredContacts).forEach(key => {
    newFilter[key] = {
      ...filteredContacts[key],
      [objectKey]: key === char ? !filteredContacts[key][objectKey] : false,
    };
    
  });
  return newFilter
}