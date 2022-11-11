import attendance from "../models/attendance.js";
import database from "../db.js";

// const attendees = []
export const initializeAttendance = async (req, res) => {
    const { code } = req.params;
    const { lec } = req.body
    const db = await database(code);
    const collection = db.collection("students");
    const newAttendance = new attendance({
        _id: lec,
        lecture: lec,
        attendees: (await collection.find({}).toArray()).map(stud => JSON.parse(`{ "_id": ${stud._id} }`))
    })
    const attendanceCollection = db.collection("attendance");
    await attendanceCollection.insertOne(newAttendance).then(result => {
        res.status(200).json({
            status: 200,
            message: "Successfully initialized",
            data: result.acknowledged + result.insertedId
        })
    }).catch(e => {
        console.log(e)
        res.status(402).json({
            status: 402,
            message: "Error",
            code: e.code
        })
    })
}

export const markAttendance = async (req, res) => {
    const { code, lec } = req.params;
    const { id } = req.body
    const db = await database(code);
    const collection = db.collection("students");
    const attendanceCollection = db.collection("attendance");
    await collection.findOne({ _id: id }).then(async result => {
        console.log(result)
        console.log(lec)
        //First Attempt
        console.log(code)
        console.log(lec)
        if (result) {
            await attendanceCollection.updateOne(
                { _id: parseInt(lec), "attendees._id": result._id }, { $set: { "attendees.$.present": 1 } }
            ).then(result => {
                console.log(result)
                res.status(200).json({
                    status: 200,
                    message: "Successfully updated",
                    data: result.acknowledged + result.upsertedId
                })
            }).catch(e => {
                console.log(e)
                res.status(402).json({
                    status: 402,
                    message: "Error",
                    code: e.code
                })
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Not Found. Student not registered",
                code: result
            })
        }
    }).catch(e => {
        console.log(e)
        res.status(404).json({
            status: 404,
            message: "Not Found. Student not registered",
            code: e.code
        })
    })

}

export const getClassAttendance = async (req, res) => {
    const { code, lec } = req.params;
    const db = await database(code);
    const attendanceCollection = db.collection("attendance");
    return await attendanceCollection.findOne({ _id: lec }).then(result => {
        console.log(result)
        res.status(200).json({
            status: 200,
            message: "Successfully fetched",
            data: result.attendees
        })
    }
    ).catch(e => {
        console.log(e)
        res.status(404).json({
            status: 404,
            message: "Not Found. Student not registered",
            code: e.code
        })
    })
}