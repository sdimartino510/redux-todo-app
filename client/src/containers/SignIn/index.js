import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button } from 'semantic-ui-react';
import { email, required } from 'redux-form-validators';
import axios from 'axios';
import { invalid } from 'moment';

import { AUTH_USER, AUTH_USER_ERROR } from '../../actions/types';

// When the user submits the form, send the formValues to /api/auth/signin
// set the token coming from data into localStorage under the key 'token'
// Dispatch the action to the reducer to set the token as the state for authentication
// Redirect the user to the '/counter' route

class SignIn extends Component {
  onSubmit = async (formValues, dispatch) => {
    try {
      const { data } = await axios.post('/api/auth/signin', formValues);
      localStorage.setItem('token', data.token);
      dispatch({ type: AUTH_USER, payload: data.token });
      this.props.history.push('/counter');
    } catch (e) {
      dispatch( { type: AUTH_USER_ERROR, payload: e })
    }
  }

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
    );
  }

  render() {
    const { handleSubmit, invalid, submitting, submitFailed } = this.props;
    return (
      <Form size='large' onSubmit={ handleSubmit(this.onSubmit) }>
        <Segment stacked>
          <Field
            name='email'
            component={ this.renderEmail }
            validate={
              [
                required({ msg: 'Email is required' }),
                email({ msg: 'You must provide a valid email address' })
              ]
            }
          />
          <Field
            name='password'
            component={ this.renderPassword }
            validate={
              [
                required({ msg: 'You must provide a password' })
              ]
            }
          />
          <Button
            content='Sign In'
            color='teal'
            fluid
            size='large'
            type='submit'
            disabled={ invalid || submitting || submitFailed }
          />
        </Segment>
      </Form>
    )
  }
}

export default reduxForm({ form: 'SignIn' })(SignIn);