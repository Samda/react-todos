import React, { Component } from 'react';

export default class TodosListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false

    };
  }

  renderTaskSection() {

    const { id, title, done } = this.props;

    const taskStyle = {
      color: done ? 'green' : 'red',
      cursor: 'pointer'
    }

    if(this.state.isEditing){
      return(
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={title} ref='editInput' />
          </form>
        </td>
      );
    }

    return(
      <td key={id} style={taskStyle} onClick={this.props.toggleTask.bind(this, title)}>
        {title}
      </td>
    );
  }

  renderActionsSection() {
    if(this.state.isEditing){
      return(
        <td>
          <button onClick={this.onSaveClick.bind(this)}> Save </button>
          <button onClick={this.onCancelClick.bind(this)}> Cancel </button>
        </td>
      );
    }

    return(
      <td>
        <button onClick={this.onEditClick.bind(this)}> Edit </button>
        <button onClick={this.props.deleteTask.bind(this, this.props.title)}> Delete </button>
      </td>
    );
  }

  render(){
    return(
      <tr>
        {this.renderTaskSection()}
        {this.renderActionsSection()}
      </tr>
    );
  }

  onCancelClick() {
    this.setState({ isEditing: false });
  }

  onEditClick() {
    this.setState({ isEditing: true });
  }

  onSaveClick(event){
    event.preventDefault();
    const oldTask = this.props.title;
    const newTask = this.refs.editInput.value;
    this.props.saveTask(oldTask, newTask);
    this.setState({ isEditing: false })
  }
}
