import mongoose from "mongoose";

const student = new mongoose.Schema({
    student_name: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    }
})

export default mongoose.model("Student", student);