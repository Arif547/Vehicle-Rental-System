import { Request, Response } from "express"
import { vehicleService } from "./vehicle.service"


const createVehicles = async (req: Request, res: Response) =>{

    console.log("Received request body:", req.body);
try{
    const result = await vehicleService.vehicleIntoDB(req.body)
   return res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
        data : result.rows[0]
    })
   }catch(error: any){
   return res.status(500).json({
        success: false,
        message: error.message,
        
    })
   }

}

const getAllVehicles = async (req: Request, res: Response) =>{
    
try{
    const result = await vehicleService.getAllVehiclesFromDB()

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No vehicles found",
        data: [],
      });
    } 
   return res.status(201).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data : result.rows,
    })
   }catch(error: any){
   return res.status(500).json({
        success: false,
        message: error.message,
        
    })
   }

}

const getSingleVehicle = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await vehicleService.getSingleVehiclesFromDB(req.params.vehicleId as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not Found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await vehicleService.deleteVehicles(req.params.vehicleId!);
    console.log("Delete result:", result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } 
    else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
        // data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleController = {
    createVehicles,
    getAllVehicles,
    getSingleVehicle,
    deleteVehicle

}   