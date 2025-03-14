import mongoose, { Schema } from "mongoose";
const TaskSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Task", TaskSchema);
