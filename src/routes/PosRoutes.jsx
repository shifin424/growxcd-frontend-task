import { Route, Routes } from "react-router-dom";
import NotFountPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";


const PosRoutes = () => {
    return (
        <div >
            <Routes>


                <Route path="/" element={<HomePage />}></Route>


                <Route path='/*' element={<NotFountPage />}></Route>
            </Routes>



        </div>
    )
}

export default PosRoutes;