import { ErrorMessage, Field, Form, Formik } from 'formik'
import css from './ContactForm.module.css'
import * as Yup from 'yup'
import {
  max_name_length,
  max_number_length,
  min_name_length,
  min_number_length,
} from '../../utils/constants'
import { addContact } from '../../redux/contacts/operations'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'

const contactFormSchema = Yup.object({
  name: Yup.string()
    .required('Name is required!')
    .matches(
      /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/,
      'Name can only contain letters and spaces'
    )
    .min(min_name_length, 'Name must be at least 3 characters')
    .max(max_name_length, 'Name cannot be longer than 50 characters'),
  number: Yup.string()
    .min(min_number_length, 'Number must be at least 3 characters')
    .matches(/^[-+\d() ]+$/, 'Invalid phone number format')
    .max(
      max_number_length,
      'Contact telephone number cannot be longer than 50 characters'
    ),
})

const form_Initial_Values = {
  name: '',
  number: '',
}
const ContactForm = () => {
  const dispatch = useDispatch()
  const onAddContact = (formData) => {
    const finalContact = {
      ...formData,
      id: nanoid(),
    }
    const action = addContact(finalContact)
    dispatch(action)
  }
  const handleSubmitEvent = (values, actions) => {
    onAddContact(values)
    actions.resetForm()
  }
  return (
    <div>
      <Formik
        initialValues={form_Initial_Values}
        validationSchema={contactFormSchema}
        onSubmit={handleSubmitEvent}
      >
        <Form className={css.contactForm}>
          <label>
            <span>Name</span>
            <br />
            <Field className={css.contactFormInput} type="text" name="name" />
            <ErrorMessage component="p" name="name" />
          </label>
          <br />
          <label>
            <span>Number</span>
            <br />
            <Field className={css.contactFormInput} type="tel" name="number" />
            <ErrorMessage component="p" name="number" />
          </label>

          <button className={css.contactFormBtn} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default ContactForm
