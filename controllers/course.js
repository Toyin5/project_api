import course from "../models/course.js";
import database from "../db.js";
import bcrypt from "bcrypt";
export const registerCourse = async (req, res) => {
    const db = await database();
    const collection = db.collection("courses");
    const { name, code, password, lecturer_name } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newCourse = new course({
        course_name: name,
        _id: code,
        password: await bcrypt.hash(password, salt),
        lecturer_name: lecturer_name
    })

    await collection.insertOne(newCourse).then((result) => {
        res.status(200).json({
            status: 200,
            message: "Successfully registered",
            data: result.acknowledged + result.insertedId
        })
        database(code)
            .then(() => {
                console.log("Successfully created " + code + "database")
            })
            .catch(err => console.log("Error " + err))
    }).catch((e) => {
        console.log(e)
        res.status(402).json({
            status: 402,
            message: "Error",
            code: e.code
        })
    })
}

export const getCourses = async (req, res) => {
    const db = await database();
    const collection = db.collection("courses");

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

export const deleteAllCourses = async (req, res) => {
    const db = await database();
    const collection = db.collection("courses");

    await collection.deleteMany({}).then(
        res.status(200).json({
            status: 200,
            message: "Success",
        })
    ).catch(err => console.log(err))
}

export const logCourse = async (req, res) => {
    const { code, pass } = req.body
    const db = await database();
    const collection = db.collection("courses");

    await collection.findOne({
        _id: code
    }).then(result => {
        console.log(result.password);
        bcrypt.compare(pass, result.password, (err, same) => {
            if (!!err) {
                res.status(400).json({ status: 400, message: "Error decrypting", token: "NO TOKEN" })
            } else
                (same)
                    ?
                    res.status(200).json(
                        { status: 200, message: "Logged", token: result }
                    )
                    : res.status(404).json({ status: 404, message: "Incorrect Password", token: pass });
        })
    }).catch(e => {
        console.log(e)
        res.status(404).json({
            status: 404,
            message: "Course not registered",
            token: code
        })
    })
}