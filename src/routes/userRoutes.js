import Express from "express";

import { listUser, createUser } from "../controllers/UserController.js";

const router = Express.Router();

router.get("/", listUser);

router.post("/", createUser);

export default router;