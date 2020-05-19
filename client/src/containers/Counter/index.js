import React, { Component } from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../actions/counterActions';

import requireAuth from './../../hoc/requireAuth';

class Counter extends Component {
  render() {
    return (
      <Grid centered>
        <Grid.Column textAlign='center'>
          <Header
            as='h1'
            textAlign='center'
            content='Welcome to the Counter App'
          />
          <Header as='h2' textAlign='center'>Counter: <span>{ this.props.counter }</span></Header>
          <Button.Group>
            <Button
              icon='minus circle'
              content='Decrement'
              negative
              labelPosition='left'
              onClick={ this.props.decrement }
            />
            <Button.Or/>
            <Button
              icon='plus circle'
              content='Increment'
              positive
              labelPosition='right'
              onClick={ this.props.increment }
            />
          </Button.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

export default requireAuth(connect(mapStateToProps, { increment, decrement })(Counter));