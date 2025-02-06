import express from "express";
import {
  authController,
  loginController,
  registerController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorListController,
  bookAppointmentController,
  bookingAvailabilityController,
  getAppointmentController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

//POST Method ||register
router.post("/register", registerController);
//POST Method ||login
router.post("/login", loginController);
//POST || Auth
router.post("/getUserData", authMiddleware, authController);
//post || Apply doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController);
//post || getAllNotification
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

//post || deleteAllNotification
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//get || all doctorlist
router.get("/getAllDoctors", authMiddleware, getAllDoctorListController);

//POSt || book apointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

//POSt || book apointment
router.post(
  "/checkAvailability",
  authMiddleware,
  bookingAvailabilityController
);

router.get("/book-appointment", authMiddleware, getAppointmentController);
export default router;
