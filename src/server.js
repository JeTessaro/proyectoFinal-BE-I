const express = require('express')
const handlebars = require('express-handlebars')
const appRouter = require('./router/index.js')
const { connectDB } = require('./config/index.js')
const path = require('path')
const http = require('http');
const { Server } = require('socket.io');
const { ProductManagerMongo } = require('./daos/MONGO/productsManager.mongo.js')
const mongoose = require('mongoose');

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log('eEscuchando en el puerto : ', PORT);
})

const ioMiddleware = (io) => (req, res, next) => {
    res.io = io;
    next();
}

const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + 'public'))
connectDB()



// motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(appRouter)


// Definición de la función productSocket antes de usarla
const productSocket = (io) => {
    io.on('connection', async (socket) => {
        console.log('Nuevo cliente conectado');
        const { getProducts, createProducts } = new ProductManagerMongo();
        const products = await getProducts();
        socket.emit('productList', products);

        socket.on('addProduct', async (data) => {
            await createProducts(data);
            const updatedProducts = await getProducts();
            io.emit('productList', updatedProducts);
        });
        // Manejar la eliminación de productos
        socket.on('deleteProduct', async (id) => {
            try {
                const productId = new mongoose.Types.ObjectId(id);
                const productManager = new ProductManagerMongo();
                const response = await productManager.deleteProducts(productId);
                console.log(response.message);
                const updatedProducts = await productManager.getProducts();
                io.emit('productList', updatedProducts);
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                socket.emit('error', { message: 'Error al eliminar el producto' });
            }
        });



    });
};

productSocket(io)