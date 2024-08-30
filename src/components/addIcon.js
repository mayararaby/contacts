import React from "react";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useNavigate } from "react-router-dom";
import { sortKeys } from "../helpers/sorting";
import { useDispatch } from "react-redux";


export const AddNewContactIcon = ({filteredContacts , sortedCharacters}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const actions = [{
    name: "Add Contact",
    icon: <PersonAddIcon />,
    function: () => navigate("/add")

  }, {
    name: "Search Contact",
    icon: <PersonSearchIcon />,
    function: () => console.log("SEARCH")
  }, {
    name: "Sort Contact",
    icon: <SwapVertIcon />,
    function: () => sortKeys(sortedCharacters,filteredContacts, dispatch)
  }];

  return (
    <Box sx={{ position: 'fixed', bottom: 80, right: 50 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<SpeedDialIcon sx={{ color: 'var(--main-dark-text-color)' }} />}
        sx={{
          '& .MuiFab-primary': {
            backgroundColor: 'var(--main-bg-color)',
            '&:hover': {
              backgroundColor: 'var(--main-bg-color-dark)' // Darker shade on hover
            }
          }
        }}
      >
        {
          actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.function}
              sx={{
                backgroundColor: 'var(--main-bg-color)',
                '&:hover': {
                  backgroundColor: 'var(--main-bg-color-dark)' // Darker shade on hover
                }
              }}
            />
          ))
        }
      </SpeedDial>
    </Box>
  );
}
