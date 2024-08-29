import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterContacts, setNewContacts } from '../redux/actions';

export const LikeButton = ({ selectedContact, selectedKey }) => {
  const dispatch = useDispatch();
  const availableContacts = useSelector((state) => state.contacts);
  const filteredContacts = useSelector((state) => state.filteredContacts);


  const handleClick = () => {
    // Create a new list of contacts with the updated liked status
    const updatedContacts = availableContacts.map(contact =>
      contact.uuid === selectedContact.uuid
        ? { ...contact, liked: !contact.liked } // Toggle the liked status
        : contact
    );

    const updatedFilteredContacts = filteredContacts[selectedKey].contacts.map(contact => contact.uuid === selectedContact.uuid
      ? { ...contact, liked: !contact.liked }
      : contact)

    const updatedInStore = {
      ...filteredContacts, [selectedKey]: {
        ...filteredContacts[selectedKey],
        contacts: updatedFilteredContacts
      }
    }
    // Dispatch the new contacts list to the Redux store
    dispatch(setNewContacts(updatedContacts));
    dispatch(setFilterContacts(updatedInStore))

  };

  return (
    <IconButton onClick={handleClick}>
      {selectedContact?.liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

