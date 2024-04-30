import express from "express";
import {createSite, deleteSite, getSites, updateSite} from "../controllers/index.js";
export const siteRouter = express.Router();

siteRouter.post("/", async (req, res) =>{
  const siteData = req.body;
  const result = await createSite(siteData);

  if(result.status !== 200){
    res.status(result.status).json({ message: result.message });
  }
});

siteRouter.get("/", getSites);

siteRouter.delete("/:id", deleteSite)

siteRouter.put("/:siteId", updateSite)
