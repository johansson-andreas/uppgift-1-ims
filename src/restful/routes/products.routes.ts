import { Router } from "express";
import { productController } from "../controllers/products.controllers";
import { idCheck } from "../middlewares/idCheck";
import { errorHandler } from "../middlewares/errorHandler";

const router = Router();


router.get('/', productController.getProducts);
router.get('/total-stock-value', productController.getTotalStockValue);
router.get('/total-stock-value-by-manufacturer', productController.getTotalStockValueBM);
router.get('/low-stock', productController.getLowStock);
router.get('/critical-stock', productController.getCriticalStock);
router.get('/:id', idCheck, productController.getOneProduct);
router.post('/', productController.createProduct);
router.put('/:id', idCheck, productController.updateProduct);
router.delete('/products/:id', idCheck, productController.deleteProduct);

export default router;