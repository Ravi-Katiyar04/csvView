import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const Table = ({ headers, students, onEdit }) => {
    const [editingStudent, setEditingStudent] = useState(null);
    const [formData, setFormData] = useState({
        Roll_Number: '',
        Name: '',
        Class: '',
        Phone_Number: ''
    });

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

    const handleEditClick = (student) => {
        if (confirm("Are you sure you want to edit this data?")) {
            setEditingStudent(student);
            setFormData(student);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(formData);
        setEditingStudent(null);
    };

    return (
        <div>
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
                    <div>
                        <label>Roll Number</label>
                        <input type="number" name="Roll_Number" value={formData.Roll_Number} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Name</label>
                        <input type="text" name="Name" value={formData.Name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Class</label>
                        <input type="text" name="Class" value={formData.Class} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input type="text" name="Phone_Number" value={formData.Phone_Number} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2">Save</button>
                </form>
            )}
        </div>
    );
};

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    students: PropTypes.arrayOf(
        PropTypes.shape({
            Roll_Number: PropTypes.number.isRequired,
            Name: PropTypes.string.isRequired,
            Class: PropTypes.string.isRequired,
            Phone_Number: PropTypes.string.isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default Table;

