import express from "express";
import {createSite, deleteSite, getSites } from "../controllers/index.js";
export const siteRouter = express.Router();

siteRouter.post("/", createSite);

siteRouter.get("/", getSites);

siteRouter.delete("/:id", deleteSite)
