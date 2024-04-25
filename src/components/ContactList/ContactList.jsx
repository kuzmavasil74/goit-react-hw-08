import { useSelector } from 'react-redux'
import Contact from '../Contacts/Contact'

import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from '../../redux/contactsSlice'

import css from './ContactList.module.css'

const ContactList = () => {
  const isError = useSelector(selectError)
  const isLoading = useSelector(selectLoading)
  const selectContacts = useSelector(selectFilteredContacts)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Oops, something happened..</p>
  if (!selectContacts.length) return <p className={css.infoText}>No contacts</p>

  return (
    <ul className={css.contactListMainContainer}>
      {selectContacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          favColor={contact.favColor}
        />
      ))}
    </ul>
  )
}

export default ContactList
