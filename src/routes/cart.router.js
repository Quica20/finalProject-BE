import { Router } from "express";
import CartsManager from "../classes/CartManagerClass.js"

const router = Router();
const managerCarts = new CartsManager();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const cart = await managerCarts.consultCartById(id);
    res.send(cart);
});

router.get("/", async (req, res) => {
    const carts = await managerCarts.consultCart();
    res.send(carts);
});

router.post("/", async (req, res) => {
    await managerCarts.addToCart();
    res.send({ status: "success" });
});

router.post('/"cartid/products/:productid', async (req, res) => {
    const cartId = req.params.cartid;
    const productid = req.params.productid;

    await managerCarts.addProductToCart(cartId, productid)

    res.send({ status: "success" })
})

export default router;