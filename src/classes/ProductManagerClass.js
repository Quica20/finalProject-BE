//Este modulo sirve para leer y escribir en archivos. (require es para cargar modulos de Node.js)
import fs from 'fs';
import { v4 as uuidV4 } from 'uuid';

const directoryPath = "./src/classes/files";
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

    addProduct({ title, description, price, thumbnails, code, stock }) {
        try {
            if (!title || !description || !price || !thumbnails || !code || !stock) {
                throw new Error('Todos los campos son requeridos')
            };

            if (this._products.some((product) => product.code === code)) {
                throw new Error('Ya existe un producto con el mismo código')
            };

            const product = {
                id: uuidV4(),
                title,
                description,
                price,
                thumbnails,
                code,
                stock,
            };

            this._products.push(product);
            this.save();
            console.log('se ha agregado un nuevo Producto')

        } catch (error) {
            console.error('Error al agregar el producto', error.message)
        }
    };

    getProducts() {
        return this._products;
    }

    getProductById(id) {
        try {
            const product = this._products.find((product) => product.id === id); //Preguntar como manejar este error
            if (!product) {
                throw new Error(`No exise el producto con el siguiente id:${id}`);
            } else {
                return product
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error.message)
        }
    }

    //el metodo .findIndex busca el indice indicado
    updateProduct(id, updateFields) {
        try {
            const productIndex = this._products.findIndex((product) => product.id === id);
            if (productIndex === -1) {
                throw new Error(`No exise el producto con el siguiente id:${id}`);
                return;
            }
            this._products[productIndex] = { ...this._products[productIndex], ...updateFields };
            this.save();

        } catch (error) {
            console.error('Error al actualizar producto', error.message)
        }
    };

    deleteProduct(id) {
        try {
            const productIndex = this._products.findIndex((product) => product.id === id);
            if (productIndex === -1) {
                throw new Error(`No exise el producto con el siguiente id:${id}`);
                return;
            }
            this._products.splice(productIndex, 1);
            this.save();
        } catch (error) {
            console.error('Error al eliminar producto', error.message)
        }
    }
};

export default ProductManagerClass