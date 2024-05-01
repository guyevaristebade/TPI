import express from "express";
import {createSite, deleteSite, getSites, updateSite} from "../controllers/index.js";
export const siteRouter = express.Router();

siteRouter.post("/", async (req, res) =>{
  const siteData = req.body;
  const result = await createSite(siteData);

  if(result.status !== 200){
    res.status(result.status).json({ message: result.message });
  }

  res.status(result.status).json({ message: result.message });

});

siteRouter.get("/", getSites);

siteRouter.delete("/:id", async (req, res) => {
  const id  = req.params
  const result= await deleteSite(id);

  if(result.status !== 200){
    res.status(result.status).json({ message: result.message });
  }

  res.status(result.status).json({ message: result.message });

})

siteRouter.put("/:siteId", updateSite)
