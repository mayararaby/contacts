import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
const ActionMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location
  const navigateToHome = () => {
    navigate('/');
  }
  
  return (
    <div className='menu-icon-container'>
      <IconButton >
        {pathname === "/favorite" ?<FavoriteIcon sx={{ color: 'var(--main-light-text-color)' }} />:<FavoriteBorderOutlinedIcon sx={{ color: 'var(--main-light-text-color)' }} />}
      </IconButton>
      <IconButton onClick={navigateToHome}>
      {  pathname === "/" ?<HomeIcon sx={{ color: 'var(--main-light-text-color)' }} />:<HomeOutlinedIcon sx={{ color: 'var(--main-light-text-color)' }}/>}
      </IconButton>
    </div>
  );
};

export default ActionMenu;
