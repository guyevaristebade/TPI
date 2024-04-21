import express from 'express';
import {createDevice, deleteDevice, getAll, updateDevice} from "../controllers/index.js";

export const deviceRouter = express.Router();

deviceRouter.post('/',createDevice);

deviceRouter.delete('/:deviceId',deleteDevice);

deviceRouter.put('/',updateDevice);

deviceRouter.get('/',getAll);
