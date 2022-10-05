const express = require("express");
const productRouter = express.Router();
const Container = require("./productContainer");

const productos = new Container();

const checkIfValid = (req, res, next) => {
    try {
        const {nombre, precio, url: imagen} = req.body;
        if (!nombre || !precio || !imagen) {
            throw({Error: "Forma del producto invalida. Debe contener los campos: 'nombre', 'precio', 'url'."});
        }
        res.locals.product = {nombre, precio, imagen};
        next();
    } catch (e) {
        res.send(e);
    }
}
productRouter.get("/", async (req, res) => {
    try {
        res.send(await productos.cargar_productos());
    } catch (e) {
        res.send(e);
    }
});

productRouter.get("/:id", async (req, res) => {
    try {
        res.send(await productos.cargarProducto(req.params.id));
    } catch (e) {
        res.send(e)
    }
});

productRouter.post("/", checkIfValid, async (req, res) => {
    try {
        const producto = res.locals.product;
        res.send(await productos.guardar_producto(producto));
    } catch (e) {
        res.send(e)
    }
});

productRouter.delete("/:id", async (req, res) => {
    try {
        res.send(await productos.borrarProducto(req.params.id));
    } catch (e) {
        res.send(e);
    }
});

productRouter.post("/deleteAll", async (req, res) => {
    try {
        await productos.borrarTodo();
        res.statusText = "Success";
        res.status(200);
        res.send(res.statusText);
    } catch (e) {
        res.send(e);
    }
});

module.exports = productRouter;