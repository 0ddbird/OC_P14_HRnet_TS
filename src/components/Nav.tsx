import React from 'react'
import { NavLink } from 'react-router-dom'
import HandShakeIcon from '../assets/handshake.svg'
import addUserIcon from '../assets/adduser.svg'
import usersIcon from '../assets/users.svg'

const Nav = () => {
  return (
    <div className='nav'>
      <NavLink className='home-navlink' to='/'><img className='nav-icon' src={HandShakeIcon} alt='back to home' /> HRnet </NavLink>
      <div className='nav-right-subcontainer'>
      <NavLink className='create-navlink' to='/create'><img className='nav-icon' src={addUserIcon} alt='Créer un profil employé' /></NavLink>
      <NavLink className='employees-navlink' to='/employees'><img className='nav-icon' src={usersIcon} alt='Consulter tous les profils' /></NavLink>
      </div>
    </div>
  )
}

export default Nav
