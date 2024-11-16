import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import DoctorLayout from '~/layouts/DoctorLayout';
import DoctorDashBoard from '~/pages/Doctor/DoctorDashboard';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
import { Fragment } from 'react';
import DoctorInfo from '~/pages/Doctor/DoctorInfo';
import AppointmentManagement from '~/pages/Doctor/AppointmentManagement';
import WorkScheduleManagement from '~/pages/Doctor/WorkScheduleManagement';
function DoctorRoutes() {
    const { user } = useContext(UserContext);

    return (
        <Fragment>
            <Route
                path="/doctor"
                element={
                    <PrivateRoute isAllowed={!!user && user.role.includes('R2')} redirectPath="/404">
                        <DoctorLayout />
                    </PrivateRoute>
                }
            >
                {/* <Route index element={<DoctorDashBoard />} /> */}
                {/* <Route path="dashboard" element={<DoctorDashBoard />} /> */}
                <Route index element={<Navigate to="profile" />} /> {/* Mặc định: Thông tin cá nhân */}
                <Route path="profile" element={<DoctorInfo />} /> {/* Thông tin cá nhân */}
                <Route path="manage" element={<AppointmentManagement />} /> {/* Quản lý lịch hẹn */}
                <Route path="schedule" element={<WorkScheduleManagement />} /> {/* Quản lý lịch làm việc */}
            </Route>
        </Fragment>
    );
}
export default DoctorRoutes;
