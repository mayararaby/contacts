import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { blue, pink } from '@mui/material/colors';

export const ChipGender = ({ gender }) => {
  let chipColor, IconComponent, IconColor;

  if (gender === 'male') {
    chipColor = "#90caf933";
    IconComponent = MaleIcon;
    IconColor="#90caf9f7"
  } else {
    chipColor = "#f48fb142";
    IconColor = "#f48fb1eb"
    IconComponent = FemaleIcon;
  }

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        icon={<IconComponent sx={{ color: IconColor }} />} // Set icon color to white
        label={gender.charAt(0).toUpperCase() + gender.slice(1)} // Capitalize gender
        variant="outlined"
        sx={{
          backgroundColor: chipColor,
          color: IconColor,
          border: 'none', // Remove border
          width: 100, // Set fixed width
          '& .MuiChip-icon': {
            color: IconColor, // Set icon color to white
          },
        }}
      />
    </Stack>
  );
};
