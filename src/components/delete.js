import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterContacts, setNewContacts } from '../redux/actions';
/**
 * @module Delete
 * @description delete a user based on its id
 * @param {*} param0 
 * @returns {JSX}
 */
export const DeleteButton = ({ selectedContact, selectedKey }) => {
  const dispatch = useDispatch();
  const availableContacts = useSelector((state) => state.contacts);
  const filteredContacts = useSelector((state) => state.filteredContacts);

  const handleClick = () => {
    // Create a new list of contacts without selected id
    const updatedContacts = availableContacts.filter(contact => contact.uuid !== selectedContact.uuid);
    // Dispatch the new contacts list to the Redux store
    dispatch(setNewContacts(updatedContacts));

    const updatedFilteredContacts = filteredContacts[selectedKey].contacts.filter(contact => contact.uuid !== selectedContact.uuid)

    const storedContacts = {
      ...filteredContacts,
      [selectedKey]: {
        ...filteredContacts[selectedKey],
        contacts: updatedFilteredContacts
      }
    };
    
    if (!updatedFilteredContacts.length)  delete storedContacts[selectedKey];


    // Dispatch the new contacts catagories list to the Redux store
    dispatch(setFilterContacts(storedContacts))
  };

  return (
    <IconButton onClick={handleClick}>
      <DeleteIcon color="error" />
    </IconButton>
  );
};
