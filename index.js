
import cors from 'cors'
import express, { json } from 'express';

import {logSomething} from './utils.js';
import connnectToDb from './db-utils/mongoose-connection.js';
import todoRouter from './router/todos.js';
import userRouter from './router/users.js';
let todos=[
    {id:1,title:'Dance',isCompleted:false,dueDate:'2023-02-30'},
    {id:2,title:'Run',isCompleted:false,dueDate:'2023-02-31'},
    {id:3,title:'Sleep',isCompleted:false,dueDate:'2023-02-27'},

]
const PORT=process.env.PORT||5050;
const app=express();
//toplevel/global await
await connnectToDb();
//json middleware
app.use(express.static("public"));
app.use(cors())

app.use(express.json());



//***************************Router   */
//individual routes are for each entities or objects in an application


//todo router
app.use('/api/todos',todoRouter);
//user router
app.use('/api/users',userRouter);
app.get("/api", (req, res,)=>{
    res.send({'name': 'Gangadharan', Age:22});
})

//************************************************************************* */
//path params
app.get("/api/:name", (req, res,)=>{
    //getting the params
    const pathParams=req.params;
    console.log("params:", pathParams.name);
    res.send({ pathParams,query:req.query});
})

app.listen(PORT, () => {console.log(`Application is listening on ${PORT}`);
logSomething();
})