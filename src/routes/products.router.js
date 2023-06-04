import { Router } from 'express';
import ProductManagerClass from '../classes/ProductManagerClass.js';

const router = Router();

const managerProducts = new ProductManagerClass();

router.get('/', (req, res) => {
    let quantityOfProducts = req.query.quantityOfProducts;
    const products = managerProducts.getProducts();
    //Si no se ingreso nada mostrar todos los productos:
    if (!quantityOfProducts) {
        return res.render('products', {
            products
        })
    } else {
        quantityOfProducts = parseInt(quantityOfProducts) //Convertimos lo solicitado a numero entero
        let requestedProducts = products.slice(0, quantityOfProducts)
        return res.send(requestedProducts)
    }

})

router.get('/:pid', (req, res) => {
    const pid = req.params.pid;
    //Buscamos el producto por id
    const product = managerProducts.getProductById(pid)

    if (!product) {
        return res.send({ error: "No hay ningun producto con ese Id" })
    }
    return res.send(product)
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const product = req.body;

    managerProducts.addProduct(product);
    res.send({ status: 'success' });
})

router.put('/:pid', (req, res) => {
    const pid = req.params.pid;
    const updateBodyProduct = req.body;

    managerProducts.updateProduct(pid, updateBodyProduct);
    res.send({ status: 'success' })
})

router.delete('/:pid', (req, res) => {
    const pid = req.params.pid;

    managerProducts.deleteProduct(pid);
    res.send({ status: 'success' })
})

export default router;