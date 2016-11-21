require('font-awesome/css/font-awesome.css')

import React, { Component } from 'react'
import TodosList from './todos-list'
import TodosListHeader from './todos-list-header'

const App = ()=> {
  return(
    <TodosList todosUrl="/api/todos"/>
  )
}

export default App
