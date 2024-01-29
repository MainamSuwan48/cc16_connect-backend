require("dotenv").config();
const cors = require('cors');
const express = require("express");
const errorHandler = require("./middlewares/error");
const notFound = require("./middlewares/notFound");

const authRoute = require("./routes/auth-route")

const app = express();

//REST
app.use(cors());
app.use(express.json());

app.use('/auth',authRoute);

app.use(notFound);
app.use(errorHandler);
let port = process.env.PORT;
app.listen(port, () => console.log("sever is running on port ", port));
