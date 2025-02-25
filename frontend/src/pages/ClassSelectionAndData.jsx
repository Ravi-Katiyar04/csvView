
// import { useState } from "react";
// import axios from "axios";
// import StudentTable from "../components/StudentTable";

// const ClassSelectionAndData = () => {
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [students, setStudents] = useState([]);
//     const [headers, setHeaders] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const classes = ['Nursery', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

//     const handleClassClick = async (className) => {
//         setSelectedClass(className);
//         setLoading(true);

//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getStudentsData`);
//             const studentsInClass = response.data.students.filter(student => student.Class === className);

//             setStudents(studentsInClass);
//             setHeaders(response.data.studentHeaders);
//         } catch (error) {
//             console.error('Error fetching students:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="h-full w-full min-h-screen min-w-screen p-4 bg-sky-200 flex flex-col justify-center gap-4 items-center">
//             {/* Class Selection */}
//             {!selectedClass ? (
//                 <>
//                     <h1 className="font-semibold text-xl">Select a Class</h1>
//                     <div className="flex justify-center flex-wrap items-center gap-6">
//                         {classes.map((className) => (
//                             <button
//                                 key={className}
//                                 className="border-2 border-blue-500 bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-900"
//                                 onClick={() => handleClassClick(className)}
//                             >
//                                 {className}
//                             </button>
//                         ))}
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     {/* Loading Indicator */}
//                     {loading ? (
//                         <p className="text-lg font-semibold">Loading data...</p>
//                     ) : (
//                         <>
//                             <button className="text-xl font-bold">Class {selectedClass} Data</button>
//                             {students.length > 0 ? (
//                                 <StudentTable students={students} headers={headers} />
//                             ) : (
//                                 <p>No students found for this class.</p>
//                             )}
//                             <button 
//                                 className="mt-4 border-2 border-red-500 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
//                                 onClick={() => setSelectedClass(null)} // Reset selection
//                             >
//                                 Back to Class Selection
//                             </button>
//                         </>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ClassSelectionAndData;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import StudentTable from "../components/StudentTable";
// import TeachersTable from "../components/TeachersTable";

// const ClassSelectionAndData = () => {
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [students, setStudents] = useState([]);
//     const [teachers, setTeachers] = useState([]);
//     const [headers, setHeaders] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const classes = ['Nursery', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

//     const handleClassClick = async (className) => {
//         setSelectedClass(className);
//         setLoading(true);

//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getStudentsData`);
//             const studentsInClass = response.data.students.filter(student => student.Class === className);

//             setStudents(studentsInClass);
//             setHeaders(response.data.studentHeaders);
//         } catch (error) {
//             console.error('Error fetching students:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const fetchTeachers = async () => {
//             try {
//                 const AllTeacher = await axios.get(`${import.meta.env.VITE_BASE_URL}/getTeachersData`);
//                 setTeachers(AllTeacher);
//             } catch (error) {
//                 console.error('Error fetching teachers:', error);
//             }
//         };

//         fetchTeachers();
//     }, [])
    

//     return (
//         <div className="h-full w-full min-h-screen min-w-screen p-4 bg-sky-200 flex flex-col justify-center gap-4 items-center">
//             {/* Class Selection */}
//             {!selectedClass ? (
//                 <>
//                     <h1 className="font-semibold text-xl">Select a Class</h1>
//                     <div className="flex justify-center flex-wrap items-center gap-6">
//                         {classes.map((className) => (
//                             <button
//                                 key={className}
//                                 className="border-2 border-blue-500 bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-900"
//                                 onClick={() => handleClassClick(className)}
//                             >
//                                 {className}
//                             </button>
//                         ))}
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     {/* Loading Indicator */}
//                     {loading ? (
//                         <p className="text-lg font-semibold">Loading data...</p>
//                     ) : (
//                         <>
//                             <button className="text-xl font-bold">Class {selectedClass} Data</button>
//                             {students.length > 0 ? (
//                                 <StudentTable students={students} headers={headers} />
//                             ) : (
//                                 <p>No students found for this class.</p>
//                             )}
//                             <button 
//                                 className="mt-4 border-2 border-red-500 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
//                                 onClick={() => setSelectedClass(null)} // Reset selection
//                             >
//                                 Back to Class Selection
//                             </button>
//                         </>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ClassSelectionAndData;

