import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { setNewContacts } from '../redux/actions';

export const EditButton = ({ selectedContact }) => {
  const dispatch = useDispatch();
  const availableContacts = useSelector((state) => state.contacts);

  const handleClick = () => {
    
  };

  return (
    <IconButton onClick={handleClick}>
      <EditIcon sx={{color:"var(--secondary-bg-color) "}} />
    </IconButton>
  );
};

