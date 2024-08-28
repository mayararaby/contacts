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
import { colorPalette } from "../../constants"
import { getRandomColor } from "../../helpers" 
export const CardContact = ({ rows }) => {
  return (
    <>
      {
        rows?.length && rows?.map((row, index) => {
          const { gender, name, email, phone, picture } = row;
          const { title, first, last } = name

          const { large } = picture;
          return (
            <div className="card-item">
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: colorPalette[getRandomColor(colorPalette)] }} aria-label="recipe">
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
                      <LikeButton selectedContact={row} />
                      <DeleteButton selectedContact={row} />
                    </div>
                    <div>
                      <ChipGender gender={gender} />
                    </div>

                  </div>
                </CardActions>

              </Card>
            </div>
          )
        })
      }
    </>
  )
}