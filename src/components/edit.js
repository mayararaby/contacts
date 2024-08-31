import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

/**
 * @module Edit
 * @description edit a user based on its id
 * @param {*} param0 
 * @returns {JSX}
 */
export const EditButton = ({ uuid }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/edit/${uuid}`)
  };

  return (
    <IconButton onClick={handleClick}>
      <EditIcon  />
    </IconButton>
  );
};

