import express from 'express';
import {createDevice, deleteDevice, getDeviceById, getDevices, updateDevice} from "../controllers/index.js";

export const deviceRouter = express.Router();

deviceRouter.post('/', async (req, res) => {
  const deviceData = req.body;
  const response = await createDevice(deviceData)

  res.status(response.status).send(response.data || response.error);
});


deviceRouter.put('/:id',async (req, res) => {
  const { id } = req.params;
  const deviceData = req.body;

  const response = await updateDevice(id, deviceData);

  res.status(response.status).send(response.data || response.error)
});

deviceRouter.delete('/:id',async (req, res) => {
  const { id } = req.params
  const response = await deleteDevice(id)

  res.status(response.status).send(response.data || response.error);
});

deviceRouter.get('/', async (req, res) => {
  const response = await getDevices();
  res.status(response.status).send(response.data || response.error)
});

deviceRouter.get('/:id', async (req, res) => {
  const { id } = req.params
const response = await getDeviceById(id);
  res.status(response.status).send(response.data || response.error)
})
