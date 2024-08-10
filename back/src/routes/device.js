import express from 'express';
import { createDevice, deleteDevice, getDevices, updateDevice } from "../controllers/index.js";

export const deviceRouter = express.Router();

deviceRouter.post('/', async (req, res) => {
  const deviceData = req.body;
  const result = await createDevice(deviceData)

  res.status(result.status).send(result)
});

deviceRouter.delete('/:id',async (req, res) => {
  const { id } = req.params
  const result = await deleteDevice(id)

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(result.status).json({ message: result.message})
});

deviceRouter.put('/:deviceId',async (req, res) => {
  const { deviceId } = req.params;
  const deviceData = req.body;

  const result = await updateDevice(deviceId, deviceData);

  res.status(result.status).send(result || result)
});

deviceRouter.get('/', async (req, res) => {
  const result = await getDevices();

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message})
  }else{
    res.status(result.status).json({ device : result.data })
  }
});
