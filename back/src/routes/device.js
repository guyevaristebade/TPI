import express from 'express';
import { createDevice, deleteDeviceById, getAllDevice, getDeviceById, updateDeviceById } from "../controllers/index.js";

export const deviceRouter = express.Router();

// POST REQUEST
deviceRouter.post('/', async (req, res) => {
  const deviceData = req.body;
  const result = await createDevice(deviceData)

  res.status(result.status).send(result.data || result.error)
});

//DELETE REQUEST
deviceRouter.delete('/:id',async (req, res) => {
  const { id } = req.params
  const result = await deleteDeviceById(id)
  res.status(result.status).send(result.data || result.error)
});

// PUT REQUEST
deviceRouter.put('/:id',async (req, res) => {
  const { id } = req.params;
  const deviceData = req.body;
  const result = await updateDeviceById(id, deviceData);
  res.status(result.status).send(result.data || result.error)
});

//GET REQUEST
deviceRouter.get('/', async (req, res) => {
  const result = await getAllDevice();
  res.status(result.status).send(result.data || result.error)
});

deviceRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getDeviceById(id);
  res.status(result.status).send(result.data || result.error)
});
