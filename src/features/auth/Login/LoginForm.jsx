import React from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../auth/authActions';
import { TextInput } from '../../../app/common/form';

const styles = {
  errorStyles: { 
    display: 'block',
    marginBottom: '1.25rem'
  }
}

const LoginForm = ({ login, handleSubmit, error }) => {
  return (
    <Form size="large" id="loginForm" onSubmit={handleSubmit(login)}>
      {error && <Label style={styles.errorStyles} basic color='red'>{error}</Label>}
      <Field
        name="email"
        component={TextInput}
        label='Email'
        type="text"
        placeholder="Email Address"
      />
      <Field
        name="password"
        component={TextInput}
        label='Password'
        type="password"
        placeholder="Password"
      />
      <Button fluid size="large" color="teal">
        Login
      </Button>
    </Form>
  );
}

const actions = {
  login
}

export default connect(null, actions)(
  reduxForm({ form: 'loginForm' })(LoginForm)
);