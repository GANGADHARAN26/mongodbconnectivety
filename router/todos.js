import express from "express";
let todos=[
    {id:1,title:'Dance',isCompleted:false,dueDate:'2023-02-30'},
    {id:2,title:'Run',isCompleted:false,dueDate:'2023-02-31'},
    {id:3,title:'Sleep',isCompleted:false,dueDate:'2023-02-27'},

]
const todoRouter=express.Router();
//***************todos endpoint crud***************************** 
//get method
todoRouter.get("/", (req, res)=>{
    
    res.send(todos)
})
//post method********************************************************
todoRouter.post("/", (req, res)=>{
    todos.push(req.body);
    res.send(todos)
})
//put method********************************************************
todoRouter.put("/:todoId", (req, res)=>{
    const {todoId} =req.params;
    const newTodo=req.body;
    const oldTodo = todos.find(todo => todo.id === Number(todoId));
    todos=todos.filter(todo=>todo.id!==oldTodo.id);
    todos.push(newTodo);
    res.send(todos);
})
//delete method********************************************************
todoRouter.delete("/:todoId", (req, res)=>{
    const {todoId} =req.params;
    todos=todos.filter(todos=>todos.id!==todoId);
    res.send(todos);
    console.log("this has been deleted")
})
export default todoRouter;