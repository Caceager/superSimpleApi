const express = require("express");
const productRouter = require("./productRouter");
const {json} = require("express");
const bodyParser = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/productos", productRouter);
app.listen(3000, () => {
    console.log("\nServidor iniciado en el puerto 3000");
})