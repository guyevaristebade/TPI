import express from 'express';
import {createDevice, deleteDevice, getAll, updateDevice} from "../controllers/index.js";

export const deviceRouter = express.Router();

deviceRouter.post('/', async (req, res) => {
  const deviceData = req.body;
  const result = await createDevice(deviceData)

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }else{
    res.status(result.status).json({ message: result.message})
  }

});

deviceRouter.delete('/:deviceId',async (req, res) => {
  const { deviceId } = req.params
  const result = await deleteDevice(deviceId)

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(result.status).json({ message: result.message})
});

deviceRouter.put('/:deviceId',async (req, res) => {
  const deviceId = req.params;
  const deviceData = req.body;
  const result = await updateDevice(deviceId, deviceData);

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message})
  }else{
      res.status(result.status).json({ message: result.message, updatedDevice : result.updatedDevice})
  }
});

deviceRouter.get('/', async (req, res) => {
  const result = await getAll();

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message})
  }else{
    res.status(result.status).json({ message: result.message, device : result.devices })
  }
});
