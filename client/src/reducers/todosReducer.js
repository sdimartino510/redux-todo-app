import {
  GET_ALL_TODOS,
  GET_ALL_TODOS_ERROR,
  GET_USER_TODOS,
  GET_USER_TODOS_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  todos: [],
  userTodos: [],
  getAllTodosError: '',
  getUserTodosServerError: '',
  getUserTodosClientError: ''
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
    default:
      return state;
  }
}