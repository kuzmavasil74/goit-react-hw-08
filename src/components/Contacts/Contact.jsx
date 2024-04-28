import { useDispatch } from 'react-redux'
import { deleteContact } from '../../redux/contacts/operations'
import css from './Contact.module.css'
const Contact = ({ contact }) => {
  const dispatch = useDispatch()
  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id))
  }
  if (!contact || !contact.favColor) {
    return <div>Loading contact details...</div>
  }
  return (
    <li className={css.contactCart}>
      <ul className={css.contactList}>
        <li className={css.contactListItem}>👨‍🦱 {contact.name}</li>

        <li className={css.contactListItem}>☎️ {contact.number}</li>
      </ul>
      <button
        type="button"
        onClick={() => {
          return handleDeleteContact(contact.id)
        }}
        className={css.contactListBtn}
        aria-label={`Delete ${contact.name}`}
      >
        {' '}
        ❌ Delete
      </button>
    </li>
  )
}
export default Contact
