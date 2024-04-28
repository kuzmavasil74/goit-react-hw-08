import css from './Contact.module.css'
const Contact = ({ item, onDeleteContact }) => {
  return (
    <div>
      <li className={css.contactCart} key={item.id}>
        <h3>👨‍🦱 {item.name}</h3>
        <p>Number: {item.number}</p>
        <button
          className={css.contactListBtn}
          type="button"
          onClick={() => onDeleteContact(item.id)}
        >
          ❌
        </button>
        <br />
      </li>
    </div>
  )
}

export default Contact
