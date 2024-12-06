import express from 'express';
import { BuyProduct, HandlerSuccess } from '../controllers/purchaseCourse.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post("/",isAuthenticated ,BuyProduct)
router.post("/success/:tran_id", HandlerSuccess)


export default router;


