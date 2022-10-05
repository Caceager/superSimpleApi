const path = require("path");
const fs = require("fs");
const http = require("http");
const jsonPath = path.resolve("./productos.json");
const notFoundError = {Error: "Producto no encontrado."};
const readJson = async() => {
    return JSON.parse(await fs.promises.readFile(jsonPath, "utf-8"));
}
const writeJson = async(json) => {
    const stringifiedJson = JSON.stringify(json);
    await fs.promises.writeFile(jsonPath, stringifiedJson);
}
class Container {
    constructor() {
        this.getLastId();
    }
    async guardar_producto(producto){
        const id = Number(await this.getLastId())
        producto = {
            ...producto,
            id,
        }
        const productos = await readJson();
        productos.push(producto);
        await writeJson(productos);
        return producto;
    }
    async cargar_productos(){
        return await readJson();
    }

    async cargarProducto(id){
        const productos = await readJson();
        const producto = productos.find( (producto) => Number(producto.id) === Number(id));
        if (!producto) throw notFoundError;

        return producto;
    }
    async borrarProducto(id) {
        const productos = await readJson();
        const index = productos.findIndex( (producto) => Number(producto.id) === Number(id));
        if (index < 0) {
            throw (notFoundError);
        }

        productos.splice(index, 1);
        await writeJson(productos);
        return { Success: "Producto borrado" };
    }
    async getLastId() {
        const productos = await readJson();
        const lastProduct = productos[productos.length-1];
        return lastProduct?.id + 1 || 1;
    }

    async borrarTodo() {
        await writeJson([]);
    }
}

module.exports = Container;