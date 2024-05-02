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

    return { status : 201, message : "Site created successfully" }

  } catch (error) {
    return { status : 500 , message : `Internal server Error. Veuillez contacter l'administrateur du site ` };
  }
};


/**
 * Cette fonction permet de supprimer un site
 * Elle supprime aussi le ou les PTI associé au site
 * */
export const deleteSite = async (_id) => {
  try {
    const siteToDelete = await siteModel.findById(_id);

    if (!siteToDelete) {
      return { status : 404, message : "Site not found" }
    }

    const deviceToDelete = await deviceModel.findOne({ site_id: _id });

    if (!deviceToDelete) {
      await siteModel.findByIdAndDelete(_id);
    }else{
      await deviceModel.findByIdAndDelete(deviceToDelete._id);
      await siteModel.findByIdAndDelete(_id);
    }

    return { status : 200 , message : "Site deleted successfully" };

  } catch (error) {
    console.error(error.message);
    return { status : 500 , message : `Internal server Error. Veuillez contacter l'administrateur du site  ` };
  }
};


export const getSites = async () => {
  try {
    const sites = await siteModel.find();

    if(!sites) {
      return { status : 200 , message : "No Sites found", sites };
    }
    return { status : 200, data : sites }

  } catch (error) {
    return { status : 500 , message : `Internal server Error. Veuillez contacter l'administrateur du site ` };
  }
}


export const updateSite = async (siteId, siteData) => {
  try {

    const updatedSite = await siteModel.findByIdAndUpdate(
      siteId,
      { site_name : siteData.site_name, address : siteData.address},
      { new: true }
    );

    if (!updatedSite) {
      return { status : 404, message : 'Site not found' };
    }

    return { status : 200, message : 'Site updated' };

  } catch (error) {
    return { status : 500 , message : `Internal server Error. Veuillez contacter l'administrateur du site ` };
  }
};

