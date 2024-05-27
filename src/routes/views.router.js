import { Router } from "express";
import productModel from "../dao/models/products.model.js";

const router = Router();

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {});

});

router.get("/products", async (req, res) => {
  try {
    let page = parseInt(req.query.page)
    if(!page) page = 1

    let options = { page, limit: 5, lean: true }
    let result = await productModel.paginate({}, options)

    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : null;
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : null;
    
    result.isValid = result.totalPages ? page > 0 && page <= result.totalPages : true;
    res.render('products', result)

  } catch (error) {
    console.error ("Error al obtener los productos: ", error)
    res.status(500).json({ status: "error", message: "Error interno del servidor"})
  }
})

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params
  
  try {
    const product = await productModel.findById(pid).lean()
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    res.render("productDetail", { product })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al obtener el producto" })
  }
})

export default router;
