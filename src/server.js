import express from 'express';
import routerProducts from './routes/products.router.js';
import routerCart from './routes/cart.router.js';

const app = express(); //instanciamos Express


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products/', routerProducts)
app.use('/cart/', routerCart)

app.listen(8080, () => {
    console.log('servidor levantado')
})