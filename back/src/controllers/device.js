import { deviceModel } from "../models/index.js";
import mongoose, { sanitizeFilter }  from "mongoose";
import { lineRegex } from "../helpers/index.js";
import {getChangedFields} from "../helpers/helpers.js";


export const createDevice = async (deviceData) => {
  let response = {
    status : 200
  }

  try {

    if (!lineRegex.test(deviceData.line)) {
      response.status = 400;
      response.error = "Invalid phone number format for line"
      return response;
    }

    const existingDevice = await deviceModel.findOne(sanitizeFilter({ line: deviceData.line })).exec();

    if (existingDevice) {
      response.status = 400;
      response.error = "A device with the same line already exists"
      return response;
    }

    const device = new deviceModel({
      line: deviceData.line,
      brand: deviceData.brand,
      date: deviceData.date,
      site_id: deviceData.site_id,
      state: deviceData.state
    });

    await device.save();

    response.data = "Device created successfully";
  } catch (error) {
    response.status = 500;
    response.error = "Internal Server error "
  }

  return response;
};



export const deleteDevice = async (deviceId) => {
  try {
    const deletedDevice = await deviceModel.findByIdAndDelete(sanitizeFilter(deviceId));

    if (!deletedDevice) {
      return { status : 404, message : "Device not found"};
    }

    return { status : 200, message : "Device deleted successfully" };

  } catch (error) {
    return { status : 500, message : "Internal Server Error "};
  }
};

export const getDevices = async () => {
  try{
    const device = await deviceModel.find().populate("site_id");

    if(!device){
      return { status : 404, message : "Device not found "};
    }

    return { status : 200, data : device };
  }catch (e) {
    return { status : 500, message : "Internal Server Error "};
  }
}


export const updateDevice = async (deviceId, deviceData) => {
  let response = {
    status: 200
  };

  try {

    const deviceDataValues = Object.values(deviceData);
    if(deviceDataValues.length === 0) {
      response.status = 400
      response.error = "Veuillez remplir au moins 1 champs"
      return response
    }
    console.log(deviceDataValues)

    if (!deviceId || !mongoose.Types.ObjectId.isValid(deviceId)) {
      response.error = "Invalid or missing device ID";
      response.status = 400;
      return response;
    }


    if (!deviceData || typeof deviceData !== 'object') {
      response.error = "Invalid or missing request body";
      response.status = 400;
      return response;
    }


    const updatedDevice = await deviceModel.findByIdAndUpdate(
      deviceId,
      getChangedFields(deviceData),
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
