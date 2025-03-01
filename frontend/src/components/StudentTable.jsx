
import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const StudentTable = ({ className }) => {
    const [editingStudent, setEditingStudent] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [students, setStudents] = useState([]);
    const [sid, setSid] = useState(null);
    const [formData, setFormData] = useState({
        Roll_Number: '',
        Name: '',
        Class: '',
        Phone_Number: ''
    });
    const [loading, setLoading] = useState(true);

    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setEditingStudent(null);
            }
        };

        if (editingStudent) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editingStudent]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/updateStudent/${sid}`, formData);
            console.log(response.data);
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student._id === sid ? { ...student, ...formData } : student
                )
            );
        } catch (error) {
            console.log(error);
        }
        setEditingStudent(null);
    }, [sid, formData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getStudentsData`);
                const studentsInClass = response.data.students.filter(student => student.Class === className);

                setStudents(studentsInClass);
                setHeaders(response.data.studentHeaders);
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [className]);

    const handleEditClick = (student) => {
        if (confirm("Are you sure you want to edit this data?")) {
            setSid(student._id);
            setEditingStudent(student);
            setFormData(student);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{student.Roll_Number}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.Name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.Class}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.Phone_Number}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleEditClick(student)} className="text-indigo-600 border-2 px-3 rounded-lg hover:text-white hover:bg-red-700">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingStudent && (
                <form ref={formRef} onSubmit={handleSubmit} className="fixed left-0 bottom-0 bg-white p-4 shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Roll Number</label>
                        <input type="number" name="Roll_Number" value={formData.Roll_Number} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="text" name="Name" value={formData.Name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Class</label>
                        <input type="text" name="Class" value={formData.Class} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                        <input type="text" name="Phone_Number" value={formData.Phone_Number} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
                </form>
            )}
        </div>
    );
};

StudentTable.propTypes = {
    className: PropTypes.string.isRequired,
};

export default StudentTable;
