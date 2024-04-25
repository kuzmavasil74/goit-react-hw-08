import ContactForm from '../ContactForm/ContactForm'
import ContactList from '../ContactList/ContactList'
import SearchBox from '../SearchBox/SearchBox'

import css from './App.module.css'
import { useDispatch } from 'react-redux'

import { useEffect } from 'react'
import { fetchContacts } from '../../redux/contacts/operations'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  return (
    <div className={css.container}>
      <h1 className={css.appTitle}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  )
}

export default App
