import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export const ContactSmallCard = ({ name, image, phone }) => {
  const { title, first, last } = name

  return (
    <List >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={`${first} ${last}`} src={image} />
        </ListItemAvatar>
        <ListItemText
          primary={`${title} ${first} ${last}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
                {phone}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  )
}