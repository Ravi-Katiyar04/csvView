# Frontend Documentation

## API Endpoints & Routes

### Base URL Configuration
```javascript
VITE_BASE_URL=http://localhost:3000
```

## Available Routes

### 1. Home Page
- **Route:** `/`
- **Component:** `Home.jsx`
- **Purpose:** File upload interface for student and teacher CSV files
- **Example Usage:**
```javascript
navigate("/");
```

### 2. Class Selection Page
- **Route:** `/class-selection`
- **Component:** `ClassSelectionAndData.jsx`
- **Purpose:** View and manage student/teacher data
- **Example Usage:**
```javascript
navigate("/class-selection");
```

## API Integration Examples

### 1. Upload Files
```javascript
const formData = new FormData();
formData.append("studentFile", studentFile);
formData.append("teacherFile", teacherFile);

const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload-student-teacher`, formData);
```

**Success Response:**
```json
{
    "success": true,
    "message": "Both files uploaded and processed successfully"
}
```

### 2. Fetch Students Data
```javascript
const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getStudentsData`);
```

**Success Response:**
```json
{
    "success": true,
    "studentHeaders": ["Roll_Number", "Name", "Class", "Phone_Number"],
    "students": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "Roll_Number": "101",
            "Name": "John Doe",
            "Class": "10",
            "Phone_Number": "1234567890"
        }
    ]
}
```

### 3. Update Student Data
```javascript
const response = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/updateStudent/${studentId}`, 
    {
        "Roll_Number": "102",
        "Name": "Jane Doe",
        "Class": "10",
        "Phone_Number": "9876543210"
    }
);
```

**Success Response:**
```json
{
    "_id": "507f1f77bcf86cd799439011",
    "Roll_Number": "102",
    "Name": "Jane Doe",
    "Class": "10",
    "Phone_Number": "9876543210"
}
```

### 4. Fetch Teachers Data
```javascript
const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getTeachersData`);
```

**Success Response:**
```json
{
    "success": true,
    "teacherHeaders": ["Teacher_ID", "Name", "Phone_Number"],
    "teachers": [
        {
            "_id": "507f1f77bcf86cd799439012",
            "Teacher_ID": "T101",
            "Name": "Jane Smith",
            "Phone_Number": "1234567890"
        }
    ]
}
```

## Component Structure

### Main Components
1. `App.jsx` - Root component with route definitions
2. `Home.jsx` - File upload interface
3. `ClassSelectionAndData.jsx` - Data display and management
4. `StudentTable.jsx` - Student data grid component
5. `TeachersTable.jsx` - Teacher data grid component

## Error Handling

All API requests include error handling:
```javascript
try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/endpoint`);
    // Handle success
} catch (error) {
    console.error('Error:', error);
    // Handle error
}
```

## Notes
- All data is stored temporarily (24-hour expiration)
- Files are validated for CSV format
- Both student and teacher files must be uploaded together
- Real-time data updates for student information
- Responsive design for all screen sizes
