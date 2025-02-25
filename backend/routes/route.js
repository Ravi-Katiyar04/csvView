import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import multer from "multer";
import csvParser from "csv-parser";
import mongoose from "mongoose";
import fs from "fs";

const Router = express();

Router.use(bodyParser.urlencoded({ extended: true }));

Router.use(express.static(path.resolve('public')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

let StudentDynamicModel = {};
let teacherDynamicModel = {};
var studentHeaders = [];  // To store Student CSV headers
var teacherRecords = [];  // To store Teacher CSV records

Router.post("/upload-student-teacher", upload.fields([{ name: "studentFile" }, { name: "teacherFile" }]), async (req, res) => {
    try {
        const studentFilePath = req.files["studentFile"]?.[0]?.path;
        const teacherFilePath = req.files["teacherFile"]?.[0]?.path;

        if (!studentFilePath || !teacherFilePath) {
            return res.status(400).json({ success: false, message: "Both Student and Teacher CSV files are required." });
        }


        // Function to process CSV file and create a dynamic model
        const processCSV = async (filePath, modelName) => {
            return new Promise((resolve, reject) => {
                const headers = [];
                const records = [];

                const stream = fs.createReadStream(filePath).pipe(csvParser());

                stream.on("headers", async (headerList) => {
                    headers.push(...headerList);

                    if (!headerList.length) return reject("Invalid CSV file");

                    // Define a dynamic schema
                    const schemaDefinition = {};
                    headers.forEach((header) => {
                        schemaDefinition[header] = { type: String }; // Defaulting all fields to String
                    });

                    schemaDefinition.createdAt = {
                        type: Date,
                        default: Date.now,
                        expires: 86400, // Auto-delete in 24 hours
                    };

                    // Set dynamic model name
                    const DynamicModel = mongoose.model(modelName, new mongoose.Schema(schemaDefinition));

                    // Read data and insert into MongoDB
                    stream.on("data", (row) => records.push(row));
                    stream.on("end", async () => {
                        await DynamicModel.insertMany(records);



                        // Store headers and records in variables
                        if (modelName.includes("Student")) {
                            studentHeaders = [...headers]; // Store Student headers                           
                            StudentDynamicModel = DynamicModel;

                        }
                        if (modelName.includes("Teacher")) {
                            teacherRecords = [...records]; // Store Teacher records
                            teacherDynamicModel = DynamicModel;
                        }

                        resolve(`Data inserted into ${modelName}`);
                    });
                    stream.on("error", reject);
                });
            });
        };

        // Process both Student and Teacher CSV files
        await Promise.all([
            processCSV(studentFilePath, `DynamicStudentModel_${Date.now()}`),
            processCSV(teacherFilePath, `DynamicTeacherModel_${Date.now()}`),
        ]);


        console.log(StudentDynamicModel);
        console.log(teacherDynamicModel);

        res.json({
            success: true,
            message: "Both files uploaded and processed successfully",
        });
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while processing the files." });
    }
});


Router.get('/getStudentsData', async (req, res) => {
    StudentDynamicModel.find()
        .then(students => res.json({ success: true, studentHeaders, students }))
        .catch(err => res.status(400).json({ error: "error fetching employees" + err }));
});

Router.put('/updateStudent/:sid', async (req, res) => {
    StudentDynamicModel.findByIdAndUpdate(
        req.params.sid,
        req.body,
        { new: true }
    )
        .then(student => res.json(student))
        .catch(err => res.status(400).json({ error: "error fetching employees" + err }));
});

Router.get('/getTeachersData', async (req, res) => {
    teacherDynamicModel.find()
        .then(teachers => res.json({ success: true, teacherRecords, teachers }))
        .catch(err => res.status(400).json({ error: "error fetching employees" + err }));
});

export default Router;