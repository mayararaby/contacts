import React, { useEffect, useState } from 'react'
import "./index.css"
import { DeleteButton } from '../delete'
import { LikeButton } from '../favorite'
import { EditButton } from '../edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ChipGender } from '../chip'
import { useNavigate } from 'react-router-dom'
import { userLocation } from '../../helpers'

export const CardInfo = ({ selectedContact }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!selectedContact || !Object.keys(selectedContact).length) {
      navigate("/");
    }
  }, [selectedContact, navigate]);

  if (!selectedContact || !Object.keys(selectedContact).length) return null;

  const { picture, name, email, phone, gender, location , uuid } = selectedContact
  const { city, state, street, country } = location
  const { first, last, title } = name

  return (
    <div className='user-card-info'>
      <div className='user-cad-menu-icon'>
        <IconButton onClick={() => (setOpen(!open))}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
      <div className='user-card-info-container'>
        <div className='user-card-image-container'>
          <img className='user-card-image' src={picture.large} alt={`${title} ${first} ${last}`} />
        </div>
        <div className='user-card-image-header'>
          {`${title} ${first} ${last}`}
        </div>
        {
          open ? <div className='user-card-info-description'>
            <div><ChipGender gender={gender} /></div>
            <div>{phone}</div>
            <div>{email}</div>
            <div className='user-info-location cursor' onClick={()=>(userLocation(`https://www.google.com/maps?q=${location.coordinates.latitude},${location.coordinates.longitude}`))}>
              <span> {`${street.number} ${street.name}, ${city}, ${state}, ${country}`} </span>
            </div>
          </div> : ""
        }
        <div className='user-card-actions-container'>
          <LikeButton selectedContact={selectedContact} selectedKey={first.charAt(0)} />
          <EditButton selectedContact={selectedContact} uuid={uuid} selectedKey={first.charAt(0)} />
          <DeleteButton selectedContact={selectedContact} selectedKey={first.charAt(0)} />
        </div>
      </div>

    </div>
  )
}
