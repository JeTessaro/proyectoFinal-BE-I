const { Router } = require("express");
const {
  ProductManagerMongo,
} = require("../../daos/MONGO/productsManager.mongo");

const router = Router();
const productService = new ProductManagerMongo();

router.get("/", async (req, res) => {
  try {
    const produtcs = await productService.getProducts();
    res.send({ status: "Success", payLoad: produtcs });
  } catch (error) {
    console.log(error);
  }
});

router.post("/post", async (req, res) => {
  try {
    const { body } = req;
    const response = await productService.createProduct(body);
    res.send({ status: "Success", payLoad: response });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productService.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error del servidor");
  }
});

router.put("/:pid", async (req, res) => {
  try {
    res.send("Put ID de Productos");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    res.send("Delete ID de Productos");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
