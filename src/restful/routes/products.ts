import { Router } from "express";
import { productController } from "../controllers/products";

const router = Router();


router.get('/', productController.getProducts);
router.get('/total-stock-value', productController.getTotalStockValue);
router.get('/total-stock-value-by-manufacturer', productController.getTotalStockValueBM);
router.get('/low-stock', productController.getLowStock);
router.get('/critical-stock', productController.getCriticalStock);
router.get('/:id',productController.getOneProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
// router.delete('/products/:id', );


export default router;