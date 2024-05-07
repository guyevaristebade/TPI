import { fileModel } from "../models/index.js";
import CryptoJS from 'crypto-js'

export const getFile = async  (fileId) => {
  try{

    const file = await fileModel.findById(fileId).exec();

    if (file === null) {
      return {
        status: 404,
        message: 'File not found',
      }
    }

    const key = process.env.FILE_SECRET
    file.data = CryptoJS.AES.decrypt(file.data, key).toString(CryptoJS.enc.Utf8);

    return { status : 200, data : file }
  }catch (e) {
    return { status : 500, message : "internal server error"}
  }
}
