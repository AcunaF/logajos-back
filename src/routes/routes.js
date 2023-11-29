import express from "express";
const router = express.Router();
import { GetData,GetDataModel, GetbyId, UpdatebyId, Create, Delete} from "../controllers/controller.js";

//Se le pasa la función, pero no se le dice que la exporte
router.get('/getdata', GetData);
router.get('/getdatamodel', GetDataModel);
router.get('/getdatabyid/:id', GetbyId);
router.put('/update/:id', UpdatebyId);
router.post('/create', Create);
router.delete('/delete/:id', Delete);


export default router;