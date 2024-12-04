import express from 'express';
import { purchaseCourse } from '../controllers/purchaseCourse.controller.js';

const router = express.Router();

router.route('/').get(purchaseCourse);

export default router;
