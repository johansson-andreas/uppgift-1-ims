import { Router } from "express";
import { manufacturerController } from "../controllers/manufacturer.controllers";

const router = Router()

router.get("/", manufacturerController.getManufacturer)

export default router;