
import './App.css';
// import {PlusIcon} from "heroicons/react/24/outline"
import Todo from './Todo';
import {AiOutlinePlus} from "react-icons/ai"
import { useEffect, useState } from 'react';
import { QuerySnapshot, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import db from './firebase';


function App() {
  const [todos, setTodos] = useState([]);
  const [text,setText]=useState('')
  console.log(text)


  useEffect(() => {
    const q=query(collection(db, 'todos'));
    const unsub=onSnapshot(q, (querysnapshot)=>{
      let arr=[];
      querysnapshot.forEach((doc)=>{
        arr.push({...doc.data(), id:doc.id});
      })
      setTodos(arr);
    })

    return ()=>unsub()
  
    
  }, [])

  const toggle=async(todo)=>{

    await updateDoc(doc(db,'todos',todo.id),{
      done :  !todo.done
    })


  }

  const toggledel=async(todo)=>{
    await deleteDoc(doc(db,'todos',todo.id));
  }

  const create= async(e)=>{
    e.preventDefault(e);
    if(text===''){
      alert("please enter valid text")
      return
    }
    await addDoc(collection(db,'todos'),{
      todo:text,
      done:false
    })
    setText('')
  }


  
  return (
<div className='  h-screen w-screen bg-gradient-to-r from-purple-600 to-blue-600 '>
    <div className='bg-gradient-to-r from-purple-300 to-blue-300 max-w-[500px] w-full m-auto rounded-xl shadow-xl p-4 '>
            <h3 className='font-bold  text-gray-800 text-4xl  text-center p-2 space-y-5'>
                    Todo App with FireBase             
            </h3>
            <form onSubmit={(e)=>create(e)} className='flex justify-between'>
              <input value={text} onChange={(e)=>setText(e.target.value)} className='border p-2 w-full rounded-2xl ' placeholder='Enter Todo Here'></input>
              <button className=' border rounded-xl  mx-2 bg-blue-200 px-4 py-2'> <AiOutlinePlus size={30}/></button>
            
            </form>
            <ul>
              {todos.map((todo, id)=>(
                         <Todo key={id} todo={todo} toggle={toggle} toggledel={toggledel} />
              ))}
           
            </ul>

            <p className='p-2 text-center'> You have {todos.length} todos </p>
    </div>
   </div>
  );
}

export default App;
