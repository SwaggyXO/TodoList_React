import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TodoItems from './TodoItems';

function TodoList() {
    const link = 'http://localhost:5000/todo';
    const [todos, setTodos] = useState([]);
    const [todoName, setTodoName] = useState('')
    const [todoDescp, setTodoDescp] = useState('')
    const [todoComments, setTodoComments] = useState('')
    const [editTodoData, setEditTodoData] = useState(null)
    

    
    useEffect(() =>{
        getTodos();
    }, [])
    

    useEffect(() =>{
        if(editTodoData){
            setTodoName(editTodoData.name ? editTodoData.name : '')
            setTodoDescp(editTodoData.descp ? editTodoData.descp: '')
            setTodoComments(editTodoData.comments ? editTodoData.comments : '')
        }

    },[editTodoData])

    async function getTodos(){
        const data = await axios.get(link);
        setTodos(data.data.allTodos)
    }

    const editTodos  = (todosData) =>{
        setEditTodoData(todosData);
    }

    async function addTodos(e) {
        e.preventDefault();

        const todoData = {
            name: todoName ? todoName : undefined,
            descp: todoDescp ? todoDescp : undefined,
            comments: todoComments ? todoComments: undefined
        }

        if(!editTodoData){
            await axios.post(link, todoData)
        }
        else{
            await axios.patch(`http://localhost:5000/todo/${editTodoData._id}`, todoData)
        }

        setTodoName('')
        setTodoDescp('')
        setTodoComments('')

        getTodos();
        setEditTodoData('');
    }

    const renderTodos = () =>{
        
        let sortedTodos = [...todos];

        sortedTodos = sortedTodos.sort((a, b) =>{
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return sortedTodos.map((todo, i) =>{
            return <TodoItems key={i} todo={todo} getTodos={getTodos} editTodos={editTodos} />
        })
    }
    

    const insertTodos = () =>{
        return <div className="main-1">
        <div className="h1"><h1>To do List</h1></div>
        <div className="input">
            <form onSubmit={addTodos} className="row g-3">
                <div className="col-12">
                    <label htmlFor="todo-name" className="form-label">Todo</label>
                    <input type="text" className="form-control" placeholder="Input todo here" 
                    value={todoName} onChange={(e) => setTodoName(e.target.value)} required/>
                </div>
                <div className="col-12">
                    <label htmlFor="todo-descp" className="form-label">Todo Descripion</label>
                    <textarea className="form-control" placeholder="Input todo description here" cols="5" rows="2" 
                    value={todoDescp} onChange={(e) => setTodoDescp(e.target.value)} >
                    </textarea>
                </div>
                <div className="col-12">
                    <label htmlFor="todo-comments" className="form-label">Todo Comments</label>
                    <textarea className="form-control" placeholder="Input comments here" cols="5" rows="2"
                    value={todoComments} onChange={(e) => setTodoComments(e.target.value)} > 
                    </textarea>
                </div>

                <div>
                    <button className="btn btn-primary" type="button" id="button-addon2" onClick={addTodos}>Add to list</button>
                </div>
            </form>
        </div>
        {/* <div className="ui cards main-2">
            <div className="card">
                <div className="content">
                    <div className="meta">
                        Card-1
                    </div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <div className="ui basic green button">Update</div>
                            <div className="ui basic red button" onClick={() => this.onDelete()}>Delete</div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
    </div>
    }
    return (
        <div>
            {insertTodos()}
            {renderTodos()}
        </div>
    )
}

export default TodoList;