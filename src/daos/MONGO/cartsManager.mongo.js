const { cartsModel } = require("../../models/carts.model");

class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
  }

  getCarts = async () => {
    try {
      const carts = await this.model.find({});
      return carts;
    } catch (error) {
      console.log("Error en getCarts:", error);
      return []; 
    }
  };

  getCart = async ({ limit = 2, page = 1, opts = {} } = {}) => {
    try {
      const cart = await this.model.paginate(opts, { limit, page, lean: true });
      return cart;
    } catch (error) {
      console.log("Error en getCart:", error);
      return [];
    }
  };

  createCarts = async (newCarts) => {
    if (!newCarts.code || !newCarts.cant) {
      console.log("Producto incompleto");
      return "Producto incompleto";
    }

    try {
      const cart = await this.model.create(newCarts);
      return cart;
    } catch (error) {
      console.log("Error al crear el carrito:", error);
      return null;
    }
  };

  deleteCarts = async (delCartsId) => {
    try {
      const result = await this.model.findByIdAndDelete(delCartsId);
      if (result) {
        return { message: "Producto eliminado con éxito" };
      } else {
        return { message: "Producto no encontrado" };
      }
    } catch (error) {
      console.log("Error al eliminar el producto:", error);
      return { message: "Error al eliminar el producto" };
    }
  };
}

module.exports = {
  CartsManagerMongo,
};

