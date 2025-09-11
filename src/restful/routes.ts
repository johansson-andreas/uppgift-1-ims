import { Router } from "express";
import { createProduct } from "./controllers/products";

const router = Router();


// router.get('/products',);
// router.get('/products/total-stock-value',);
// router.get('/products/total-stock-value-by-manufacturer',);
// router.get('/products/low-stock',);
// router.get('/products/critical-stock',);
// router.get('/manufacturers',);
// router.get('/products/:id',);
router.post('/products', createProduct);
// router.put('/products/:id',);
// router.delete('/products/:id', );


export default router;