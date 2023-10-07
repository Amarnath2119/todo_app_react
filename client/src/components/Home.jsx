import React, { useEffect, useState } from 'react'
import Header from './partials/Header'
import Todo from './partials/Todo'
import AddTodoModal from './partials/AddTodoModal'
import { getTodoListApi, getToken } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigation = useNavigate();
  const [todolist, setTodoList] = useState([]);
  

  useEffect(() => {
    if(!getToken()){
       navigation('/login')
    }
   fetchTodoList()

  }, )

  async function fetchTodoList(){
    const result = await getTodoListApi()
    console.log('todolist',result)
    if(result.status===200 && result.data.status===200){
      setTodoList(result.data.data.todos.reverse())
    }
  }
  
  return (
    <div>
      <Header/>
     <div className="container">
      <div className="row justify-content-md-center mt-4">
        {
          todolist.map((todo)=> <Todo todo={todo} key={todo._id} />)
        }
      </div>
     </div>
     <div className='' style={{position:'fixed', right:50,bottom:50,zIndex:1030}} >
      <button type='button'
      data-bs-toggle='modal'
      data-bs-target='#exampleModel'
      className='btn btn-outline-light'>
        Add
      </button>
     </div>
    <AddTodoModal/>
    </div>
  )
}

export default Home