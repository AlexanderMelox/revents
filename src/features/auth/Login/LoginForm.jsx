import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../auth/authActions';
import { TextInput } from '../../../app/common/form';

const LoginForm = ({ login, handleSubmit }) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="Password"
        />
        <Button onClick={login} fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
}

const actions = {
  login
}

export default connect(null, actions)(
  reduxForm({ form: 'loginForm' })(LoginForm)
);