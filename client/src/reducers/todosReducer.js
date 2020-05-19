import {
  GET_ALL_TODOS,
  GET_ALL_TODOS_ERROR,
  GET_USER_TODOS,
  GET_USER_TODOS_ERROR,
  ADD_USER_TODO,
  ADD_USER_TODO_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  todos: [],
  userTodos: [],
  getAllTodosError: '',
  getUserTodosServerError: '',
  getUserTodosClientError: '',
  addTodoError: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_TODOS:
      return { ...state, todos: action.payload, getAllTodosError: '' };
    case GET_ALL_TODOS_ERROR:
      return { ...state, getAllTodosError: action.payload }
    case GET_USER_TODOS:
      return { ...state, userTodos: action.payload, getUserTodosClientError: '', getUserTodosServerError: '' }
    case GET_USER_TODOS_ERROR:
      return { ...state, getUserTodosClientError: action.clientError, getUserTodosServerError: action.serverError }
    case ADD_USER_TODO:
      return { ...state, addTodoError: '' }
    case ADD_USER_TODO_ERROR:
      return { ...state, addTodoError: action.payload }
    default:
      return state;
  }
}