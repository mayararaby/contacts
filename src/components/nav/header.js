import React from "react"
import headerIcon  from "../../assets/contactAsset.png"
import "./index.css"
export const HeaderNav = ()=>{

  return (
    <div className="nav-container">
      <img src={headerIcon} alt="headerIcon" className="img-nav" />
      <div className="nav-title-container"><span className="nav-title-char">C</span>ontact</div>
    </div>
  )
}