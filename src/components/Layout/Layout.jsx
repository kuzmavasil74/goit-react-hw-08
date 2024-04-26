import AppBar from '../AppBar/AppBar'
import { selectIsSignedIn } from '../../redux/auth/selectors'
import { useSelector } from 'react-redux'

const Layout = ({ children }) => {
  const isSignedIn = useSelector(selectIsSignedIn)
  return (
    <div>
      <AppBar isSignedIn={isSignedIn} />

      <main>{children}</main>
    </div>
  )
}

export default Layout
