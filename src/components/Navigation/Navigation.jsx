import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import css from './Navigation.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from '../../redux/auth/selectors'
import { logout } from '../../redux/auth/operations'
const getNavLinkClassName = ({ isActive }) =>
  clsx(css.navLink, [isActive && css.active])

const Navigation = () => {
  const userData = useSelector(selectUserData)
  const dispatch = useDispatch()

  const handelLogout = () => {
    dispatch(logout())
  }
  return (
    <div>
      {' '}
      <NavLink className={getNavLinkClassName} to="/">
        Home
      </NavLink>
      <NavLink className={getNavLinkClassName} to="/contacts">
        Contacts
      </NavLink>
      <div>
        <span> Hello, {userData.name} </span>
        <button type="button" onClick={handelLogout}>
          Log out
        </button>
      </div>
    </div>
  )
}

export default Navigation
