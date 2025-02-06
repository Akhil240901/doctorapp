import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  doctorProfileInfoController,
  updateProfileController,
  getSingleDoctorController,
  doctorAppointmentController,
  updateAppointmentStatusController,
} from "../controllers/doctorController.js";

const router = express.Router();

//POST  || get doctor profile
router.post("/getAllDoctorInfo", authMiddleware, doctorProfileInfoController);

//POST || update and show doctor info in profile
router.post("/updateDoctorProfile", authMiddleware, updateProfileController);

//POST ||get single doctor
router.post("/getSingleDoctor", authMiddleware, getSingleDoctorController);

//POST || Get Appointment
router.get("/doctor-appointments", authMiddleware, doctorAppointmentController);

//Update status
router.post(
  "/update-status",
  authMiddleware,
  updateAppointmentStatusController
);
export default router;
