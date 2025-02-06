import doctorModel from "./../model/doctorModel.js";
import appointmentModel from "./../model/appointmentModel.js";

export const doctorProfileInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.find({ userId: req.body.userId });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(201).send({
      success: true,
      message: "Here's the profile",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cant get the doctor data",
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor Profile Updated",
      });
    }
    res.status(201).send({
      success: true,
      message: "Doctor profile didnt updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't fetched",
      error,
    });
  }
};

export const getSingleDoctorController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Single doctor Info not found",
      });
    }
    res.status(201).send({
      success: true,
      message: "Single doctor info fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't fetched",
      error,
    });
  }
};

export const doctorAppointmentController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Single doctor Info not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Doctor Appointment fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't fetched",
      error,
    });
  }
};

export const updateAppointmentStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await User.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "Status updated",
      message: `Your appointment has been ${status}`,
      onClickPath: "/doctor-appointments",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment status updated Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can't fetched",
      error,
    });
  }
};
