import React from 'react';
import { Form, Button, Label, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';
import { TextInput } from '../../../app/common/form';
import { registerUser, socialLogin } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const validate = combineValidators({
  displayName: isRequired('Display name'),
  email: isRequired('Email'),
  password: isRequired('Password')
});

const styles = {
  errorStyles: { 
    display: 'block',
    marginBottom: '1.25rem'
  }
}

const RegisterForm = ({ handleSubmit, registerUser, error, invalid, submitting, socialLogin }) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        {error && <Label style={styles.errorStyles} basic color='red'>{error}</Label>}
        <Field
          name="displayName"
          type="text"
          label='Display Name'
          component={TextInput}
          placeholder="Known As"
        />
        <Field
          name="email"
          type="text"
          label='Email'
          component={TextInput}
          placeholder="Email"
        />
        <Field
          name="password"
          type="password"
          label="Password"
          component={TextInput}
          placeholder="Password"
        />
        <Button disabled={invalid || submitting} fluid size="large" color="teal">
          Register
        </Button>
        <Divider horizontal>
          Or
        </Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Form>
    </div>
  );
};

const actions = {
  registerUser,
  socialLogin
}

export default connect(null, actions)(
  reduxForm({ form: 'registerForm', validate })(RegisterForm)
);