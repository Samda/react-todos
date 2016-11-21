import React, { PropTypes } from 'react'

const TodosListItem = ({todo, onDeleteTodo})=> {

  const _deleteTodo = (e)=> {
    return(
      onDeleteTodo(todo)
    )
  }

  return(
    <tr>
      <td>{todo.title}</td>
      <td>
        <button>Edit</button>
        <button onClick={_deleteTodo}>Delete</button>
      </td>
    </tr>
  )
}

TodosListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
}

export default TodosListItem
