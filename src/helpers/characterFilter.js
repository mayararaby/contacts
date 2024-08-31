import { setFilterContacts } from "../redux/actions"

export const toggleContactFilter = (char, filteredContacts, dispatch) => {  
  const newFilter = {};

  Object.keys(filteredContacts).forEach(key => {
    newFilter[key] = {
      ...filteredContacts[key],
      activeListFilter: key === char ? !filteredContacts[key].activeListFilter : false,
    };
  });

  console.log("updatedFilteredContacts ", newFilter);
  dispatch(setFilterContacts(newFilter));
};

export const toggleFavoriteFilter = (char, filteredContacts,dispatch) => {  

  const newFilter = {};

  Object.keys(filteredContacts).forEach(key => {
    newFilter[key] = {
      ...filteredContacts[key],
      activeFavoriteFilter: key === char ? !filteredContacts[key].activeFavoriteFilter : false,
    };
  });

  console.log("updatedFilteredContacts ", newFilter);
  dispatch(setFilterContacts(newFilter));
}