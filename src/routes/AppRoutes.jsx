import { Routes, Route } from 'react-router-dom';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Page404 from '~/pages/Page404';
import AdminRoutes from '~/routes/AdminRoutes';
import DoctorRoutes from '~/routes/DoctorRoutes';
import HomeLayout from '~/layouts/HomeLayout';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                {AdminRoutes()}
                {DoctorRoutes()}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
