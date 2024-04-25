import { NavLink } from 'react-router-dom'

const getNavLinkClassName = ({ isActive }) =>
  clsx(css.navLink, [isActive && css.active])

import css from './AuthNav.module.css'
import clsx from 'clsx'
const AuthNav = () => {
  return (
    <div>
      <NavLink className={getNavLinkClassName} to="/register">
        Register
      </NavLink>
      <NavLink className={getNavLinkClassName} to="/login">
        Login
      </NavLink>
    </div>
  )
}

export default AuthNav
