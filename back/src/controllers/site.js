import {deviceModel, siteModel} from "../models/index.js";
import { sanitizeFilter } from 'mongoose'

export const createSite = async (req, res) => {
  try {
    const { name, address } = req.body;

    let site = await siteModel.findOne(sanitizeFilter({ site_name: name }));

    if (site) return res.status(400).send(`Site with this name ${name} already exists`);

    site = new siteModel({
      site_name: name,
      address: address
    });

    await site.save();

    res.status(201).send("Site created successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};


export const deleteSite = async (req, res) => {
  try {
    const { id } = req.params;

    const siteToDelete = await siteModel.findById(id);

    if (!siteToDelete) {
      return res.status(404).send("Site not found");
    }

    const deviceToDelete = await deviceModel.findOne({ site_id: id });

    if (!deviceToDelete) {
      await siteModel.findByIdAndDelete(id);
    } else {
      await deviceModel.findByIdAndDelete(deviceToDelete._id);
      await siteModel.findByIdAndDelete(id);
    }

    res.status(200).send("Site deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};


export const getSites = async (req, res) => {
  try {
    const sites = await siteModel.find();
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
}
