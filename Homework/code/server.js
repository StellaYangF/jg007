let express = require("express");
let server = express();
server.get("/jsonp", (req, res) => {
    let { callback } = req.query;
    res.send({ code: 200, data: { name: "Tom" } })
        // res.send(callback + "({name:'叶飞', age: 18})");
})

server.listen(3000, () => console.log("Server started at 3000..."))