import User from "../model/userModel.js";
import doctorModel from "../model/doctorModel.js";

export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});

    res.status(200).send({
      success: true,
      message: "Doctors list fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    resizeBy.status(500).send({
      success: false,
      message: "Cant fetch doctors list",
      error,
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send({
      success: true,
      message: "Users list fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    resizeBy.status(500).send({
      success: false,
      message: "Cant fetch users list",
      error,
    });
  }
};

export const approveStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await User.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your account request has been ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Status changed Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
};
