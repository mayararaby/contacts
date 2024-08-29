import React from "react"
import { ChipGender } from "../chip"
import { LikeButton } from "../favorite"
import { DeleteButton } from "../delete"
import "./index.css"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';

export const CardContact = ({ filteredContacts }) => {

  const sortedCharacters = Object.keys(filteredContacts)
  return (
    <div className="cards-container">
      {
        sortedCharacters.length ? sortedCharacters.map((character, index) => {
          return (
            <div className="main-card-container" key={index}>
              <div className="char-item" style={{backgroundColor:filteredContacts[character].color }}>
                {character}
              </div>
              <div className="cards-items">
                {
                  filteredContacts[character].contacts?.map((row, index) => {
                    const { gender, name, email, phone, picture } = row;
                    const { title, first, last } = name

                    const { large } = picture;
                    return (
                      <div key={index} className="card=container">
                        <div className="card-item" key={index}>
                          <Card>
                            <CardHeader
                              avatar={
                                <Avatar sx={{ bgcolor:  filteredContacts[character].color }} aria-label="recipe">
                                  {first.charAt(0).toUpperCase()}
                                </Avatar>
                              }
                              title={`${title} ${first} ${last}`}
                              subheader={<>
                                {phone}
                                <Typography variant="body2" color="text.secondary">
                                  {email}
                                </Typography>
                              </>}

                            />
                            <CardMedia
                              component="img"
                              height="100"
                              image={large}
                              alt="Paella dish"
                              sx={{ objectFit: 'contain' }}
                            />
                            <CardActions disableSpacing>
                              <div className="actions-card-container">

                                <div>
                                  <LikeButton selectedContact={row} selectedKey={character} />
                                  <DeleteButton selectedContact={row} selectedKey={character} />
                                </div>
                                <div>
                                  <ChipGender gender={gender} />
                                </div>

                              </div>
                            </CardActions>

                          </Card>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          )
        }) : <CircularProgress color="inherit" />

      }
    </div>
  )
}