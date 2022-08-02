import React from 'react'
import axios from 'axios';
import styled from 'styled-components'
import edit from '../img/edit.svg';
import delIcon from '../img/delete.svg';
import doc from '../img/doc.svg';

function TodoItems({todo, getTodos, editTodos}) {
    const deleteTodo = async () =>{
        await axios.delete(`http://localhost:5000/todo/${todo._id}`)

        getTodos();
    }
    return (
        <TodoItemSTyled>
            <div className="icon-document">
                <img src={doc} alt="" />
            </div>
            <div className="text-con">
                <div className="left-text">
                    <h3>Task Name</h3>
                    <p>{todo.name}</p>
                </div>
                <div className="middle-text">
                    <h3>Task Description</h3>
                    <p>{todo.descp}</p>
                </div>
                <div className="right-text">
                    <h3>Comments</h3>
                    <p>{todo.comments}</p>
                </div>
            </div>
            <div className="edit" onClick={() => editTodos(todo)}>
                <img src={edit} alt="" />
            </div>
            <div className="delete" onClick={deleteTodo}>
                <img src={delIcon} alt="" />
            </div>
        </TodoItemSTyled>
    )
}

const TodoItemSTyled = styled.div`
    background-color: #4F6877;
    padding: 15px 15px;
    margin: 0 auto;
    border-radius: 15px;
    max-width: 1400px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    color: white;
    &:last-child{
        margin-bottom: 4rem;
    }
    h3{
        color: #6BBE92;
    }
    .icon-document, .edit, .delete{
        background-color: white;
        width: 50px;
        height: 50px;
        padding: 5px 5px;
        margin: auto 0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        img{
            cursor: pointer;
        }
    }
    .text-con{
        flex: 2;
        display: flex;
        padding: 15px 15px;
        .left-text{
            margin-right: auto;
        }

        .middle-text{
            margin-right: auto;
        }
        
    }
    .edit{
        margin-right: 1rem;
    }
`;

export default TodoItems;