import React from "react"
import img from "../../assets/test.jpg"
import { ChipGender } from "../chip"
import { LikeButton } from "../favorite"
import { DeleteButton } from "../delete"
import "./index.css"
export const CardContact = ({ rows }) => {
  return (
    <>
      <div className="cards-container-parent">
        {
          rows?.length && rows?.map((row, index) => {
            const { gender, name, email, phone, picture } = row;
            const { title, first, last } = name

            const { large } = picture;
            return (<div className="card-item" key={index}>
              <div className="card-header">{`${title} ${first} ${last}`}</div>
              <div className="card-description">{phone}</div>
              <div className="card-description">{email}</div>
              <div className="card-img-container"><img src={large} alt={`${title} ${first} ${last}`} className="card-img" /></div>
              <div>
                <ChipGender gender={gender} />
                <div>
                  <LikeButton />
                  <DeleteButton />
                </div>
              </div>
            </div>)
          })
        }

      </div>
      
    </>
  )
}