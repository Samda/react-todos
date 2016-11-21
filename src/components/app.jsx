import 'jquery/dist/jquery.js'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import React, { Component } from 'react'
import TodosList from './todos-list'
import TodosListHeader from './todos-list-header'

const App = ()=> {
  return(
    <TodosList todosUrl="/api/todos"/>
  )
}

export default App
