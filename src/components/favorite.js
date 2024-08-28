import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { setNewContacts } from '../redux/actions';

export const LikeButton = ({ selectedContact }) => {
  const dispatch = useDispatch();
  const availableContacts = useSelector((state) => state.contacts);

  const handleClick = () => {
    // Create a new list of contacts with the updated liked status
    const updatedContacts = availableContacts.map(contact => 
      contact.login.uuid === selectedContact.login.uuid
        ? { ...contact, liked: !contact.liked } // Toggle the liked status
        : contact
    );

    // Dispatch the new contacts list to the Redux store
    dispatch(setNewContacts(updatedContacts));
  };

  return (
    <IconButton onClick={handleClick}>
      {selectedContact.liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

