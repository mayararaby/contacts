import React from "react"
import "./index.css"
import ActionMenu from "../navIcons"
import { useNavigate } from "react-router-dom";

/**
 * @module Navbar
 * @description Navbar redirect to home page
 * @returns {JSX}
 */
export const HeaderNav = ()=>{
  const navigate = useNavigate();

  const navigateHome = ()=>(navigate("/"))

  return (
    <div className="nav-container">
      <div className="nav-title-container cursor" onClick={navigateHome}>Phony</div>
      <ActionMenu />
    </div>
  )
}