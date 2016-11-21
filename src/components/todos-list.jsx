import React, { PropTypes } from 'react'
import CreateTodo from './create-todo'
import TodosListHeader from './todos-list-header'
import TodosListItem from './todos-list-item'
import { connect, PromiseState } from 'react-refetch'

const TodosList = ({ todosFetch, deleteTodo, createTodo, updateTodo })=> {
  if (todosFetch.pending) {
    return(
      <span>
        <i className="fa fa-spinner fa-spin fa-fw"></i>
        <span>Loading...</span>
      </span>
    );

  } else if (todosFetch.rejected) {
    return(
      <span> Errors ! </span>
    );

  } else if (todosFetch.fulfilled) {
    const todos = todosFetch.value.todos;
    return(
      <div>
        <h1> Todos </h1>
        <CreateTodo onCreateTodo={ createTodo } />
        <table>
          <TodosListHeader />
          <tbody>
            {todos.map(todo => {
                return <TodosListItem key={todo.id} todo={ todo } onDeleteTodo={deleteTodo} onUpdateToto={updateTodo} />;
            })}
          </tbody>
        </table>
      </div>
    );

  }
}

TodosList.propTypes = {
    todosUrl: PropTypes.string.isRequired,
    todosFetch: PropTypes.instanceOf(PromiseState).isRequired,
    deleteTodo: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
};

export default connect(
  props => ({
    todosFetch: {
      url: `${props.todosUrl}`,
      refreshInterval: 60000
    },
    createTodo: (todo) => {
      return {
        todoCreated: {
          url: `/api/todos`,
          method: 'POST',
          body: JSON.stringify(todo),
          andThen: () => ({
            todosFetch: {
              url: `${props.todosUrl}`,
              force: true,
              refreshing: true
            }
          })
        }
      }
    },

    deleteTodo: (todo) => {
      return {
        todoDeleted: {
          url: `/api/todos/${todo.id}`,
          method: 'DELETE',
          andThen: () => {
            return {
              todosFetch: {
                url: `${props.todosUrl}`,
                force: true,
                refreshing: true
              }
            };
          }
        }
      }
    },

    updateTodo: (todo) => {
      return {
        todoUpdated: {
          url: `/api/todos/${todo.id}`,
          method: 'PUT',
          body: JSON.stringify(todo),
          andThen: () => {
            return {
              todosFetch: {
                url: `${props.todosUrl}`,
                force: true,
                refreshing: true
              }
            };
          }
        }
      }
    },
  })
)(TodosList)
