import {Assignment, Device} from "../models/index.js";
import mongoose, { sanitizeFilter }  from "mongoose";


/**
 * Cette fonction permet de créer un appareil
 * elle vérifie si le numéro de série est éjà présent dans bd
 * si oui elle renvoie un message d'erreur
 * sinon elle enregistre l'appareil
 * */
export const createDevice = async (deviceData) => {
  let response = {
    status : 201,
    success : true
  }

  try {

    const existingDevice = await Device.findOne({ imei : deviceData.imei });

    if (existingDevice) {
      response.status = 400;
      response.success = false
      response.msg = "Un appareil avec ce numéro de série existe déjà"
      return response;
    }

    const device = new Device(deviceData);

    await device.save();

    response.data = device;
    response.msg = "Appareil enregistré avec succès"

  } catch (error) {
    response.status = 500;
    response.success = false
    response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeurs'
  }

  return response;
};



export const deleteDevice = async (id) => {
  let response = {
    status : 201,
    success : true
  }

  try {
    const deletedDevice = await Device.findByIdAndDelete(id);

    if (!deletedDevice) {
      response.status = 404;
      response.success = false
      response.msg = "Appareil introuvable, suppression échoué"
      return response;
    }

    await Assignment.findOneAndDelete({device : id})

    response.data = deletedDevice
    response.msg = "Appareil supprimé avec succès"

  } catch (error) {
    response.status = 500;
    response.success = false
    response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeur'
  }

  return response;
};

export const getDevices = async () => {

  let response = {
    status: 201,
    success : true
  };


  try{
    const devices = await Device.find();

    response.data = devices;

  } catch (error) {
    response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeur'
    response.success = false
    response.status = 500;
  }

  return response;
}

export const getDeviceById = async (id) =>{
  let response = {
    status: 201,
    success: true
  };


  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      response.status = 400;
      response.success = false
      response.msg = "Identifiant invalide";
      return response;
    }

    const device = await Device.findById(id);

    if(!device){
      response.status = 404;
      response.success = false
      response.msg = "Appareil introuvable";
      return response;
    }

    response.data = device

  }catch (error) {
    response.status = 500;
    response.success = false
    response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeur'
  }

  return response;
}


export const updateDevice = async (id, deviceData) => {

  let response = {
    status: 201,
    success : true
  };


  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      response.msg = "Identifiant invalide ";
      response.success = false
      response.status = 400;
      return response;
    }
    const updatedDevice = await Device.findByIdAndUpdate(
      id,
      deviceData,
      { new: true }
    );

    if (!updatedDevice) {
      response.msg = "Appareil introuvable ";
      response.success = false
      response.status = 400;
      return response;
    }

    response.data = updatedDevice;

  } catch (error) {
    response.msg = 'Une erreur serveur est survenue, veuillez contacter les développeur'
    response.success = false
    response.status = 500;
  }

  return response;
};
