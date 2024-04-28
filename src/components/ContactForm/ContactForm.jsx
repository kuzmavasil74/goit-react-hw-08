import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { useDispatch } from 'react-redux'
import { apiAddContacts } from '../../redux/contacts/operations'
import css from './ContactForm.module.css'
const AddContactsSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),

  number: Yup.string()
    .required('User number is required!')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'You must enter valid phone number!'
    ),
})

const FORM_INITIAL_VALUES = {
  name: '',
  number: '',
}

const ContactForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (values, actions) => {
    dispatch(apiAddContacts(values))
    console.log('values: ', values)
    actions.resetForm()
  }
  return (
    <div>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={AddContactsSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.contactForm}>
          {/* <h2>Add new user contact</h2> */}
          <label>
            <span>Contact name:</span>
            <br />
            <Field
              className={css.contactFormInput}
              type="text"
              name="name"
              placeholder="John Doe"
            />
            <ErrorMessage component="p" name="name" />
          </label>{' '}
          <br />
          <label>
            <span>Contact number:</span>
            <br />
            <Field
              className={css.contactFormInput}
              type="number"
              name="number"
              placeholder="+380123456789"
            />
            <ErrorMessage component="p" name="number" />
          </label>{' '}
          <br />
          <button className={css.contactFormBtn} type="submit">
            ▶ Add new contact
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default ContactForm
