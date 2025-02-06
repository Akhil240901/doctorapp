import express from "express";
import { authMiddleware } from "./../middleware/authMiddleware.js";
import {
  approveStatusController,
  getAllDoctorsController,
  getAllUsersController,
} from "../controllers/adminController.js";

const router = express.Router();

// Get || Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
// Get || Doctors
router.get("/getAllUsers", authMiddleware, getAllUsersController);
//POST || statusApprove
router.post("/approveStatusChange", authMiddleware, approveStatusController);

export default router;
