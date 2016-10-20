import React, { Component } from 'react'
import CreateTodo from './create-todo'
import TodosList from './todos-list'
import { connect, PromiseState } from 'react-refetch';

class App extends Component {

  render(){
    const { todosFetch } = this.props;

    if (todosFetch.pending) {
      return <div>pending ...</div>;
    } else if (todosFetch.rejected) {
      return <div>error</div>;
    } else if (todosFetch.fulfilled) {
      const todos = todosFetch.value;
      return(
        <div>
          <h1> React todos app </h1>
          <CreateTodo
            todos={todos}
            createTask={this.createTask.bind(this)}
          />
          <TodosList
            todos={todos}
            toggleTask={this.toggleTask.bind(this)}
            saveTask={this.saveTask.bind(this)}
            deleteTask={this.deleteTask.bind(this)}
          />
        </div>
      );
    }
  }

  toggleTask(task){
    const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({ todos: this.state.todos });
  }

  createTask(task){
    this.state.todos.push({
      task,
      isCompleted: false
    });
    this.setState({todos: this.state.todos });
  }

  saveTask(oldTask, newTask){
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    this.setState({ todos: this.state.todos });
  }

  deleteTask(taskToDelete){
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({ todos: this.state.todos });
  }
}

export default connect((props) => ({
  todosFetch: {
    url: `/api/todos`,
    refreshInterval: 60000
  }
}))(App);
