import React, { useState } from 'react';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { useHistory } from 'react-router-dom'; // Use if you need to navigate to different routes

const ActionMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const history = useHistory(); // Use if you need to navigate to different routes

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  // const handleMenuItemClick = (action) => {
  //   switch (action) {
  //     case 'favoriteList':
  //       // Add navigation or functionality for "Favorite List"
  //       // history.push('/favorite-list');
  //       break;
  //     case 'addNew':
  //       // Add navigation or functionality for "Add New"
  //       // history.push('/add-new');
  //       break;
  //     case 'deletedItems':
  //       // Add navigation or functionality for "Deleted Items"
  //       // history.push('/deleted-items');
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <div>
      <div className='menu-icon-container'>
        <IconButton onClick={handleClick}>
          <MenuOpenIcon sx={{ color: '#fff' }} />
        </IconButton>
      </div>
      <div className='menu-icon-container'>
        <IconButton onClick={handleClick}>
          <FavoriteBorderIcon sx={{ color: '#fff' }} />
        </IconButton>
      </div>
      <div className='menu-icon-container'>
        <IconButton onClick={handleClick}>
          <AddCircleOutlineIcon sx={{ color: '#fff' }} />
        </IconButton>
      </div>

      <div className='menu-icon-container'>
        <IconButton onClick={handleClick}>
          <DeleteOutlineIcon sx={{ color: '#fff' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default ActionMenu;
