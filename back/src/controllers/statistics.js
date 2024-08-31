import { deviceModel, siteModel, User } from "../models/index.js";

export const getStatistics = async () => {
  let response = {
    status : 200
  }

  try{
    const user= await User.find()

    const devices = await  deviceModel.find()

    const sites = await siteModel.find()

    response.data = {user : user.length ,devices : devices.length,sites : sites.length}
  }catch(error){
    response.status = 500
    response.data = "Internal Server Error"
  }
  return response
}

export const devicesPerSite = async () =>{
  let response = {
    status : 200
  }
  try {

    const distribution = await deviceModel.aggregate([
      {
        $group: {
          _id: "$site_id",
          deviceCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "sites",
          localField: "_id",
          foreignField: "_id",
          as: "siteDetails"
        }
      },
      {
        $unwind: "$siteDetails"
      },
      {
        $project: {
          _id: 0,
          siteName: "$siteDetails.site_name",
          deviceCount: 1
        }
      }
    ]);

    response.data = distribution;

    } catch (e) {
      response.status = 500;
      response.error = 'Internal server error';
    }

    return response;

}
