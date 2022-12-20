import { Router } from "express";
const router = Router();
import {getUser,createUser,deleteUser,updateUser} from '../controllers/user.controllers'

router.get("/user",getUser);
router.post("/user",createUser);
router.delete("/user",deleteUser);
router.put("/user",updateUser);

export default router