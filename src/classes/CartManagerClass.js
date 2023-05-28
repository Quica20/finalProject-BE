import fs from "fs";
import { v4 as uuidV4 } from "uuid";

const path = "classes/files/carts.json";

class CartsManager {
    consultCart = async () => {
        console.log("existe", fs.existsSync(path));
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, "utf-8");
            const carts = JSON.parse(data);
            return carts;
        } else {
            return [];
        }
    };

    addToCart = async () => {
        const carts = await this.consultCart();
        carts.push({
            id: uuidV4(),
            products: []
        });
        return await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
    };

    consultCartById = async (id) => {
        const carts = await this.consultCart();
        const cart = carts.find((cart) => {
            return cart.id == id;
        });
        return cart ? cart : "Carrito no encontrado";
    };

    addProductToCart = async (idCart, idProduct) => {
        const cart = await this.consultCartById(idCart);

        const index = cart.products.findIndex((product) => {
            return product.id == idProduct
        })

        if (index == -1) {
            cart.products.push({ id: idCart, quantity: 1 });
        } else {
            cart.products[index].quantity++;
        }

        const carts = await this.consultCart()
        const cartIndex = carts.findeIndex((cartIterador) => {
            return cartIterador.id == cart.id
        })

        carts[cartIndex] = cart

        return await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'))
    };
}

export default CartsManager