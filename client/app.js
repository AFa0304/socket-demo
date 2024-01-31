const express = require("express");
const engine = require("ejs-locals");
const path = require("path");
const app = express();

app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use((req, res, next) => {
    console.log("這是global middleware", req.path);
    res.locals.title = "socket demo";
    next();
});

function middleware(req, res, next) {
    console.log("這是/ middleware");
    next();
}

// 放在有路徑的第二個參數
app.get("/", middleware, (req, res) => {
    res.render("index", { title: "socket demo - home" });
});
//404
app.use((req, res, next) => {
    res.status(404).send("404 Oops! 找不到網頁！");
});

//500
app.use((err, req, res, next) => {
    res.status(500).send("500 程式錯誤，請聯繫 IT 人員協助！");
});

const port = process.env.port || 3000;
app.listen(port);
