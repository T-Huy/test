import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import DoctorLayout from '~/layouts/DoctorLayout';
import DoctorDashBoard from '~/pages/Doctor/DoctorDashboard';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
import { Fragment } from 'react';
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
                <Route index element={<DoctorDashBoard />} />
                {/* <Route path="dashboard" element={<DoctorDashBoard />} /> */}
            </Route>
        </Fragment>
    );
}
export default DoctorRoutes;
