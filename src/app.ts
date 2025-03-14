import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(),"src", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public"))); 

app.use("/", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
