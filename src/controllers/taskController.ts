import { Request, Response } from "express";
import TaskService from "../services/TaskService.js";

class TaskController {
    static async getAllTask(req: Request, res: Response) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.render("index", { tasks });
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
    static async getTasksJson(req: Request, res: Response) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async createTask(req: Request, res: Response) {
        try {
            await TaskService.createTask(req.body);
            res.status(201).json({ message: "Task created successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error creating task" });
        }
    }
    static async updateTask(req: Request, res: Response) {
        try {
            const completed = req.body.completed === "true"; 
            await TaskService.updateTask(req.params.id, completed);
            res.status(200).json({ message: "Task updated" });
        } catch (error) {
            res.status(500).json({ message: "Error updating task" });
        }
    }
    

    static async deleteTask(req: Request, res: Response) {
        try {
            await TaskService.deleteTask(req.params.id);
            res.status(200).json({ message: "Task deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting task" });
        }
    }
}

export default TaskController;