const { Router } = require("express");
const { CartsManagerMongo } = require("../../daos/MONGO/cartsManager.mongo");

const router = Router();
const cartsService = new CartsManagerMongo();

// Obtener todos los carritos
router.get("/", async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.send({ status: "Success", payLoad: carts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Error al obtener los carritos" });
  }
});

// Crear un nuevo carrito
router.post("/post", async (req, res) => {
  try {
    const { body } = req;
    const response = await cartsService.createCarts(body);
    if (response) {
      res.send({ status: "Success", payLoad: response });
    } else {
      res.status(400).send({ status: "Error", message: "Producto incompleto" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Error al crear el carrito" });
  }
});

// Obtener un carrito por ID (implementación futura)
// router.get("/:cid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const cart = await cartsService.getCartById(cartId);
//     if (cart) {
//       res.json(cart);
//     } else {
//       res.status(404).send({ status: "Error", message: "Carrito no encontrado" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ status: "Error", message: "Error del servidor" });
//   }
// });

// Actualizar un carrito por ID (implementación futura)
// router.put("/:cid", async (req, res) => {
//   try {
//     // Lógica para actualizar un carrito
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ status: "Error", message: "Error al actualizar el carrito" });
//   }
// });

// Eliminar un carrito por ID
router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const result = await cartsService.deleteCarts(cartId);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", message: "Error al eliminar el carrito" });
  }
});

module.exports = router;
