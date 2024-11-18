import { Routes, Route } from 'react-router-dom';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Page404 from '~/pages/Page404';
import AdminRoutes from '~/routes/AdminRoutes';
import DoctorRoutes from '~/routes/DoctorRoutes';
import HomeLayout from '~/layouts/HomeLayout';
import DoctorInfo from '~/pages/User/DoctorInfo';
import UserDashboard from '~/pages/User/UserDashboard';
import UserProfile from '~/pages/User/UserProfile';
import PatientRecords from '~/pages/User/PatientRecords';
import AppointmentManagement from '~/pages/User/AppointmentManagement';
import UserRoutes from './UserRoutes';
import AllDoctor from '~/pages/User/AllDoctor';
import ChoosePatientRecord from '~/pages/User/ChoosePatientRecords';
import ConfirmInfomation from '~/pages/User/ConfirmInfomation';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/bac-si" element={<AllDoctor />} />
                    <Route path="/bac-si/get" element={<DoctorInfo />} />
                    <Route path="/bac-si/get/record" element={<ChoosePatientRecord />} />
                    <Route path="/bac-si/get/record/confirm" element={<ConfirmInfomation />} />

                    {/* <Route path="/user" element={<UserDashboard />} /> */}
                    {/* <Route path="/user/profile" element={<UserProfile />} />
                    <Route path="/user/appointments" element={<AppointmentManagement />} />
                    <Route path="/user/records" element={<PatientRecords />} /> */}
                </Route>
                {AdminRoutes()}
                {DoctorRoutes()}
                {UserRoutes()}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
