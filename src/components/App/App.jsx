import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { fetchContacts } from '../../redux/contacts/operations'

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'))
const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage')
)
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'))
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'))

import Layout from '../Layout/Layout'
import Loader from '../Loader/Loader'
import { refreshUser } from '../../redux/auth/operations'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>

            <Route path="/register" element={<RegistrationPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/contacts" element={<ContactsPage />}></Route>

            <Route path="*" element={<HomePage />}></Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
