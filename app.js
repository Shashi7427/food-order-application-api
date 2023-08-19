require("dotenv").config();
require("express-async-errors");
// express

const express = require("express");
const app = express();



// rest of the packages
// const fileUpload = require('express-fileupload');
// const morgan = require('morgan');

const cookieParser = require("cookie-parser");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

app.use(cors({
  origin: "*" // Replace with the allowed origin(s)
}));


//Swagge
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')

// mongoSanitize is a JavaScript library used to sanitize user input and prevent NoSQL injection attacks specifically in MongoDB databases.
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");

// const orderRouter = require("./routes/orderRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// By enabling proxy trust with app.set('trust proxy', 1);, Express is configured to
// handle requests properly when your application is hosted behind a proxy server. This ensures that the client's IP address is correctly identified and can be accessed through the req.ip property in your routes or middleware.
app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 600,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());

// process.env.JWT_SECRET contains a secret key that is used to sign and verify cookies. 
// For example, you can access a specific cookie using req.cookies.cookieName. You can also set
//  new cookies using the res.cookie() method within your route handlers.
app.use(cookieParser(process.env.JWT_SECRET));

// app.use(express.static("./public"));
// app.use(fileUpload());
app.get('/', (req, res) => {
  res.send('<h1>Food Order Application API</h1><a href="/api-use">Documentation</a>');
});

app.use('/api-use',swaggerUI.serve,swaggerUI.setup(swaggerDoc));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/orders", orderRouter);                                                               
app.use("/api/v1/products", productRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
