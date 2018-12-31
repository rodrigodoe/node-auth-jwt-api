const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
mongoose.set("debug", true);

mongoose.connect(
  config.mongoURI,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

const PORT = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(PORT);
console.log("Server Listenning on PORT " + PORT);
