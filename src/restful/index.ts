import { Router } from "express";
import ProductRouter from "./routes/products.routes";
import ManufacturerRouter from "./routes/manufacturers.routes";
import { errorHandler } from "./middlewares/errorHandler"

const router = Router();

router.use("/products/", ProductRouter)
router.use("/manufacturer/", ManufacturerRouter)
router.use(errorHandler);

export default router;