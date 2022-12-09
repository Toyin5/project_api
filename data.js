import calculateTotal from "./utils/calculatetotal.js";

const data = [
    {
        "_id": 1,
        "lecture": 1,
        "attendees": [
            {
                "_id": "18045",
                "present": 1,
                "date_stamp": "2022-11-28T02:48:52.983Z"
            },
            {
                "_id": "23056",
                "present": 0,
                "date_stamp": "2022-11-28T02:48:52.983Z"
            },
            {
                "_id": "56780",
                "present": 1,
                "date_stamp": "2022-11-28T02:48:52.983Z"
            }
        ],
        "date_stamp": "2022-11-28T02:48:52.984Z"
    },
    {
        "_id": 2,
        "lecture": 2,
        "attendees": [
            {
                "_id": "18045",
                "present": 0,
                "date_stamp": "2022-12-03T21:16:21.364Z"
            },
            {
                "_id": "23056",
                "present": 0,
                "date_stamp": "2022-12-03T21:16:21.364Z"
            },
            {
                "_id": "56780",
                "present": 1,
                "date_stamp": "2022-12-03T21:16:21.365Z"
            }
        ],
        "date_stamp": "2022-12-03T21:16:21.365Z"
    },
    {
        "_id": 3,
        "lecture": 3,
        "attendees": [
            {
                "_id": "18045",
                "present": 0,
                "date_stamp": "2022-12-03T21:17:32.895Z"
            },
            {
                "_id": "23056",
                "present": 0,
                "date_stamp": "2022-12-03T21:17:32.895Z"
            },
            {
                "_id": "56780",
                "present": 1,
                "date_stamp": "2022-12-03T21:17:32.896Z"
            }
        ],
        "date_stamp": "2022-12-03T21:17:32.896Z"
    },
    {
        "_id": 4,
        "lecture": 4,
        "attendees": [
            {
                "_id": "18045",
                "present": 0,
                "date_stamp": "2022-12-03T21:17:59.994Z"
            },
            {
                "_id": "23056",
                "present": 0,
                "date_stamp": "2022-12-03T21:17:59.994Z"
            },
            {
                "_id": "56780",
                "present": 1,
                "date_stamp": "2022-12-03T21:17:59.995Z"
            }
        ],
        "date_stamp": "2022-12-03T21:17:59.995Z"
    }
]

const students = [
    {
        "_id": "18045",
        "student_name": "Toyin"
    },
    {
        "_id": "23056",
        "student_name": "Fouad"
    },
    {
        "_id": "56780",
        "student_name": "Luqman"
    }
]

// students.forEach(student => {
//     // let toPush = {};
//     data.forEach(att => {
//         const row = { _id: student._id }
//         const attendees = att.attendees
//         const present_id = att.lecture + "present"
//         attendees.forEach(stud => {
//             // console.log(stud)
//             if (stud._id === student._id) {
//                 row[present_id] = stud.present
//                 // Object.assign(row, { : stud.present })
//             }
//             // console.log(row)
//         })
//         console.log(row)
//         // toPush = row
//     })
//     // console.log(toPush)
// })

for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const row = { _id: student._id }
    for (let j = 0; j < data.length; j++) {
        const d = data[j];
        const attendees = d.attendees
        const present_id = d.lecture + "present"
        for (let k = 0; k < attendees.length; k++) {
            const clas = attendees[k];
            if (clas._id === student._id) {
                row[present_id] = clas.present
            }
        }
    }
    row['total'] = calculateTotal(row)
    console.log(row)
}