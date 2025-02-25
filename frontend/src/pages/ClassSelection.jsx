
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClassSelection = () => {
    // const [selectedStudent, setSelectedStudent] = useState([])
    const Navigate= useNavigate();

    const handleClassClick = async(className) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getStudentsData`);
            const studentsInClass = response.data.students.filter(student => student.Class === className);
            const header= response.data.studentHeaders;
            
            Navigate('/class-data', { state: { data: studentsInClass , head:header} });

        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const classes = [
        'Nursery', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
    ];

    // console.log(selectedStudent)

    return (
        <div className="h-screen w-screen p-4 bg-sky-200 flex flex-col justify-center gap-4 items-center box-border overflow-x-hidden ">
            <h1 className="font-semibold text-xl">Select a Class</h1>
            <div className="flex justify-center flex-wrap items-center gap-6">
                {classes.map((className) => (
                    <button
                        key={className}
                        className="border-2 border-blue-500 bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-900"
                        onClick={() => handleClassClick(className)}
                    >
                        {className}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default ClassSelection;

