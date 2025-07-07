import express from "express";
import { getSnapshots } from "./getHandler";
import { createSnapshot } from "./postHandler";
import { updateSnapshot } from "./putHandler";
import { deleteSnapshot } from "./deleteHandler";

const router = express.Router();

// Routes
router.get("/", getSnapshots);
router.post("/", createSnapshot);
router.put("/", updateSnapshot);
router.delete("/", deleteSnapshot);

export default router;
