import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectIsSignedIn } from '../../redux/auth/selectors'

const RestrictedRoute = ({ children }) => {
  const isSignedIn = useSelector(selectIsSignedIn)

  return isSignedIn ? <Navigate to="/contacts" replace /> : children
}

export default RestrictedRoute
