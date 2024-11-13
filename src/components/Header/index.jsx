import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Header() {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Đăng xuất thành công');
    };

    return (
        <header>
            <p className="header">Header User</p>
            {user && !user.auth ? <NavLink to="/login">Login</NavLink> : <button onClick={handleLogout}>Logout</button>}
        </header>
    );
}

export default Header;
