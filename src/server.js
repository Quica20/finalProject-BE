import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import routerProducts from './routes/products.router.js';
import routerCart from './routes/cart.router.js';

const app = express(); //instanciamos Express

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + './views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routerProducts)
app.use('/api/cart/', routerCart)

app.listen(8080, () => {
    console.log('servidor levantado')
})