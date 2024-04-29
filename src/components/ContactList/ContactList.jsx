import {
  apiDeleteContacts,
  apiGetContacts,
} from '../../redux/contacts/operations'
import { useEffect } from 'react'
import {
  selectPhonebookContacts,
  selectPhonebookIsError,
  selectPhonebookIsLoading,
} from '../../redux/contacts/selectors'
import Loader from '../../components/Loader/Loader'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import Contact from '../Contacts/Contact'
import { selectFilteredContacts } from '../../redux/filters/slice'
const ContactList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(apiGetContacts())
  }, [dispatch])

  const isLoading = useSelector(selectPhonebookIsLoading)
  const isError = useSelector(selectPhonebookIsError)
  const contacts = useSelector(selectPhonebookContacts)
  const filteredContacts = useSelector(selectFilteredContacts)
  console.log('filteredContacts: ', filteredContacts)

  const onDeleteContact = (contactId) => {
    dispatch(apiDeleteContacts(contactId))
  }
  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      <ul>
        {Array.isArray(contacts) && contacts.length === 0 && (
          <li>You don&apos;t have any registered contacts yet</li>
        )}
        {Array.isArray(contacts) &&
          filteredContacts.map((item) => (
            <Contact
              key={item.id}
              item={item}
              onDeleteContact={onDeleteContact}
            />
          ))}
      </ul>
    </div>
  )
}

export default ContactList
