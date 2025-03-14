import { Router } from "express";
import TaskController from "../controllers/taskController.js";

const router = Router();

router.get("/", TaskController.getAllTasks);
router.get("/tasks", TaskController.getTasksJson);
router.post("/tasks", TaskController.createTask);
router.put("/tasks/:id", TaskController.updateTask);
router.delete("/tasks/:id",TaskController.deleteTask)

export default router;