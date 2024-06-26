import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { apiGetContacts } from '../../redux/contacts/operations'

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'))
const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage')
)
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'))
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'))

import Layout from '../Layout/Layout'
import Loader from '../Loader/Loader'
import { refreshUser } from '../../redux/auth/operations'
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute'
import PrivateRoute from '../PrivateRoute/PrivateRoute'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(apiGetContacts())
  }, [dispatch])

  return (
    <div>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>

            <Route
              path="/register"
              element={
                <RestrictedRoute>
                  <RegistrationPage />
                </RestrictedRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <LoginPage />
                </RestrictedRoute>
              }
            ></Route>
            <Route
              path="/contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            ></Route>

            <Route path="*" element={<HomePage />}></Route>
          </Routes>
        </Suspense>
      </Layout>
    </div>
  )
}

export default App
