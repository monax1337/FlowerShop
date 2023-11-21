import { Navigate, Route, Routes } from "react-router";
import Flowers from "../Pages/Flowers";
import Login from "../Pages/Login";
import Admin from "../Pages/Admin";
import { useContext } from "react";
import { AuthContext } from "../Contexts";
import Cart from "../Pages/Cart";

const AppRouter = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/flowers" element={<Flowers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            {isAuth && <Route path="/admin" element={<Admin />} />}
            {isAuth && <Route path="*" element={<Admin />} />}
            <Route path="/" element={<Navigate to="/flowers" />} />
            <Route path="*" element={<Flowers />} />
        </Routes>

    );
};

export default AppRouter;