import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from '../../../app/common/form';

const RegisterForm = () => {
  return (
    <div>
      <Form size="large">
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

export default reduxForm({ form: 'registerForm' })(RegisterForm);