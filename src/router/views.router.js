const { Router } = require('express')
const { ProductManagerMongo } = require("../daos/MONGO/productsManager.mongo");

const router = Router()

router.get('/', (req, res) => {    
    res.render('index', {})
})

router.get('/productos', async (req, res) => {    
    const productService = new ProductManagerMongo()
    const { limit, pageNum } =  req.query
    try {
        const {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        } = await productService.getProductos({limit, page: pageNum})

        res.render('products', {
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        })
    } catch (error) {
        console.log(error)
    }   
})

router.get('/home', (req, res) => {
    const productService = new ProductManagerMongo()
    const products = productService.getProductos()
    res.render('home', {products})
})

router.get('/realtimeproducts', async (req, res) => {        
   
        res.render('realtimeproducts', {})
    
})
router.get('/carts', async (req, res) => {
    const productService = new ProductManagerMongo()
    const { limit, pageNum } =  req.query
    try {
        const {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        } = await productService.getProductos({limit, page: pageNum})

        res.render('carts', {
            products: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        })
    } catch (error) {
        console.log(error)
    }   
})

module.exports = router