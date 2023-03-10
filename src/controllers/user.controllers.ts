import { Request,Response } from "express"
import { QueryResult } from "pg"
import {pool} from '../database'

export const getUser = async (req:Request,res:Response):Promise<Response> => {
    try {
        const userInfo:QueryResult = await pool.query("SELECT * FROM tbl_user")
    return res.status(200).json(userInfo.rows);
    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
}

export const createUser = async (req:Request,res:Response):Promise<Response> => {
    try {
        const {userName,userEmail} = req.body;
        const addUser:QueryResult = await pool.query("INSERT INTO tbl_user (user_name,user_email_id) VALUES ($1,$2)",[userName,userEmail])
    return res.status(200).json({message:"user created successfully", body:{user:{userName,userEmail}}});
    } catch (error) {
        return res.status(500).json("Server Error")
    }
}

export const deleteUser = async (req:Request,res:Response):Promise<Response> => {
    try {
        // console.log(req.params.userId)
        // res.send("deleting")
        const {userId} =req.body  ;
        // const {userId} = req.body;
        const removeUser:QueryResult = await pool.query("DELETE FROM tbl_user WHERE user_id=$1",[userId])
    return res.status(200).json({message:`user ${userId} deleted successfully`});
    } catch (error) {
        return res.status(500).json("Server Error")
    }
}

export const updateUser = async(req:Request,res:Response):Promise<Response> => {
    try {
        // const id = parseInt(req.params.userId);
        const {userId,userName,userEmail} = req.body;
        console.log(userId);
        console.log(userName);
        console.log(userEmail);
        const userUpdate:QueryResult = await pool.query("UPDATE tbl_user SET user_name=$1, user_email_id=$2 WHERE user_id=$3",[userName,userEmail,userId]);
        return res.status(200).json({message:`user ${userId} updated successfully`});
    } catch (error) {
        return res.status(500).json("Server Error")
    }
    
}