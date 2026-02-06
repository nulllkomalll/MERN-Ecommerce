import express from 'express';
// Add 'userOrders' to your imports from the controller
import { placeOrder, listOrders, userOrders } from '../controllers/orderController.js'; 
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin Route
orderRouter.get('/list', adminAuth, listOrders);

// User Route
orderRouter.post('/place', authUser, placeOrder);
// ADD THIS LINE BELOW
orderRouter.post('/userorders', authUser, userOrders); 

export default orderRouter;