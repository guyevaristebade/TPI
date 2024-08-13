import express from 'express';
import {createDevice, deleteDevice, getDeviceById, getDevices, updateDevice} from "../controllers/index.js";

export const deviceRouter = express.Router();

deviceRouter.post('/', async (req, res) => {
  const deviceData = req.body;
  const result = await createDevice(deviceData)

  res.status(result.status).send(result)
});

deviceRouter.delete('/:id',async (req, res) => {
  const { id } = req.params
  const result = await deleteDevice(id)

  res.status(result.status).send(result)
});

deviceRouter.put('/:id',async (req, res) => {
  const { id } = req.params;
  const deviceData = req.body;

  const result = await updateDevice(id, deviceData);

  res.status(result.status).send(result)
});

deviceRouter.get('/', async (req, res) => {
  const result = await getDevices();

  res.status(result.status).send(result)

});

deviceRouter.get('/:id', async (req, res) => {
  const result = await getDeviceById(req.params.id);
  res.status(result.status).send(result)

});
