import Home from '../pages/Home';
import Login from '../pages/Login';
import DoctorDashboard from '../pages/DoctorDashboard/DoctorDashboard';
//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/doctor', component: DoctorDashboard }
];

//Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
