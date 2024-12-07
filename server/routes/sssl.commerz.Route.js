import express from 'express';
import { BuyProduct, getAllPurchaseCourse, getCourseDetailsWithPurchaseStatus, HandlerSuccess } from '../controllers/purchaseCourse.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post("/",isAuthenticated ,BuyProduct)
router.post("/success/:tran_id", HandlerSuccess)

router.get("/course/:courseId/details-with-status",isAuthenticated, getCourseDetailsWithPurchaseStatus)
router.get("/", getAllPurchaseCourse)


export default router;


