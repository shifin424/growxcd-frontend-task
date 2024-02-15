import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PosRoutes from "./routes/PosRoutes";


function App() {
  return (
    <div className="bg-[#f8f8f8]">
      <Router>
        <Routes>
          <Route path='/*' element={<PosRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;