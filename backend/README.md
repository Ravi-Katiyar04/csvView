
## Endpoints

### 1. Upload Student and Teacher Files
- **URL:** `/upload-student-teacher`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Request Body:**
  ```json
  {
    "studentFile": "(CSV file)",
    "teacherFile": "(CSV file)"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Both files uploaded and processed successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "success": false,
    "message": "An error occurred while processing the files."
  }
  ```

### 2. Get Students Data
- **URL:** `/getStudentsData`
- **Method:** `GET`
- **Success Response:**
  ```json
  {
    "success": true,
    "studentHeaders": ["name", "age", "grade"],
    "students": [
      {
        "_id": "123456789",
        "name": "John Doe",
        "age": "15",
        "grade": "10"
      }
    ]
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "error fetching employees"
  }
  ```

### 3. Update Student
- **URL:** `/updateStudent/:sid`
- **Method:** `PUT`
- **URL Parameters:** `sid=[string]` (Student ID)
- **Request Body:**
  ```json
  {
    "name": "Updated Name",
    "age": "16",
    "grade": "11"
  }
  ```
- **Success Response:**
  ```json
  {
    "_id": "123456789",
    "name": "Updated Name",
    "age": "16",
    "grade": "11"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "error fetching employees"
  }
  ```

### 4. Get Teachers Data
- **URL:** `/getTeachersData`
- **Method:** `GET`
- **Success Response:**
  ```json
  {
    "success": true,
    "teacherHeaders": ["name", "subject", "department"],
    "teachers": [
      {
        "_id": "987654321",
        "name": "Jane Smith",
        "subject": "Mathematics",
        "department": "Science"
      }
    ]
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "error fetching employees"
  }
  ```

## Notes
- All data is automatically deleted after 24 hours
- CSV files are stored in the `/public/uploads` directory
- Headers are dynamically generated based on CSV file structure
