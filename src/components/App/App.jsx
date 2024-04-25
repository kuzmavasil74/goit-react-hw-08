import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { fetchContacts } from '../../redux/contacts/operations'

const HomePage = lazy(() => import('../../pages/HomePage'))
const RegistrationPage = lazy(() => import('../../pages/RegistrationPage'))
const LoginPage = lazy(() => import('../../pages/LoginPage'))
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'))

import Layout from '../Layout/Layout'
import Loader from '../Loader/Loader'

function App() {
  const dispatch = useDispatch()

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
