import express from "express"
import { exportAttendance, getClassAttendance, initializeAttendance, markAttendance } from "../controllers/attendance.js";
export const attendanceRouter = express.Router();

attendanceRouter.post("/attendance/initialize/:code", initializeAttendance)
attendanceRouter.post("/attendance/mark/:code/:lec", markAttendance)
attendanceRouter.get("/attendance/get/class/:code/:lec", getClassAttendance);
attendanceRouter.get("/attendance/export/class", exportAttendance);