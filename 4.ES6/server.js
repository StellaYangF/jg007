const express = require('express');  // 1) npm init -y    2) npm install express
const server = express(); // 创建服务器
const html = require("./2.ejs.js");

server.get("/", (req,res) => {
  res.send(html);
})
server.listen(3000,() => {console.log("Server starts at 3000, press Ctrl + C.")});