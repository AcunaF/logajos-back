// importo la libreria
import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/routes.js';
import cors from 'cors';
import {TestConnection} from './src/model/conexion_db.js'; 




dotenv.config();
// Inicializo el express

const app = express();
app.use(cors());


//midleware json

app.use(express.json());
app.use(express.urlencoded({extended:true}));


await TestConnection();

console.log(process.env.PORT)

//rutas
app.use(router);
app.listen(process.env.PORT, (req, res) =>{
    console.log(`Puerto está corriendo en el puerto ${process.env.PORT}`);   
    
})

