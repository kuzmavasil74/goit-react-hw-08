import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import css from './LoginPage.module.css'

const RegistrationUserSchema = Yup.object({
  email: Yup.string()
    .required('Email is required!')
    .email('Invalid email format')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'),
  password: Yup.string().required('Password is required!'),
})

const form_Initial_Values = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const handleSubmitEvent = (values, actions) => {
    console.log(values)
    // onAddContact(values)
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
            Login
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginPage
