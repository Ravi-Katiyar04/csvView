import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const TeachersTable = ({ headers, teachers }) => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setSelectedTeacher(null);
            }
        };

        if (selectedTeacher) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedTeacher]);

    const showDetails = (teacher) => {
        setSelectedTeacher(teacher);
    };

    return (
        <div className="p-4">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        {headers.map((header, index) => (
                            <th key={index} className="py-3 px-6 text-left">{header}</th>
                        ))}
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {teachers.map((teacher, index) => (
                        // <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                        //     {Object.values(teacher).map((value, idx) => (
                        //         <td key={idx} className="py-3 px-6 text-left">{value}</td>
                        //     ))}
                        //     <td className="py-3 px-6 text-left">
                        //         <button 
                        //             onClick={() => showDetails(teacher)} 
                        //             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                        //         >
                        //             Show Details
                        //         </button>
                        //     </td>
                        // </tr>
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{teacher.Teacher_ID}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{teacher.Name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{teacher.Phone_Number}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => showDetails(teacher)} className="text-indigo-600 border-2 px-3  py-1 font-bold rounded-lg hover:text-white hover:bg-green-600">Show Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedTeacher && (
                <div ref={formRef} className="m-4 p-4 bg-white border border-gray-200 rounded-xl fixed left-0 bottom-0 shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Teacher Details</h3>
                    <ul className="list-disc list-inside">
                        {Object.entries(selectedTeacher).map(([key, value], index) => (
                            <li key={index} className="mb-1">
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

TeachersTable.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TeachersTable;
