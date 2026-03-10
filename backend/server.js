const express = require("express");
const colors = require("colors");
require("dotenv").config();
const connectDB = require("./configer/dbconfig");
const cors = require("cors")
const path = require("path")

const app = express();

const PORT = process.env.PORT || 8000

connectDB()
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", (req,res) => {
    res.send("API is Running...")
})


app.use("/admin", require("./routes/admin.Route"));
app.use("/category", require("./routes/category.route"));
app.use("/article", require("./routes/article.route"));
app.use("/user", require("./routes/user.route"));
app.use("/media-type", require("./routes/mediaType.route"));
app.use("/media", require("./routes/media.router"))
app.use("/comment", require("./routes/comment.route"))
app.use("/aboutus", require("./routes/aboutUs.route"))
app.use("/aboutus", require("./routes/aboutUs.route"))
app.use("/contactus", require("./routes/contactUs.routes"))
app.use("/subCategory", require("./routes/subCategory.routes"))
app.use("/terms", require("./routes/terms.routes"))
app.use("/privacy", require("./routes/privacy.routes"));
app.use("/admin-contact", require("./routes/adminContact.routes"));
app.use("/videos", require("./routes/video.routes"));
app.use("/events", require("./routes/event.routes"));
app.use("/payment", require("./routes/payment.routes"))

app.listen(PORT, () => {
  console.log(`Server is running at PORT: http://localhost:${PORT}`.bgBlue.white);
});