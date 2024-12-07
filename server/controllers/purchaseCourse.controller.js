import SSLCommerzPayment from "sslcommerz-lts";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { CoursePurchase } from "../models/purchesCourse.mode.js";
import { Lecture } from "../models/lecture.model.js";

dotenv.config();

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; // Set to true in production

export const BuyProduct = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.id;

  const course = await Course.findById(courseId);
  if (!course)
    return res
      .status(404)
      .json({ success: false, message: "Course not found!" });
  // console.log(course, " ===================================== \\");

  const user = await User.findById(userId);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found!" });
  // console.log(user);

  const tran_id = new mongoose.Types.ObjectId().toString();

  //create a new course purchase recode
  const newPurchase = new CoursePurchase({
    courseId,
    userId,
    amount: course?.coursePrice,
    status: "pending",
    paymentId: tran_id,
  });

  await newPurchase.save();

  const data = {
    total_amount: course.coursePrice,
    currency: "BDT",
    tran_id,
    success_url: `http://localhost:8000/api/v1/payment/success/${tran_id}`,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: course.courseTitle,
    product_category: course.category,
    product_profile: "general",
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: user.address1 || "dhaka",
    cus_add2: "Dhaka",
    cus_city: user.city || "dhaka",
    cus_state: "Dhaka",
    cus_postcode: user.postcode || "3040",
    cus_country: "Bangladesh",
    cus_phone: user.phone || "0939434",
    cus_fax: user.phone || "234564",
    ship_name: user.name,
    ship_add1: user.address1 || "023434",
    ship_add2: "Dhaka",
    ship_city: user.city || "23454",
    ship_state: "Dhaka",
    ship_postcode: user.postcode || "234343",
    ship_country: "Bangladesh",
  };

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    const GatewayPageURL = apiResponse.GatewayPageURL;
    if (GatewayPageURL) {
      return res.json({ GatewayPageURL }); // Send the GatewayPageURL to frontend
    } else {
      return res.status(400).json({ error: "Failed to initialize payment" });
    }
  } catch (error) {
    console.error("SSLCommerz Init Error:", error);
    return res.status(500).json({ error: "Payment initialization error" });
  }
};

export const HandlerSuccess = async (req, res) => {
  try {
    const paymentId = req.params.tran_id;

    const purchase = await CoursePurchase.findOne({ paymentId: paymentId })
      .populate({ path: "courseId", model: "Course" }) // Populate courseId referencing the Course model
      .populate({ path: "userId", model: "User" }); // Populate userId referencing the User model

    if (!purchase)
      return res
        .status(404)
        .json({ success: false, message: "Purchase not found!" });

    purchase.status = "completed";

    if (!purchase.courseId && purchase.lectures.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: purchase.courseId.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    await purchase.save();

    //update user enrolledCourses
    await User.findByIdAndUpdate(
      purchase.userId,
      { $addToSet: { enrolledCourses: purchase.courseId } },
      { new: true }
    );

    // update course to add User ID to enrolledStudents
    await Course.findByIdAndUpdate(purchase.courseId, {
      $addToSet: { enrolledStudents: purchase.userId },
    });

    // Redirect to the frontend page
    return res.redirect(
      `http://localhost:5173/course-progress/${purchase.courseId._id}`
    );
  } catch (error) {
    console.error("Payment Success Error:", error);
    return res.status(500).json({ error: "Payment Success error" });
  }
};

export const HandlerFail = async (req, res) => {
  try {
    // Redirect to the frontend page
    return res.redirect("http://localhost:5173");
  } catch (error) {
    console.error("Payment Success Error:", error);
    return res.status(500).json({ error: "Payment Success error" });
  }
};

export const getCourseDetailsWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchase = await CoursePurchase.findOne({ userId, courseId });
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found!" });

    return res.status(200).json({
      course,
      purchased: purchase ? true : false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchaseCourse = async (req, res) => {
  try {
    const purchaseCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchaseCourse)
      return res
        .status(404)
        .json({
          success: false,
          purchaseCourses: [],
          message: "purchase Courses not found!",
        });

    return res.status(404).json({
      purchaseCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
