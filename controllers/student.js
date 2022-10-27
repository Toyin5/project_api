import student from "../models/student.js";
import database from "../db.js";
export const registerStudent = async (req, res) => {
	const {code} = req.params
	const { name, id} = req.body;
    const db = await database(code);
    const collection = db.collection("students");
    const newStudent = new student({
        _id: id,
        student_name: name
    })

    await collection.insertOne(newStudent).then((result) => {
        res.status(200).json({
            status: 200,
            message: "Successfully registered",
            data: result.acknowledged + result.insertedId
        })
    }).catch((e) => {
        console.log(e)
        if (e.code === 11000) {
            res.status(409).json({
                status: 409,
                message: "Student already registered",
                id: id
            })
        } else {
            res.status(401).json({
                status: 401,
                message: "Error",
                code: e.code
            })
        }
    })
}

export const getStudents = async (req, res) => {
    const { code } = req.params;
    const db = await database(code);
    const collection = db.collection("students");
    await collection.find({}).toArray().then((result) => {
        res.status(200).json({
            status: 200,
            message: "Success",
            data: result
        })
    }).catch(err => {
        console.log(err)
        res.status(403).json({
            status: 403,
            message: err
        })
    })
}
