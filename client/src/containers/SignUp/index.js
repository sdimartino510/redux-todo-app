import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Button } from 'semantic-ui-react';
import { email, length, required } from 'redux-form-validators';
import axios from 'axios';

class SignUp extends Component {
  renderEmail = ({ input, meta }) => {
    return (
      <Form.Input
        { ...input }
        fluid
        error={ meta.touched && meta.error }
        icon='user'
        iconPosition='left'
        autoComplete='off'
        placeholder='Email address'
      />
    );
  }

  renderPassword = ({ input, meta }) => {
    return (
      <Form.Input
        { ...input }
        type='password'
        fluid
        error={ meta.touched && meta.error }
        icon='lock'
        iconPosition='left'
        autoComplete='off'
        placeholder='Password'
      />
    )
  }

  render() {
    return (
      <Form size='large'>
        <Segment stacked>
          <Field
            name='email'
            validate={
              [
                required({ msg: 'Email is required' }),
                email({ msg: 'You must provide a valid email address' })
              ]
            }
            component={ this.renderEmail }
          />
          <Field
            name='password'
            validate={
              [
                required({ msg: 'You must provide a password' }),
                length({ minimum: 6, msg: 'Your password must be at least 6 characters in length' })
              ]
            }
            component={ this.renderPassword }
          />
        </Segment>
      </Form>
    );
  }
}

const asyncValidate = async ({ email }) => {
  try {
    const { data } = await axios.get(`/api/user/emails?email=${email}`);
    if (data) {
      throw new Error();
    }
  } catch (e) {
    // eslint-disable-next-line
    throw { email: 'Email is already taken' };
  }
};

export default reduxForm({
  form: 'SignUp',
  asyncValidate,
  asyncChangeFields: ['email']
})(SignUp);