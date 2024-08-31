import React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { toggleContactFilter, toggleFavoriteFilter } from '../../helpers/characterFilter';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

/**
 * @module CharItem
 * @description char circle
 * @param {*} param0 
 * @returns {JSX}
 */
export const CharItem = ({ character, filteredContacts, availableContacts }) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const { pathname } = location



  /**
   * @description generate random color
   * @returns {String} color
   */
  const getBackgroundColor = () => filteredContacts[character]?.color;

  /**
   * @description toggle filter on chars 
   */
  const handleClick = () => {
    if (pathname === "/contacts") toggleContactFilter(character, availableContacts, dispatch);
    else toggleFavoriteFilter(character, availableContacts, dispatch);
  };

  /**
   * @description choose filter icon based on active filter or not
   * @returns {JSX} filter icon
   */
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
      id={character}
    >
      <span>{renderIcon()}</span>
      <span>{character}</span>
    </div>
  );
};

