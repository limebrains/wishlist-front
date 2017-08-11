import * as React from 'react';
import { Field, reduxForm } from 'redux-form'
import {login} from "../../actions/loginRegister";

let LoginForm = (props: any) => {
  const { handleSubmit } = props;
  return (
      <form onSubmit={handleSubmit}>
        <Field name="username" component="input"
               type="text" placeholder="Username"/>
        <Field name="password" component="input"
               type="password" placeholder="Password"/>
        <button type="submit">Log in</button>
      </form>

  );


};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;