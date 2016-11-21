import React, { PropTypes, Component } from 'react'

class TodosListItem extends Component{

  constructor(props, context) {
    super(props, context);
    this._deleteTodo = this._deleteTodo.bind(this)
    this._editTodo = this._editTodo.bind(this)
    this._updateTodo = this._updateTodo.bind(this)

    this.state = {
        message: null,
        isEditing: false,
        defaultValues: {}
    }
  }

  _deleteTodo(e){
    return(
      this.props.onDeleteTodo(this.props.todo)
    )
  }

  _editTodo(e){
    this.setState({ isEditing: true })
  }

  _updateTodo(e){
    e.preventDefault();
    var todo = { todo: { title: this.refs.todoTitle.value }, id: this.props.todo.id }
    this.setState({ isEditing: false })
    return(
      this.props.onUpdateToto(todo)
    )
  }

  render(){

    var todo = this.props.todo

    if(this.state.isEditing){
      return(
        <tr>
          <td>
            <input ref="todoTitle" defaultValue={todo.title}/>
          </td>
          <td>
            <div className="btn-group btn-group-sm">
              <button className="btn btn-default" onClick={this._updateTodo}>Update</button>
              <button className="btn btn-default" onClick={()=>{this.setState({ isEditing: false })}}>Cancel</button>
            </div>
          </td>
        </tr>
      )
    }else{
      return(
        <tr>
          <td>{todo.title}</td>
          <td>
            <div className="btn-group btn-group-sm">
              <button className="btn btn-default" onClick={this._editTodo}>Edit</button>
              <button className="btn btn-default" onClick={this._deleteTodo}>Delete</button>
            </div>
          </td>
        </tr>
      )
    }
  }
}

TodosListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onUpdateToto: PropTypes.func.isRequired,
}

export default TodosListItem
