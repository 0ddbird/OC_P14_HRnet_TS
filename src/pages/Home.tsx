import React from 'react'
import { NavLink } from 'react-router-dom'
import usersIcon from '../assets/users.svg'
import addUserIcon from '../assets/adduser.svg'

const Home = (): JSX.Element => {
  return (
  <div className='home'>
    <h1>Bienvenue sur HRnet</h1>
    <NavLink className='home-link' to='/create'>
    <img className='home-icon' src={addUserIcon} alt='Créer un profil employé' />
    <span>Créer un profil</span>
    </NavLink>
    <NavLink className='home-link' to='/employees'>
    <img className='home-icon' src={usersIcon} alt='Consulter tous les profils' />
    <span>Consulter les profils</span>
    </NavLink>
  </div>
  )
}

export default Home
