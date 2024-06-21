import express from "express";
import { createSite, deleteSite, getSites, updateSite } from "../controllers/index.js";
export const siteRouter = express.Router();

siteRouter.get('/', async (req, res) => {
  const result = await getSites();

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message})
  }else{
    res.status(result.status).json({sites : result.data })
  }
});

// create site
siteRouter.post("/", async (req, res) => {
  const siteData = req.body;
  const result = await createSite(siteData);

  // Use only one response send
  if (result.status !== 200) {
    res.status(result.status).json({ message: result.message });
  } else {
    res.status(200).json({ message: result.message });
  }
});




siteRouter.delete("/:siteId", async (req, res) => {
  const { siteId }  = req.params;
  const result= await deleteSite(siteId);

  if(result.status !== 200){
    res.status(result.status).json({ message: result.message });
  }else{
    res.status(200).json({ message: result.message });
  }
})

siteRouter.put("/:siteId", async (req, res) => {
  const { siteId }  = req.params;
  const siteData = req.body
  const response = await updateSite(siteId,siteData)

  res.status(response.status).send(response.data || response.error)
})
