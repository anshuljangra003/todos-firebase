import React from 'react'
import {FaRegTrashAlt} from "react-icons/fa"

const Todo = ({todo, toggle, toggledel}) => {
  return (
    <li className='flex  justify-between p-4 my-2 capitalize'>

    <div className='flex '>
        <input onChange={()=> toggle(todo)} type='checkbox'  checked={todo.done ? 'checked':''} ></input>
                    <p onClick={()=>toggle(todo)} className={!todo.done ? `ml-2 cursor-pointer`:` ml-2 cursor-pointer line-through`}>   {todo.todo} </p>  
        </div>
                    <button onClick={()=>toggledel(todo)} className='flex items-center font-light hover:text-red-600'>    <FaRegTrashAlt size={20}/></button> 
    </li>
  )
}

export default Todo