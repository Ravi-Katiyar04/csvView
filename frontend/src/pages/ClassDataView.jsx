
import { useLocation } from "react-router-dom";
import Table from "../components/Table";

const ClassDataPage = () => {
    const location = useLocation();
    const selectedStudents = location.state?.data || []; // Ensure fallback for undefined state
    const head = location.state?.head || []; // Ensure fallback for undefined state
    console.log(head)
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Class Data</h1>
            {selectedStudents.length > 0 ? (
                <Table students={selectedStudents} headers={head}/>  // Passing the array to Table component
            ) : (
                <p>No students found for this class.</p>
            )}
        </div>
    );
};

export default ClassDataPage;


