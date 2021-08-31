import {useEffect, useState} from "react";

const Todos = ()=>{
    const [todos,setTodos] = useState([]);
    const [todoText,setTodoText] = useState('');

    useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todoText)=>{
        if(todoText)
            setTodos(prevTodos=>[...prevTodos,todoText]);
    }
    const editTodo = (index)=>{

    }
    const deleteTodo = (index)=>{
        const newTodos = todos.filter((t,i)=> i!=index);
        setTodos(newTodos);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addTodo(todoText);
        }
    }
    return(
        <div>
            <div className="input-group my-5 w-50 mx-auto">
                <input type="text" className="form-control input-group-text" placeholder="Write your todos here"
                       onChange={(e)=>setTodoText(e.target.value)}
                       onKeyDown={(e)=>handleKeyDown(e)}
                />
                    <span className="input-group-text btn btn-info" id="basic-addon2" onClick={()=>addTodo(todoText)}>Add Todos</span>
            </div>

            <ul>
                {
                    todos.map((todo,index)=>
                        <li key={index}>
                             <div>{todo}</div>
                            <button onClick={()=> editTodo(index)}>Edit</button>
                            <button onClick={()=>deleteTodo(index)}>Delete</button>
                        </li>
                    )
                }
            </ul>

        </div>
    )
}
export default Todos;
