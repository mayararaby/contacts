import { setFilterContacts} from "../redux/actions"

export const toggleContactFilter = (char, filteredContacts, dispatch) => {
  const newFilter = updateFilterKey (char, filteredContacts, "activeListFilter",dispatch,"contactsList")

  dispatch(setFilterContacts(newFilter));
};

export const toggleFavoriteFilter = (char, filteredContacts, dispatch) => {

  const newFilter = updateFilterKey(char, filteredContacts,"activeFavoriteFilter",dispatch,"favorite")
  dispatch(setFilterContacts(newFilter));
}

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