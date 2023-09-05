import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env);
const username=process.env.DB_USERNAME || '';
const password=process.env.DB_PASSWORD || '';
const clusterName=process.env.DB_CLUSTER || '';
const dbName=process.env.DB_NAME || '';
const cloudMongoUrl=`mongodb+srv://${username}:${password}@${clusterName}/${dbName}?retryWrites=true&w=majority`;

const connectToDb=async() => {
    try{ 
        await mongoose.connect(cloudMongoUrl,
    {useNewUrlParser:true});
    console.log("DB connected successfully")
    }
    catch(error)
    {
     console.log(error.message)
     process.exit(1)
    }   

}
export default connectToDb;