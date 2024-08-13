import express from "express";
import {createSite, deleteSite, getSiteById, getSites, updateSite} from "../controllers/index.js";
import {authenticated} from "../helpers/index.js";
export const siteRouter = express.Router();

// GET REQUEST
siteRouter.get('/', authenticated, async (req, res) => {
  const response = await getSites();
  res.status(response.status).send(response.data || response.error);
});

siteRouter.get('/:id', authenticated, async (req, res) => {
  const response = await getSiteById(req.params.id)
  res.status(response.status).send(response);
})

// PUT REQUEST
siteRouter.put("/:id", async (req, res) => {
  const { id }  = req.params;
  const siteData = req.body;
  const response = await updateSite(id,siteData);

  res.status(response.status).send(response)
})

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


