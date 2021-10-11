import { UiButton, UiInput } from 'ui-library-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { InputChangedEvent } from './interfaces/';

import './root.component.css';

const EmailSchema = Yup.string().required('required').email('email');
const PasswordSchema = Yup.string().required('required');

export default function Root() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      if (formik.status !== 'touched') return;

      await EmailSchema.validate(email).catch(
        ({ errors }) => (formik.errors.email = errors)
      );
      await PasswordSchema.validate(password).catch(
        ({ errors }) => (formik.errors.password = errors)
      );

      if (!formik.errors.email && !formik.errors.password) {
        alert(JSON.stringify({ email, password }, null, 2));
      }
    },
  });

  const inputChanged = (event: InputChangedEvent | unknown) => {
    const { target } = event as InputChangedEvent;
    formik.setStatus('touched');
    formik.values[target.type] = target.value;
  };

  return (
    <section>
      <h1 className="sign-in-title">Sign in</h1>
      <form onSubmit={formik.handleSubmit} className="sign-in-form">
        <UiInput
          type="email"
          label="Email"
          placeholder="Please enter your email"
          error={formik.errors.email}
          onInputEvent={inputChanged}
        ></UiInput>
        <UiInput
          type="password"
          label="Password"
          placeholder="Please enter your password"
          error={formik.errors.password}
          onInputEvent={inputChanged}
        ></UiInput>
        <UiButton type="submit">Sign in</UiButton>
      </form>
    </section>
  );
}
