import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using Mock Payment (Bypassing Razorpay/Stripe)
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            payment: true, // Mocking success
            status: 'Order Placed',
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Optional: Clear user cart after order
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Listing all orders for Admin Panel
const listOrders = async (req, res) => {
    try {
        // Make sure you have the '=' and the 'await orderModel.find({})'
        const orders = await orderModel.find({}); 
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body; // userId comes from authUser middleware

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, listOrders, userOrders };