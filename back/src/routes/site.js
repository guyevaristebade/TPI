import express from "express";
import { createSite, deleteSite, getSites, updateSite } from "../controllers/index.js";
export const siteRouter = express.Router();

// GET REQUEST
siteRouter.get('/', async (req, res) => {
  const response = await getSites();
  res.status(response.status).send(response.data || response.error);
});


// POST REQUEST
siteRouter.post("/", async (req, res) => {
  const siteData = req.body;
  const response = await createSite(siteData);
  res.status(response.status).send(response.data || response.error);
});


// DELETE REQUEST
siteRouter.delete("/:id", async (req, res) => {
  const { id }  = req.params;
  const response= await deleteSite(id);
  res.status(response.status).send(response.data || response.error);
})

// PUT REQUEST
siteRouter.put("/:id", async (req, res) => {
  const { id }  = req.params;
  const siteData = req.body;
  const response = await updateSite(id,siteData);

  res.status(response.status).send(response.data || response.error)
})
