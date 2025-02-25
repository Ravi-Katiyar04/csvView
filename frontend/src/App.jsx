import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ClassSelectionAndData from "./pages/ClassSelectionAndData"


const App = () => {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class-selection" element={<ClassSelectionAndData />} />
      </Routes>
    </div>
  )
}
    
export default App
