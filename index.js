import express from "express"
import bodyParser from "body-parser"
import cors from "cors";
import database from "./utils/db.js";
import { courseRouter } from "./routes/courses.js";
import { studentRouter } from "./routes/student.js";
import { attendanceRouter } from "./routes/attendance.js";

const app = express();
const port = 3300;

database("attendance")

app.use(cors())
app.use(express.json())
app.use(bodyParser.raw());
app.use("/api", courseRouter)
app.use("/api", studentRouter)
app.use("/api", attendanceRouter)


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
