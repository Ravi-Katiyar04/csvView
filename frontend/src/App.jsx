import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ClassSelection from "./pages/ClassSelection"
import ClassDataView from "./pages/ClassDataView"



const App = () => {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class-selection" element={<ClassSelection />} />
        <Route path="/class-data" element={<ClassDataView />} />
      </Routes>
    </div>
  )
}
    
export default App
