import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
const ActionMenu = () => {

  return (
    <div className='menu-icon-container'>
      <IconButton >
        <FavoriteIcon sx={{ color: 'var(--main-light-text-color)' }} />
      </IconButton>
      <IconButton>
        <HomeIcon sx={{ color: 'var(--main-light-text-color)' }} />
      </IconButton>
    </div>
  );
};

export default ActionMenu;
