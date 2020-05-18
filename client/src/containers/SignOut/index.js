import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Message, Button } from 'semantic-ui-react';

import { signOut } from '../../actions/authActions';

class SignOut extends Component {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return (
      <Container>
        <Message error header='You are logged out' />
        <Button color='teal' as={ Link } to='/signin' content='Sign in again' />
      </Container>
    );
  }
}

export default connect(null, { signOut })(SignOut);