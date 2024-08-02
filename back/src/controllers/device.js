import { deviceModel } from "../models/index.js";
import mongoose, {isValidObjectId, sanitizeFilter} from "mongoose";
import { lineRegex } from "../helpers/index.js";
import {getChangedFields} from "../helpers/helpers.js";


export const createDevice = async (deviceData) => {
  let response = {
    status : 200
  }

    if (!lineRegex.test(deviceData.line)) {
      response.status = 400;
      response.error = "Invalid phone number format for line"
      return response;
    }
    
  try {
    const existingDevice = await deviceModel.findOne(sanitizeFilter({ line: deviceData.line })).exec();

    if (existingDevice) {
      response.status = 400;
      response.error = "A device with the same line already exists"
      return response;
    }

    const device = new deviceModel(deviceData);

    await device.save();

    response.data = device;
  } catch (error) {
    response.status = 500;
    response.error = "Internal Server error " + error.message
  }

  return response;
};



export const deleteDeviceById = async (id) => {
  let response = {
    status : 200
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.error = "Invalid or missing device ID";
    response.status = 400;
    return response;
  }
  
  try {
    const deletedDevice = await deviceModel.findByIdAndDelete(sanitizeFilter(id));

    if (!deletedDevice) {
      response.status = 404
      response.error = 'Device not found'
      return response
    }

    response.data = { message : " device deleted successfully" }
  } catch (error) {
    response.status = 500;
    response.error = "Internal Server error " + error.message
  }

  return response;
};

export const getAllDevice = async () => {
  let response = {
    status : 200
  }
  
  try{
    const device = await deviceModel.find().populate("site_id");

    if(!device){
      response.status = 404
      response.error = "Device not found"
      return response
    }
    
    response.data = device;
    return response 
    
  } catch (error) {
    response.status = 500;
    response.error = "Internal Server error " + error.message
  }

  return response;
}


export const updateDeviceById = async (id, deviceData) => {
  let response = {
    status: 200
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.error = "Invalid or missing device ID";
    response.status = 400;
    return response;
  }

  try {
    const updatedDevice = await deviceModel.findByIdAndUpdate(
      id,
      deviceData,
      { new: true }
    );

    if (!updatedDevice) {
      response.error = "Bad request device not updated";
      response.status = 400;
      return response;
    }

    response.data = updatedDevice;

  } catch (error) {
    response.error = "Internal server error => " + error.message;
    response.status = 500;
  }

  return response;
};


export const getDeviceById = async (id) => {
  let response = { 
    status : 200
  }
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.error = "Invalid or missing device ID";
    response.status = 400;
    return response;
  }
  
  try {
    const device = await deviceModel.findById(id).populate("site_id");

    if(!device){
      response.error = "device does not exist";
      response.status = 404;
      return response;
    }

    response.data = device
  }catch (error) {
    response.error = "Internal server error => " + error.message;
    response.status = 500;
  }

  return response
}
