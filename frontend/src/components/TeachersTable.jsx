import { useState } from 'react';
import PropTypes from 'prop-types';

const TeachersTable = ({ headers, teachers }) => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const showDetails = (teacher) => {
        setSelectedTeacher(teacher);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher, index) => (
                        <tr key={index}>
                            {Object.values(teacher).map((value, idx) => (
                                <td key={idx}>{value}</td>
                            ))}
                            <td>
                                <button onClick={() => showDetails(teacher)}>Show Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedTeacher && (
                <div>
                    <h3>Teacher Details</h3>
                    <ul>
                        {Object.entries(selectedTeacher).map(([key, value], index) => (
                            <li key={index}>
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
