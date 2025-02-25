# CSV Viewer Application

A full-stack web application for uploading and managing CSV data for students and teachers.

## Project Structure

```
csvView/
├── backend/
│   ├── app.js             # Express app configuration
│   ├── server.js          # Server entry point
│   ├── db/
│   │   └── db.js         # Database connection setup
│   ├── routes/
│   │   └── route.js      # API routes
│   ├── public/
│   │   └── uploads/      # CSV file storage
│   └── README.md         # Backend documentation
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── StudentTable.jsx    # Student data grid
    │   │   └── TeachersTable.jsx   # Teacher data grid
    │   ├── pages/
    │   │   ├── Home.jsx            # File upload page
    │   │   └── ClassSelectionAndData.jsx # Data view page
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    ├── index.html
    └── README.md         # Frontend documentation
```

## Prerequisites

- Node.js >= 18.x
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd csvView
```

2. Backend Setup:
```bash
cd backend
npm install -y
npm install express
npm install dotenv cors
npm install body-parser
npm install csvtojson
npm install multer
```

Create a `.env` file in the backend directory:
```env
PORT=3000
DB_URL=mongodb://localhost:27017/csvViewer
```

3. Frontend Setup:
```bash
cd frontend
npm create vite@latest
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Create a `.env` file in the frontend directory:
```env
VITE_BASE_URL=http://localhost:3000
```

## Running the Application

1. Start the Backend:
```bash
cd backend
npm nodemon
```

2. Start the Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Features

- CSV file upload for student and teacher data
- Dynamic data model creation based on CSV structure
- Class-wise student data viewing
- Teacher information display
- Real-time data editing capabilities
- Auto-cleanup of data after 24 hours

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /upload-student-teacher | Upload CSV files for students and teachers |
| GET | /getStudentsData | Retrieve all student data |
| GET | /getTeachersData | Retrieve all teacher data |
| PUT | /updateStudent/:sid | Update student information |

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (file upload)

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request


