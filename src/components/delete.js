import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { setNewContacts } from '../redux/actions';

export const DeleteButton = ({ selectedContact }) => {
  const dispatch = useDispatch();
  const availableContacts = useSelector((state) => state.contacts);

  const handleClick = () => {
    // Create a new list of contacts with the updated liked status
    const updatedContacts = availableContacts.filter(contact => contact.login.uuid !== selectedContact.login.uuid );
    // Dispatch the new contacts list to the Redux store
    dispatch(setNewContacts(updatedContacts));
  };

  return (
    <IconButton onClick={handleClick}>
      <DeleteIcon color="error" />
    </IconButton>
  );
};
