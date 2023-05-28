//Este modulo sirve para leer y escribir en archivos. (require es para cargar modulos de Node.js)
import fs from 'fs';
import { v4 as uuidV4 } from 'uuid';

const directoryPath = "src/classes/files";
const path = `${directoryPath}/products.json`;

class ProductManagerClass {
    constructor() {
        this._products = [];
        this.uploadingFile();
    }

    //Try va a intentar hacer lo que esta adentro, y sino va hacer lo que esta en catch
    uploadingFile() {
        try {
            const data = fs.readFileSync(path, 'utf-8');
            this._products = JSON.parse(data);
        } catch (error) {
            console.error(`Error al cargar los productos desde el archivo: ${error}`);
        }
    }

    save() {
        try {
            fs.writeFileSync(path, JSON.stringify(this._products));
        } catch (error) {
            console.error(`Error al guardar los productos en el archivo: ${error}`);
        }
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Todos los campos son requeridos');
            return;
        }

        if (this._products.some((product) => product.code === code)) {
            console.error('Ya existe un producto con el mismo código');
            return;
        }

        const product = {
            id: uuidV4(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this._products.push(product);
        this.save();
        console.log('se ha agregado un nuevo Producto')
    }

    getProducts() {
        return this._products;
    }

    getProductById(id) {
        const product = this._products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            console.error(`No exise el producto con el siguiente id:${id}`);
        }
    }
    //el metodo .findIndex busca el indice indicado
    updateProduct(id, updateFields) {
        const productIndex = this._products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.error(`No exise el producto con el siguiente id:${id}`);
            return;
        }
        this._products[productIndex] = { ...this._products[productIndex], ...updateFields };
        this.save();
    }

    deleteProduct(id) {
        const productIndex = this._products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.error(`No exise el producto con el siguiente id:${id}`);
            return;
        }
        this._products.splice(productIndex, 1);
        this.save();
    }
}

export default ProductManagerClass