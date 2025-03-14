var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TaskService from "../services/TaskService.js";
class TaskController {
    static getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield TaskService.getAllTasks();
                res.render("index", { tasks });
            }
            catch (error) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    static getTasksJson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield TaskService.getAllTasks();
                res.json(tasks);
            }
            catch (error) {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    static createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield TaskService.createTask(req.body);
                res.status(201).json({ message: "Task created successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating task" });
            }
        });
    }
    static updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const completed = req.body.completed === "true";
                yield TaskService.updateTask(req.params.id, completed);
                res.status(200).json({ message: "Task updated" });
            }
            catch (error) {
                res.status(500).json({ message: "Error updating task" });
            }
        });
    }
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield TaskService.deleteTask(req.params.id);
                res.status(200).json({ message: "Task deleted" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting task" });
            }
        });
    }
}
export default TaskController;
