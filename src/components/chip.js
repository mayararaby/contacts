import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

/**
 * @module Gender
 * @description display user gender
 * @param {*} param0 
 * @returns {JSX}
 */
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
        icon={<IconComponent sx={{ color: IconColor }} />}
        label={gender.charAt(0).toUpperCase() + gender.slice(1)} 
        variant="outlined"
        sx={{
          backgroundColor: chipColor,
          color: IconColor,
          border: 'none', 
          width: 100, 
          '& .MuiChip-icon': {
            color: IconColor, 
          },
        }}
      />
    </Stack>
  );
};
