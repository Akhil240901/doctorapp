import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "PhoneNumber is required"],
    },
    address: {
      type: String,
    },
    specialization: {
      type: String,
      required: [true, "Enter your Specialization"],
    },
    website: {
      type: String,
    },
    timing: {
      type: Object,
      required: [true, "Timing is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    feePerConsultation: {
      type: Number,
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("Doctor", doctorSchema);

export default doctorModel;
