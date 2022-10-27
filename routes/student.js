import express from "express"
import { registerStudent, getStudents } from "../controllers/student.js";

export const studentRouter = express.Router();

studentRouter.post("/register/student/:code", registerStudent);
studentRouter.get("/get/students/:code", getStudents);
