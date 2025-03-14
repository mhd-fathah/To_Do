import Task,{ITask} from "../models/Task.js";
import { TaskRequestModel } from "../models/TaskRequestModel.js";
import { TaskResponseModel } from "../models/TaskResponseModel.js";

class TaskService {
    async getAllTasks(): Promise<TaskResponseModel[]> {
        try {
            const tasks: ITask[] = await Task.find();
            return tasks.map(task => ({
                id: String(task._id),
                title: task.title,
                completed: task.completed,
                createdAt: task.createdAt
            }));
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Could not fetch tasks");
        }
    }

    async createTask(taskData: TaskRequestModel): Promise<TaskResponseModel> {
        try {
            if (!taskData.title) {
                throw new Error("Task title is required");
            }

            const task = new Task(taskData);
            await task.save();

            return {
                id: String(task._id),
                title: task.title,
                completed: task.completed,
                createdAt: task.createdAt
            };
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error("Could not create task");
        }
    }

    async updateTask(id: string, completed: boolean): Promise<TaskResponseModel | null> {
        try {
            const updatedTask = await Task.findByIdAndUpdate(
                id,
                { completed },
                { new: true } 
            );

            if (!updatedTask) {
                throw new Error("Task not found");
            }

            return {
                id: String(updatedTask._id),
                title: updatedTask.title,
                completed: updatedTask.completed,
                createdAt: updatedTask.createdAt
            };
        } catch (error) {
            console.error("Error updating task:", error);
            throw new Error("Could not update task");
        }
    }

    async deleteTask(id: string): Promise<void> {
        try {
            const deletedTask = await Task.findByIdAndDelete(id);
            if (!deletedTask) {
                throw new Error("Task not found");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            throw new Error("Could not delete task");
        }
    }
}

export default new TaskService();