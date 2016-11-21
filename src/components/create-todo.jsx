import React, { Component, PropTypes  } from 'react'

class CreateTodo extends Component {
  constructor(props, context) {
    super(props, context);
    this._createTodo = this._createTodo.bind(this);

    this.state = {
        message: null,
        errors: null,
        defaultValues: {}
    };
  }

  _createTodo(e) {
    e.preventDefault();
    var todo = { todo: { title: this.refs.todoTitle.value } }
    this.props.onCreateTodo(todo)
    this.refs.todoTitle.value = ''
  }

  render(){
    return(
      <form>
        <input ref="todoTitle" />
        <button onClick={this._createTodo}> create todo </button>
      </form>
    )
  }
}

CreateTodo.propTypes = {
  onCreateTodo: PropTypes.func.isRequired
}


export default CreateTodo
