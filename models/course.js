import mongoose from "mongoose";

const course = new mongoose.Schema({
    course_name: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lecturer_name: {
        type: String
    }
})

export default mongoose.model("Courses", course);