import moment from 'moment/moment'
import React from 'react'

function Todo({todo}) {
  return (
    <div className=' card border-primary mb-3 col-sm-3 mx-3 my-2 alert bg-light' style={{"maxWidth":"20rem"}}>
        <div className="card-header">
        {todo.isCompleted ? 'Completed':'Not Completed'}
        </div>
           
        <div className="card-body">
        <h4 className='card-title'>{todo.desc}</h4>
           
        </div>
        <div className="card-header">
       
        </div>
        <p className='card-text'>{moment(todo.date).fromNow()}</p>
    </div>
  )
}

export default Todo