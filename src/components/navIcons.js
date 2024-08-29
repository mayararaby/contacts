import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PeopleIcon from '@mui/icons-material/People';
const ActionMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location
  const navigator = (route)=> (navigate(route))

  return (
    <div className='menu-icon-container'>
      <IconButton onClick={()=>{navigator("/myFavorite")}} >
        {pathname === "/myFavorite" ?<FavoriteIcon sx={{ color: 'var(--main-dark-text-color)' }} />:<FavoriteBorderOutlinedIcon sx={{ color: 'var(--main-dark-text-color)' }} />}
      </IconButton>
      <IconButton onClick={()=>{navigator("/")}}>
      {  pathname === "/" ?<HomeIcon sx={{ color: 'var(--main-dark-text-color)' }} />:<HomeOutlinedIcon sx={{ color: 'var(--main-dark-text-color)' }}/>}
      </IconButton>

      <IconButton onClick={()=>{navigator("/contacts")}}>
      {  pathname === "/contacts" ?<PeopleIcon sx={{ color: 'var(--main-dark-text-color)' }} />:<PeopleOutlineIcon sx={{ color: 'var(--main-dark-text-color)' }}/>}
      </IconButton>
    </div>
  );
};

export default ActionMenu;
