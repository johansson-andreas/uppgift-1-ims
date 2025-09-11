import { Router } from "express";
import { manufacturerController } from "../controllers/manufacturer";

const router = Router()

router.get("/", manufacturerController.getManufacturer)

export default router;