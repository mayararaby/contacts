import React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { toggleContactFilter, toggleFavoriteFilter } from '../../helpers/characterFilter';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const CharItem = ({ character, filteredContacts, availableContacts }) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const { pathname } = location



  const getBackgroundColor = () => filteredContacts[character]?.color;

  const handleClick = () => {
    if (pathname === "/contacts") {
      toggleContactFilter(character, availableContacts, dispatch);
    } else {
      toggleFavoriteFilter(character, availableContacts, dispatch);
    }
  };

  const renderIcon = () => {
    const isContactsPage = pathname === "/contacts";
    const isActive = isContactsPage 
      ? filteredContacts[character]?.activeListFilter 
      : filteredContacts[character]?.activeFavoriteFilter;

    return isActive ? <FilterAltIcon /> : <FilterAltOutlinedIcon />;
  };

  return (
    <div
      className="char-item cursor"
      style={{ backgroundColor: getBackgroundColor() }}
      onClick={handleClick}
    >
      <span>{renderIcon()}</span>
      <span>{character}</span>
    </div>
  );
};

