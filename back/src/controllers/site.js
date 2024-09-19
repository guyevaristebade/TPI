import {Assignment, Site} from "../models/index.js";
import mongoose,{ sanitizeFilter } from 'mongoose'

export const createSite = async (siteData) => {
    let response = {
      status : 201,
      success : true
    }

  try {
    let site = await Site.findOne(sanitizeFilter({ name: siteData.name }));

    if (site){
      response.status = 400;
      response.success = false;
      response.msg = "Un site Avec ce nom existe déjà";
      return response;
    }

    const saveSite = new Site(siteData);

    await saveSite.save();

    response.data =  saveSite
    response.msg = "Site créé avec succès"

  } catch (error) {
    response.status = 500
    response.success = false;
    response.msg = `Internal server Error : ${error.message}`;
  }

  return response;
};


/**
 * Cette fonction permet de supprimer un site via son id
 * Elle supprime également les données liées aux site dans la table Assignment
 *
 * */
export const deleteSite = async (id) => {

  let response = {
    status : 201,
    success : true
  }


  try {

    if(!mongoose.isValidObjectId(id)){
      response.status = 400;
      response.success = false
      response.msg = 'Identifiant invalide ';
      return response;
    }

    const siteDeleted = await Site.findByIdAndDelete(id);

    if (!siteDeleted) {
      response.status = 404;
      response.success = false
      response.msg = 'Le site n\'existe pas ';
      return response;
    }

    const assignmentsDeleted = await Assignment.find({ site: id });

    if(assignmentsDeleted){
      await Assignment.deleteMany({ site: id })
    }

    response.msg = "Site supprimé avec succès"
  } catch (error) {
    response.msg = `Une erreur serveur produite veuillez contacter le développeur `;
    response.success = false
    response.status = 500
  }

  return response;
};


export const getSites = async () => {

  let response = {
    status : 201,
    success : true
  }
  
  try {
    const sites = await Site.find().sort({ name: 1 });

    response.data = sites

  } catch (error) {
    response.msg = `Internal server Error : ${error.message}`;
    response.success = false
    response.status = 500;
  }
  return response;
}


export const updateSite = async (id, siteData) => {
  let response = {
    status : 201,
    success : true
  }
  

  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      response.msg = 'Identifiant invalide';
      response.success = false
      response.status = 400;
      return response
    }

    const updatedSite = await Site.findByIdAndUpdate(
      id,
      siteData,
      { new: true }
    );

    if (!updatedSite) {
      response.msg = 'Une erreur s\'est produite lors de la mise à jour '
      response.success = false;
      response.status = 404;
      return response
    }

    response.data = updatedSite

  } catch (error) {
    response.msg = `Internal server Error : ${error.message}`;
    response.success = false;
    response.status = 500;
  }
  return response;
};


export const getSiteById = async (id) => {

  let response = {
    status : 201,
    success : true
  }


  try{

    if(!mongoose.isValidObjectId(id)){
      response.msg = 'Identifiant invalide ';
      response.success = false
      response.status = 400;
      return response;
    }

    const site = await Site.findById(id);

    if(!site){
      response.msg = `Site introuvable`;
      response.success = false
      response.status = 404;
      return response;
    }

    response.data = site
  }catch (e) {
    response.msg = `Internal server Error : ${e.message}`;
    response.success = false
    response.status = 500;
  }
  return response;
}
