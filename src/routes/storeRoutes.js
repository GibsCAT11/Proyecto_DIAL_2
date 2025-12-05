import {Router} from "express";
import { verifyToken } from '../middlewares/authentication.js';

import * as StoreController from '../controllers/storeController.js'

const storeRouter = Router();

storeRouter.get('/store/', StoreController.getAll);
storeRouter.get('/store/:id',  StoreController.getById);
storeRouter.post('/store/',verifyToken, StoreController.create);
storeRouter.put('/store/:id',verifyToken, StoreController.update);
storeRouter.delete('/store/:id',verifyToken, StoreController.deleted);

export default storeRouter;