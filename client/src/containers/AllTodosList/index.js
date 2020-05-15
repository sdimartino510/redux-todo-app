import React, { Component } from 'react';
import { List, Header } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllTodos } from '../../actions/allTodoActions';

class AllTodosList extends Component {
  componentDidMount() {
    this.props.getAllTodos();
  }

  render() {
    return (
      <List>
        <List.Item>
          <List.Content>
            <List.Header>
              Some Todo
            </List.Header>
            <List.Description>
              Created: { moment().fromNow() }
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}

function mapStateToProps({ todos: { todos, getAllTodosError } }) {
  return {
    todos,
    getAllTodosError
  }
}

export default connect(mapStateToProps, { getAllTodos })(AllTodosList);