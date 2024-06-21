import express from 'express'
import {devicesPerSite, getStatistics} from "../controllers/index.js";
export const statisticsRouter = express.Router();

statisticsRouter.get('/', async(req, res) => {
  const response = await getStatistics();
  res.status(response.status).send(response.data)
})


statisticsRouter.get('/repartition', async(req, res) =>{
  const response = await devicesPerSite();
  res.status(response.status).send(response.data || response.error)
})
