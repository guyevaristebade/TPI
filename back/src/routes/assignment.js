import express from 'express';
import {assignDevice, deleteAssignments, getDeviceAssigned, unassignDevice} from "../controllers/index.js";
export const assignmentRouter = express.Router();


// Route pour attribuer un appareil à un site
assignmentRouter.post('/assign/:deviceId/:siteId', async (req, res) =>{
  const { deviceId, siteId } = req.params;
  const response = await assignDevice(deviceId, siteId);
  res.status(response.status).send(response)
});

assignmentRouter.get('/', async (req, res)=>{
  const response = await getDeviceAssigned();
  res.status(response.status).send(response)
})

// Route pour désattribuer un appareil d'un site
assignmentRouter.delete('/unassign/:ida/:idb', async (req,res) =>{
  const { ida, idb } = req.params;
  const response = await unassignDevice(ida,idb);
  res.status(response.status).send(response)
});

assignmentRouter.delete('/', async (req,res) =>{
  const response = await deleteAssignments();
  res.status(response.status).send(response)
})
