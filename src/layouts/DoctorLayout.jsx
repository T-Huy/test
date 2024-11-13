import { Outlet} from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';

function DoctorLayout() {
    console.log('đi vào DoctorLayout');
    const { logout } = useContext(UserContext);
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {/* <header>
                Header doctor
                <button onClick={handleLogout}>Logout</button>
            </header> */}
            <main>
                <Outlet />
            </main>
            {/* <footer>Footer doctor</footer> */}
        </>
    );
}

export default DoctorLayout;
