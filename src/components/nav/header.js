import React from "react"
import "./index.css"
import ActionMenu from "../navIcons"
export const HeaderNav = ()=>{

  return (
    <div className="nav-container">
      <div className="nav-title-container">Phony</div>
      <ActionMenu />
    </div>
  )
}