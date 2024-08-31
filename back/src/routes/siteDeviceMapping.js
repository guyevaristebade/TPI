import {  Router } from 'express'
import {AttributeDevice} from "../controllers/siteDeviceMapping.js";

export const siteDeviceMappingRouter = Router();


siteDeviceMappingRouter.post('/:site_id/:device_id', async (req, res) => {

  const { site_id, device_id } = req.params;
  const response = await AttributeDevice(site_id,device_id)
  res.status(response.status).send(response)
})
