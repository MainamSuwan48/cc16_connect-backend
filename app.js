require("dotenv").config();
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/error");
const notFound = require("./middlewares/notFound");
const authentication = require("./middlewares/authenticate");
const authRoute = require("./routes/auth-route");
const homeworkRoute = require("./routes/homework-route");
const subjectRoute = require("./routes/subject-route");

const app = express();

//REST
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/homework", homeworkRoute);
app.use("/subject", subjectRoute);

app.use(notFound);
app.use(errorHandler);
let port = process.env.PORT;
app.listen(port, () => console.log("sever is running on port ", port));
