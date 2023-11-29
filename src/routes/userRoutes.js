import Express from "express";

import { listAllUsers, getUserById, getUserByEmail, createUser, updateUser, destroyUser } from "../controllers/UserController.js";

const router = Express.Router();

router.get("/", listAllUsers);

router.get("/:id", getUserById);

router.get("/email/:email", getUserByEmail);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", destroyUser);

export default router;