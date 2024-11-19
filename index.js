const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit'); 
const authRouter = require('./routers/authRouter');

const app = express();


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	message: "Too many requests, please try again later.",
	standardHeaders: true, 
	legacyHeaders: false,
  });
  
  // Apply the rate limiting middleware globally
  app.use(limiter);

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.use('/api/auth',authRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
    });

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});