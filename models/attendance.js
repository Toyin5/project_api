import mongoose from "mongoose";

const attendance = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    lecture: {
        type: Number,
        required: true
    },
    attendees: [{
        _id: String,
        present: { type: Number, default: 0 },
        date_stamp: { type: Date, default: Date.now }
    }],
    date_stamp: { type: Date, default: Date.now }
})

export default mongoose.model("Attendance", attendance); 