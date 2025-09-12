import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/routes';
import cookieParser from 'cookie-parser';


const {URL_MONGO} = process.env;
const {PORT} = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());

export async function connectMongo() {
    try{    
        await mongoose
                .connect(URL_MONGO as string)
                .then(()=> {
                    console.log('Conectado ao servidor!');
                    app.listen(PORT);
                    app.use(router);
                })
                .catch((err) => console.log('erro'))
    } catch(err){ 
        console.error(err)
    }
}

connectMongo()