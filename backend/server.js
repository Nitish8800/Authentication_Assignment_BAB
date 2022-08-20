const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

app.use("/api/user", userRoutes);

// ------------------  Deploy ment           ----------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "productions") {
//   app.use(express.static(path.join(__dirname1, "/client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
//   });
// } else {
app.get("/", (request, response) => {
  response.send("API is Running Sucessfully ");
});

// ------------------  Deploy ment           ----------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server is running on port ${PORT}`.yellow.bold));
