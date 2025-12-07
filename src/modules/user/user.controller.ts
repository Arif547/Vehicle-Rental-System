import { Request, Response } from "express";
import { userServices } from "./user.service";
import { pool } from "../../config/db";


const getAllUser = async (req: Request, res: Response) =>{
    
try{
    const result = await userServices.getAllUserFromDB()
   return res.status(201).json({
        success: true,
        message: "Users retrieved successfully",
        data : result.rows,
    })
   }catch(error: any){
   return res.status(500).json({
        success: false,
        message: error.message,
        
    })
   }

}

const getSingleUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await userServices.getSingleUser(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
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

const deleteUser = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await userServices.deleteUser(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const targetId = Number(req.params.id);        // user being updated
    const loggedInUser: any = req.user;            // from auth middleware
    const { name, email, phone, role } = req.body; // request body fields


    // 1. Customer can only update own profile
    if (loggedInUser.role !== "admin" && loggedInUser.id !== targetId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update another user"
      });
    }

    // 2. Customer cannot change role
    let finalRole = role;
    if (loggedInUser.role !== "admin") {
      finalRole = undefined;
    }

    // 3. Perform update (use service)
    const updateResult = await userServices.updateUser(
      targetId.toString(),
      name,
      email,
      phone,
      finalRole
    );

    if (updateResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateResult.rows[0]
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


export const userController = { 
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser
}   