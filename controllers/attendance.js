import attendance from "../models/attendance.js";
import database from "../db.js";
import ExcelJS from "exceljs"

// const attendees = []
export const initializeAttendance = async (req, res) => {
    const { code } = req.params;
    const { lec } = req.body
    const db = await database(code);
    const collection = db.collection("students");
    const newAttendance = new attendance({
        _id: parseInt(lec),
        lecture: parseInt(lec),
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
        // if (e.code === 11000) {
        //     // reupdate attendees 
        //     await attendanceCollection.findOneAndUpdate({ _id: parseInt(lec) }, { $set: { "_id.$.attendees": (await collection.find({}).toArray()).map(stud => JSON.parse(`{ "_id": ${stud._id} }`)) } })
        //         .then(result => {
        //             res.status(409).json({
        //                 status: 409,
        //                 message: "Conflict + Successfully updated",
        //                 data: result
        //             })
        //         })
        // } else {
        console.log(e)
        res.status(401).json({
            status: 401,
            message: "Error",
            code: e.code
        })
        // }
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
                    message: "Successfully attended",
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
    return await attendanceCollection.findOne({ _id: parseInt(lec) }).then(result => {
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
            message: "Cannot fetch",
            code: e.code
        })
    })
}

export const getAllClassAttendance = async (req, res) => {
    const { code } = req.params;
    const db = await database(code);
    const attendanceCollection = db.collection("attendance");
    return await attendanceCollection.find({}).toArray().then(result => {
        console.log(result)
        res.status(200).json({
            status: 200,
            message: "Successfully fetched",
            data: result
        })
    }
    ).catch(e => {
        console.log(e)
        res.status(404).json({
            status: 404,
            message: "Cannot fetch",
            code: e.code
        })
    })
}

export const getAllClassAttendanceTable = async (req, res) => {
    const { code } = req.params;
    const db = await database(code);
    const collection = db.collection("students");
    const attendanceCollection = db.collection("attendance");
    return await attendanceCollection.find({}).toArray().then(async result => {
        const arr = []
        const students = await collection.find({}).toArray()
        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            const row = { _id: student._id }
            for (let j = 0; j < result.length; j++) {
                const d = result[j];
                const attendees = d.attendees
                const present_id = d.lecture + "present"
                for (let k = 0; k < attendees.length; k++) {
                    const clas = attendees[k];
                    if (clas._id === student._id) {
                        row[present_id] = clas.present
                    }
                }
            }
            console.log(row)
            arr.push(row)
        }
        res.status(200).json({
            status: 200,
            message: "Fetched",
            data: arr
        })
    }
    ).catch(e => {
        console.log(e)
        res.status(404).json({
            status: 404,
            message: "Cannot fetch",
            code: e.code
        })
    })
}

export const exportAttendance = async (req, res) => {
    const { code } = req.body;
    const db = await database(code);
    const collection = db.collection("students");
    const attendanceCollection = db.collection("attendance");
    // a workbook that house all worksheets
    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'Toyin Muhammed';
    workbook.lastModifiedBy = 'Toyin Muhammed';
    workbook.created = new Date();
    workbook.modified = new Date();
    await collection.find({}).toArray().then(result => {
        // console.log(result)
        const ws = workbook.addWorksheet("registered_students")
        ws.columns = [
            { header: "Student ID", key: "_id" },
            { header: "Student Name", key: "student_name" }
        ]
        ws.columns.forEach(column => column.width = column.header.length < 12 ? 12 : column.header.length)
        ws.getRow(1).font = { bold: true }
        result.forEach(student => {
            ws.addRow({ ...student })
        })
        ws.views = [
            { state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'A1' }
        ]
    }).catch((e) => {
        console.log(e)
        res.status(405).json({
            status: 405,
            message: "Error! in student export",
            code: e.code
        })
    });
    await attendanceCollection.find({}).toArray().then(async result => {
        const ws = workbook.addWorksheet("attendance")
        const headers = result.map((res) => (
            { header: `lec ${res._id}`, key: `${res._id}present` }
        ))
        const totalHeader = { header: "Total", key: "total" }
        ws.columns = [
            { header: "Student ID", key: "_id" },
            ...headers,
            totalHeader
        ]

        ws.columns.forEach(column => column.width = column.header.length < 12 ? 12 : column.header.length)
        ws.getRow(1).font = { bold: true }

        // add each student record to the worksheet
        const students = await collection.find({}).toArray()
        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            const row = { _id: student._id }
            for (let j = 0; j < result.length; j++) {
                const d = result[j];
                const attendees = d.attendees
                const present_id = d.lecture + "present"
                for (let k = 0; k < attendees.length; k++) {
                    const clas = attendees[k];
                    if (clas._id === student._id) {
                        row[present_id] = clas.present
                    }
                }
            }
            // console.log(row)
            ws.addRow(row)
        }

        // add total
        // ws.getRow(2).


    }).catch(e => {
        console.log(e)
        res.status(405).json({
            status: 405,
            message: "Error! in attendance export",
            code: e.code
        })
    })

    const file = workbook.xlsx.writeBuffer();
    return file.then((f) => {
        const blob = new Blob([f], { type: ".xlsx" })
        // res.status(200).json({
        //     status: 200,
        //     message: "Successfully created!"
        // })
        res.download(blob).json({
            status: 200,
            message: "Successfully created!"
        })
    }).catch(err => {
        console.log(err)
        res.status(409).json({
            status: 409,
            message: "Error!",
            code: err.code
        })
    })

    // return workbook.xlsx.writeFile(`/docs/${code}.xlsx`).then(
    //     res.status(200).json({
    //         status: 200,
    //         message: "Successfully created!"
    //     })
    // ).catch(err => {
    //     console.log(err)
    //     res.status(409).json({
    //         status: 409,
    //         message: "Error!",
    //         code: err.code
    //     })
    // })
}