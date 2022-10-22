import mongoose from "mongoose";

const attendance = new mongoose.Schema({
    lecture: {
        type: Number,
        required: true
    },
    attendees: [{
        student_id: String,
        present: { type: Number(0 || 1), default: 0 }
    }],
    date_stamp: { type: Date, default: Date.now }
})

export default mongoose.model("Attendance", attendance); 