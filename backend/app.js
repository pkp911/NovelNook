const bp = require("body-parser");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
// app.use(cors());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent and received
  })
);
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://panprashant123:Nishu${encodeURIComponent(
      "@"
    )}1997@cluster0.zdxam.mongodb.net/BookStore?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"));

const bookRoute = require("./routes/booksRoutes");
const userModels = require("./routes/userRoutes");
app.use("/api/v1", bookRoute);
app.use("/api/v1", userModels);

app.listen(1000, () => {
  console.log("Server is running on port 1000");
});
