import express from "express";
import {createSite, deleteSite, getSites, updateSite} from "../controllers/index.js";
export const siteRouter = express.Router();

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



siteRouter.get("/", getSites);


siteRouter.delete("/:siteId", async (req, res) => {
  const siteId  = req.params.siteId;
  const result= await deleteSite(siteId);

  if(result.status !== 200){
    res.status(result.status).json({ message: result.message });
  }else{
    res.status(200).json({ message: result.message });
  }
})

siteRouter.put("/:siteId", updateSite)
