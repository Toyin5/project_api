import express from "express"
import { exportAttendance, getAllClassAttendance, getAllClassAttendanceTable, getClassAttendance, initializeAttendance, markAttendance } from "../controllers/attendance.js";
export const attendanceRouter = express.Router();

attendanceRouter.post("/attendance/initialize/:code", initializeAttendance);
attendanceRouter.post("/attendance/mark/:code/:lec", markAttendance);
attendanceRouter.get("/attendance/get/class/:code/:lec", getClassAttendance);
attendanceRouter.get("/attendance/get/attendance/:code", getAllClassAttendance);
attendanceRouter.get("/attendance/export/class", exportAttendance);
attendanceRouter.get("/attendance/table/class/:code", getAllClassAttendanceTable);