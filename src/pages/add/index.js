import React from "react"
import { HeaderNav } from '../../components/nav/header'
import { Footer } from '../../components/footer'
import { UserDataActions } from "../../components/cardInfo/addUser"
import "../contactInfo/index.css"

export const AddContact = () => {

  return (
    <>
      <div className='body-container'>
        <HeaderNav />
        <div className={`card-info-background`}>
          <UserDataActions />
        </div>
        <Footer />

      </div>
    </>
  )
}