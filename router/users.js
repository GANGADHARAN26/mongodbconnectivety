import express from "express";
import {v4} from "uuid";
import { user as userModel} from "../db-utils/models.js";
// let users=[
//     {id:1,name:"gangadharan",dob:'2023-02-30'},
//     {id:2,name:"dharan",dob:'2023-02-01'},
//     {id:3,name:"ram",dob:'2023-02-11'},

// ]
const userRouter=express.Router();
//***************users endpoint crud***************************** 
//get method
userRouter.get("/", async(req, res)=>{
   try{
    const users=await userModel.find({},{id:1,name:1,dob:1,_id:0});
  
    res.send(users)
   }catch(err){
    console.log(err.message);
    res.status(500).send({message:"error occured while  fetching the users"});
   }
    // res.send(users)
})
//post method********************************************************
userRouter.post("/", async(req, res)=>{
   try{
    const user=new userModel({...req.body,id:v4()});
    await user.save().then(()=>{console.log('User saved')});
    res.send({message:'user updates successfully'})
   }
   catch(error)
   {
       console.log(error.message);
       res.status(500).send({message:"error in creating user"})
   }
    // users.push(req.body);
    // res.send(users)
})
//put method********************************************************
userRouter.put("/:userId", async(req, res)=>{
    const {userId}=req.params;
    try{
        new userModel(req.body);
        await userModel.updateOne({id:userId},{'$set':req.body})
        res.send({message:'user updated successfully'})
       }
       catch(error)
       {
           console.log(error.message);
           res.status(500).send({message:"error in updating user"})
       }
    // const {userId} =req.params;
    // const newUser=req.body;
    // const oldUser = users.find(user => user.id === Number(userId));
    // users=users.filter(user=>user.id!==oldUser.id);
    // users.push(newUser);
    // res.send(users);
})
//delete method********************************************************
userRouter.delete("/:userId", async(req, res)=>{
    const {userId}=req.params;
    try{
        await userModel.deleteOne({id:userId});
        res.send({message:"user deleted successfully"})
    }catch(err){
        console.log(err);
        res.send({message:"user deleted successfully"});
    }
    // const {userId} =req.params;
    // users=users.filter(users=>users.id!==userId);
    // res.send(users);
    // console.log("this has been deleted")
})
export default userRouter;