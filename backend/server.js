import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";

// INFO: Create express app
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// INFO: Middleware
app.use(express.json());
app.use(cors());

// INFO: API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

// INFO: Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// INFO: Start server
app.listen(port, () =>
  console.log(`Server is running on at http://localhost:${port}`)
);
