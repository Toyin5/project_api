import express from "express"
import { registerCourse, getCourses, deleteAllCourses, logCourse } from "../controllers/course.js";

export const courseRouter = express.Router();

courseRouter.post("/register/course", registerCourse);
courseRouter.get("/get/courses", getCourses);
courseRouter.post("/delete", deleteAllCourses);
courseRouter.post("/course/login", logCourse);