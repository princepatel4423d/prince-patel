// scripts/createAdmin.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import AdminModel from "../models/adminModel.js"; // <-- update path if needed

// ====== CONFIG ======
const adminName = "Prince Patel";
const adminEmail = "admin@example.com";
const adminPassword = "Admin@123";  // Change when using
// ====================

const createAdmin = async () => {
  try {
    // Connect MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    const alreadyExists = await AdminModel.findOne({ email: adminEmail });

    if (alreadyExists) {
      console.log("⚠ Admin already exists:", adminEmail);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = await AdminModel.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
    });

    console.log("🎉 Admin created successfully!");
    console.log("➡ Name:", newAdmin.name);
    console.log("➡ Email:", newAdmin.email);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();