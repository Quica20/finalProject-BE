import { Router } from 'express';
import ProductManagerClass from '../classes/ProductManagerClass.js';
import handlebars from 'express-handlebars'
import __dirname from '../utils.js';
import path from 'path'

const router = Router();

router.engine('handlebars', handlebars.engine());
router.set('views', __dirname + '/src/views');
router.set('view engine', 'handlebars');

const managerProducts = new ProductManagerClass();

router.get('/', (req, res) => {
    let quantityOfProducts = req.query.quantityOfProducts;
    const products = managerProducts.getProducts();
    //Si no se ingreso nada mostrar todos los productos:
    if (!quantityOfProducts) {
        return res.render('products', {
            product: products
        }
        )
    } else {
        quantityOfProducts = parseInt(quantityOfProducts) //Convertimos lo solicitado a numero entero
        let requestedProducts = products.slice(0, quantityOfProducts)
        return res.send(requestedProducts)
    }

})

router.get('/:productId', (req, res) => {
    const productId = req.params.productId;
    //Buscamos el producto por id
    const product = managerProducts.getProductById(productId)

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

router.put('/:productId', (req, res) => {
    const idProduct = req.params.productId;
    const updateBodyProduct = req.body;

    managerProducts.updateProduct(idProduct, updateBodyProduct);
    res.send({ status: 'success' })
})

router.delete('/:idProduct', (req, res) => {
    const idProduct = req.params.idProduct;

    managerProducts.deleteProduct(idProduct);
    res.send({ status: 'success' })
})

export default router