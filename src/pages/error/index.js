import React from 'react'
import { HeaderNav } from '../../components/nav/header'
import { Footer } from '../../components/footer'

export const Error = () => {
  return (
    <>
      <div className='body-container'>
        <HeaderNav />

        <div className={`content-contacts-container content-container content-contacts-container-center`}>
          <div className='header-container-title '>
            404 Not found
          </div>
        </div>
        <Footer />

      </div>
    </>
  )
}
