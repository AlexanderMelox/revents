import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from '../../../app/common/form';
import { registerUser } from '../authActions';

const RegisterForm = ({ handleSubmit, registerUser }) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        {/* {error && <Label style={styles.errorStyles} basic color='red'>{error}</Label>} */}
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
        <Button fluid size="large" color="teal">
          Register
        </Button>
      </Form>
    </div>
  );
};

const actions = {
  registerUser
}

export default connect(null, actions)(
  reduxForm({ form: 'registerForm' })(RegisterForm)
);