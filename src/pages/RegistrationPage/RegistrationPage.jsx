import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import css from './RegistrationPage.module.css'
import { max_name_length, min_name_length } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/auth/slice'

const RegistrationUserSchema = Yup.object({
  name: Yup.string()
    .required('Name is required!')
    .matches(
      /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/,
      'Name can only contain letters and spaces'
    )
    .min(min_name_length, 'Name must be at least 3 characters')
    .max(max_name_length, 'Name cannot be longer than 50 characters'),
  email: Yup.string()
    .required('Email is required!')
    .email('Invalid email format')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'),
  password: Yup.string().required('Password is required!'),
})

const form_Initial_Values = {
  name: '',
  email: '',
  password: '',
}

const RegistrationPage = () => {
  const dispatch = useDispatch()

  const handleSubmitEvent = (values, actions) => {
    console.log(values)
    dispatch(register(values))
    actions.resetForm()
  }
  return (
    <div>
      <Formik
        initialValues={form_Initial_Values}
        validationSchema={RegistrationUserSchema}
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
            <span>Email</span>
            <br />
            <Field className={css.contactFormInput} type="email" name="email" />
            <ErrorMessage component="p" name="email" />
          </label>
          <label>
            <span>Password</span>
            <br />
            <Field
              className={css.contactFormInput}
              type="password"
              name="password"
            />
            <ErrorMessage component="p" name="password" />
          </label>
          <br />
          <button className={css.contactFormBtn} type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default RegistrationPage
