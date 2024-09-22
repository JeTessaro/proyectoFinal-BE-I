const { productModel } = require("../../models/products.model");

class ProductManagerMongo {
  constructor() {
    this.model = productModel;
  }

  //Mostramos todos los productos de la BD
  getProducts = async () => {
    try {
      const products = await this.model.find({});
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Mostramos todos los productos de la BD con paginación
  getProductos = async ({ limit = 2, page = 1, opts = {} } = {}) => {
    try {
      const products = await this.model.paginate(opts, { limit, page, lean: true });
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Mostramos productos selecciondos por ID
  getProductById = async (id) => {
    try {
      return await this.model.findOne({ _id: id });
    } catch (error) {
      console.log("Error en getProduct:", error);
      return null;
    }
  };

  //Creamos un producto en la BD
  createProducts = async (addProduct) => {
    if (
      !addProduct.title ||
      !addProduct.code ||
      !addProduct.price ||
      !addProduct.stock ||
      !addProduct.category ||
      !addProduct.thumbnail
    ) {
      console.log("Producto incompleto");
      return "Producto incompleto";
    }

    try {
      const product = await this.model.create(addProduct);
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //Modificamos un producto por ID
  updateProducts = async (modProduct) => {
    try {
      const updatedProduct = await this.model.findByIdAndUpdate(
        modProduct.id,
        modProduct,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //Eliminamos un poroducto por ID
  deleteProducts = async (delProductId) => {
    try {
      const result = await this.model.findByIdAndDelete(delProductId);
      if (result) {
        return { message: "Producto eliminado con éxito" };
      } else {
        return { message: "Producto no encontrado" };
      }
    } catch (error) {
      console.log(error);
      return { message: "Error al eliminar el producto" };
    }
  };
}

module.exports = {
  ProductManagerMongo,
};
