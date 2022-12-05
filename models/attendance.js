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
        present: { type: Number, default: 0 }
    }],
    // attendees: [String],
    date_stamp: { type: Date, default: Date.now }
})

export default mongoose.model("Attendance", attendance); 