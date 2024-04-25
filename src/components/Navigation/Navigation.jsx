import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import css from './Navigation.module.css'
const getNavLinkClassName = ({ isActive }) =>
  clsx(css.navLink, [isActive && css.active])

const Navigation = () => {
  return (
    <div>
      {' '}
      <NavLink className={getNavLinkClassName} to="/">
        Home
      </NavLink>
      <NavLink className={getNavLinkClassName} to="/contacts">
        Contacts
      </NavLink>
    </div>
  )
}

export default Navigation
