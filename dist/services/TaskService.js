var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Task from "../models/Task.js";
class TaskService {
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield Task.find();
                return tasks.map(task => ({
                    id: String(task._id),
                    title: task.title,
                    completed: task.completed,
                    createdAt: task.createdAt
                }));
            }
            catch (error) {
                console.error("Error fetching tasks:", error);
                throw new Error("Could not fetch tasks");
            }
        });
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!taskData.title) {
                    throw new Error("Task title is required");
                }
                const task = new Task(taskData);
                yield task.save();
                return {
                    id: String(task._id),
                    title: task.title,
                    completed: task.completed,
                    createdAt: task.createdAt
                };
            }
            catch (error) {
                console.error("Error creating task:", error);
                throw new Error("Could not create task");
            }
        });
    }
    updateTask(id, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTask = yield Task.findByIdAndUpdate(id, { completed }, { new: true });
                if (!updatedTask) {
                    throw new Error("Task not found");
                }
                return {
                    id: String(updatedTask._id),
                    title: updatedTask.title,
                    completed: updatedTask.completed,
                    createdAt: updatedTask.createdAt
                };
            }
            catch (error) {
                console.error("Error updating task:", error);
                throw new Error("Could not update task");
            }
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTask = yield Task.findByIdAndDelete(id);
                if (!deletedTask) {
                    throw new Error("Task not found");
                }
            }
            catch (error) {
                console.error("Error deleting task:", error);
                throw new Error("Could not delete task");
            }
        });
    }
}
export default new TaskService();
