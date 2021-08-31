import {useEffect, useState} from "react";
import EditModal from "./EditModal";

const Todos = ()=>{
    const [todos,setTodos] = useState([]);
    const [todoText,setTodoText] = useState('');
    const [isModalVisible,setIsModalVisible] = useState(false);

    useEffect(()=>{
        const savedTodos = localStorage.getItem("todos");
        if(savedTodos)
            setTodos(JSON.parse(savedTodos));
    },[])

    useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todoText)=>{
        if(todoText)
            setTodos(prevTodos=>[...prevTodos,todoText]);
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
    const editTodo = (id,newTodo)=>{
        console.log(newTodo);
        const updatedTodos = todos;
        updatedTodos[id] = newTodo;
        setTodos(updatedTodos);
    }
    return(
        <div className="w-50 mx-auto my-5 flex-grow-1">
            <div className="input-group mb-5">
                <input type="text" className="form-control input-group-text" placeholder="Write your todos here"
                       onChange={(e)=>setTodoText(e.target.value)}
                       onKeyDown={(e)=>handleKeyDown(e)}
                />
                    <span className="input-group-text btn btn-info" id="basic-addon2" onClick={()=>addTodo(todoText)}>Add Todos</span>
            </div>

            <ul className='list-group'>
                {
                    todos.map((todo,index)=>
                        <li key={index} className="d-flex justify-content-between align-items-center  list-group-item list-group-item-info my-2 ">
                            <div>{todo}</div>
                            <div>
                                {
                                    isModalVisible? <EditModal todoId={index} setModalVisible={setIsModalVisible} todoText={todo} editTodo = {editTodo}/>:null
                                }
                                <button className="btn btn-outline-secondary mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> setIsModalVisible(true)}>Edit</button>
                                <button className="btn btn-outline-danger" onClick={()=>deleteTodo(index)}>Delete</button>
                            </div>

                        </li>


                    )
                }
            </ul>

        </div>
    )
}
export default Todos;
