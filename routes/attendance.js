import express from "express"
import { getClassAttendance, initializeAttendance, markAttendance } from "../controllers/attendance.js";
export const attendanceRouter = express.Router();

attendanceRouter.post("/attendance/:code", initializeAttendance)
attendanceRouter.post("/attendance/:code/:lec", markAttendance)
attendanceRouter.get("/attendance/get/class", getClassAttendance);