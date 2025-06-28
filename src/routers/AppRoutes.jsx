import { Routes, Route } from "react-router-dom";
import HomePages from "../components/pages/home";
import MainLayouts from "../components/Layouts/MainLayouts";
import LoginPages from "../components/pages/login";
import AboutPages from "../components/pages/about";

export default function AppRoutes(){
    return(
        <Routes>
            <Route element={<MainLayouts/>}>
            <Route path='/' element={<HomePages/>}/>
            <Route path='/login' element={<LoginPages/>}/>
            </Route>
        </Routes>
    )
}