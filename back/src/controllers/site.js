import {deviceModel, siteModel} from "../models/index.js";
import { sanitizeFilter } from 'mongoose'

export const createSite = async (siteData) => {
  try {
    let site = await siteModel.findOne(sanitizeFilter({ site_name: siteData.site_name}));

    if (site){
      return { status : 400, message :"The site already exists" }
    }

    site = new siteModel({ site_name : siteData.site_name , address : siteData.address });

    await site.save();

    res.status(201).send("Site created successfully");
    return { status : 201, message : "Site created successfully" }

  } catch (error) {
    console.error(error.message);
    return { status : 500, message : "Internal server error" }
  }
};


/**
 * Cette fonction permet de supprimer un site
 * Elle supprime aussi le ou les PTI associé au site
 * */
export const deleteSite = async (id) => {
  try {
    const siteToDelete = await siteModel.findById(id);

    if (!siteToDelete) {
      return { status : 404, message : "Site not found" }
    }

    const deviceToDelete = await deviceModel.findOne({ site_id: id });

    if (!deviceToDelete) {
      return { status : 404, message : "Device not found" }
    }

    await deviceModel.findByIdAndDelete(deviceToDelete._id);
    await siteModel.findByIdAndDelete(id);

    return { status : 200 , message : "Site deleted successfully" };

  } catch (error) {
    console.error(error.message);
    return { status : 500 , message : "Internal server Error" };
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


export const updateSite = async (req, res) => {
  try {
    const { siteId } = req.params;
    const { site_name, address } = req.body;

    const updatedSite = await siteModel.findByIdAndUpdate(
      siteId,
      { site_name, address},
      { new: true }
    );

    if (!updatedSite) return res.status(404).json({message : "Site not found"});

    res.status(200).json({message : "Site updated successfully"});

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message : "Internal Server Error" });
  }
};

