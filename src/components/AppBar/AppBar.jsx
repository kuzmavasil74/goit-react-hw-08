import AuthNav from '../AuthNav/AuthNav'
import Navigation from '../Navigation/Navigation'

import css from './AppBar.module.css'
const AppBar = ({ isSignedIn }) => {
  return (
    <div>
      <header>
        <nav className={css.nav}>
          {isSignedIn ? <Navigation /> : <AuthNav />}
        </nav>
      </header>
    </div>
  )
}

export default AppBar
