import AuthNav from '../AuthNav/AuthNav'
import Navigation from '../Navigation/Navigation'

import css from './AppBar.module.css'
const AppBar = () => {
  return (
    <div>
      <header>
        <nav className={css.nav}>
          <Navigation />
          <AuthNav />
        </nav>
      </header>
    </div>
  )
}

export default AppBar
