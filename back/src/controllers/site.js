import {deviceModel, siteModel} from "../models/index.js";
import mongoose,{ sanitizeFilter } from 'mongoose'

export const createSite = async (siteData) => {
    let response = {
      status : 200
    }

  try {
    let site = await siteModel.findOne(sanitizeFilter({ site_name: siteData.site_name}));

    if (site){
      response.error = "The site already exists";
      response.status = 400;
      return response;
    }

    const saveSite = new siteModel(siteData);

    await saveSite.save();

    response.data = saveSite;

  } catch (error) {
    response.error = `Internal server Error : ${error.message}`;
    response.status = 500
  }

  return response;
};


/**
 * Cette fonction permet de supprimer un site
 * Elle supprime aussi le ou les PTI associé au site
 * */
export const deleteSite = async (id) => {

  let response = {
    status : 200
  }
  try {
    const siteToDelete = await siteModel.findById(id);

    if (!siteToDelete) {
      response.status = 404
      response.error = 'Site not found'
      return response
    }

    const deviceToDelete = await deviceModel.findOne({ site_id: id });

    if (!deviceToDelete) {
      await siteModel.findByIdAndDelete(id);
    }else{
      await deviceModel.findByIdAndDelete(deviceToDelete.id);
      await siteModel.findByIdAndDelete(id);
    }

    response.data = { message : "Site deleted successfully" }

  } catch (error) {
    response.error = `Internal server Error : ${error.message}`;
    response.status = 500
  }

  return response;
};


export const getSites = async () => {
  
  let response = {
    status : 200,
  }
  
  try {
    const sites = await siteModel.find();

    if(!sites) {
      response.error = "No sites found";
      response.status = 404;
      return response;
    }
    
    response.data = sites;

  } catch (error) {
    response.error = `Internal server Error : ${error.message}`;
    response.status = 500;
  }
  return response;
}


export const updateSite = async (id, siteData) => {
  let response = {
    status : 200,
  }
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      response.error = 'Invalid or missing site ID';
      response.status = 400;
      return response
    }
    
  try {

    const updatedSite = await siteModel.findByIdAndUpdate(
      id,
      siteData,
      { new: true }
    );

    if (!updatedSite) {
      response.error = 'Site not found '
      response.status = 404;
      return response
    }

    response.data = updatedSite
  } catch (error) {
    response.error = `Internal server Error : ${error.message}`;
    response.status = 500;
  }
  return response;
};

