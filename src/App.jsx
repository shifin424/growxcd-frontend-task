import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PosRoutes from "./routes/PosRoutes";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/*' element={<PosRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;