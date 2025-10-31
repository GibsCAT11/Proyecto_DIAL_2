import {Router} from "express";
import * as StoreController from '../controllers/storeController.js'

const storeRouter = Router();

storeRouter.get('/store/', StoreController.getAll);
storeRouter.get('/store/:id', StoreController.getById);
storeRouter.post('/store/', StoreController.create);
storeRouter.put('/store/:id', StoreController.update);
storeRouter.delete('/store/:id', StoreController.deleted);

export default storeRouter;