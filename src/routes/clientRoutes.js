import {Router} from "express";
import * as ClientController from '../controllers/clientController.js'

const clientRouter = Router();

clientRouter.get('/client/', ClientController.getAll);
clientRouter.get('/client/:id', ClientController.getById);
clientRouter.post('/client/', ClientController.create);
clientRouter.put('/client/:id', ClientController.update);
clientRouter.delete('/client/:id', ClientController.deleted);

export default clientRouter;