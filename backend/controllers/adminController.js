import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      speciality,
      email,
      password,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !speciality ||
      !email ||
      !password ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // CHECKING WHETHER THE EMAIL IS VALID OR NOT
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // CHECKING WHETHER THE ENTERED PASSWORD IS STRONG OR NOT
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //  HASHING DOC PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // UPLOAD IMAGE TO CLOUDINARY
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // CONVERTING ADDRESS STRING TO OBJECT
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL ||
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      return res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API TO GET ALL DOCTORS FOR ADMIN PANEL 
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({success : true, doctors})
  } catch (error) {
    console.log(error)
    res.json({success : false, message : error.message})
  }
}

export { addDoctor, adminLogin, allDoctors };
