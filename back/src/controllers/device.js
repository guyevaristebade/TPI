import { deviceModel } from "../models/index.js";
import mongoose, { sanitizeFilter }  from "mongoose";
import { lineRegex } from "../helpers/index.js";

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

    response.data = device;
  } catch (error) {
    response.status = 500;
    response.error = "Internal Server error "
  }

  return response;
};


export const deleteDevice = async (id) => {
  let response = {
    status : 200
  }

  if(!mongoose.isValidObjectId((id))){
    response.status = 400;
    response.error = "Invalid Object ID"
    return response;
  }
  try {
    const deletedToDevice = await deviceModel.findByIdAndDelete(id);

    if (!deletedToDevice) {
      response.status = 404;
      response.error = "Device not found"
      return response;
    }

    response.data = { message : "Device deleted successfully" };

  } catch (error) {
    response.error = `Internal server error ${error.message}`
    response.status = 500;
  }
  return response;
};

export const getDevices = async () => {
  let response = {
    status: 200
  };

  try {
    const device = await deviceModel.find().populate("site_id");

    if (!device || device.length === 0) {
      response.status = 404;
      response.error = "Device not found";
    } else {
      response.data = device;
    }

  } catch (error) {
    response.error = `Internal server error: ${error.message}`;
    response.status = 500;
  }

  return response;
};

export const getDeviceById = async (id) => {
  let response = {
    status: 200
  };

  try {
    const device = await deviceModel.findById(id).populate("site_id");

    if (!device) {
      response.status = 404;
      response.error = "Device not found";
      return response
    }

    response.data = device;

  } catch (error) {
    response.error = `Internal server error: ${error.message}`;
    response.status = 500;
  }

  return response;
};

export const updateDevice = async (id, deviceData) => {
  let response = {
    status: 200
  };

  if(!mongoose.isValidObjectId(id)){
    response.status = 400;
    response.error = "Invalid Object ID"
    return response;
  }

  try {

    const deviceToUpdate = await deviceModel.findByIdAndUpdate(id, deviceData,{ new : true })

    if(!deviceToUpdate) {
      response.status = 400
      response.error = "device doesn't exist"
      return response;
    }

    response.data = deviceToUpdate;

  } catch (error) {
    response.error = ` Internal server error => + ${error.message}` ;
    response.status = 500;
  }

  return response;
};
