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
        <header className="w-full h-[57px] md:sticky top-0 bg-white z-[1000] border-b border-b-slate-100 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 mr-auto p-4">
                <span className="text-2xl font-bold">
                    <span className="text-green-500">You</span>
                    <span className="text-blue-600">Med</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="bg-white absolute z-[100] top-0 right-0 left-0 transition transform origin-top-right h-screen lg:flex lg:h-auto overflow-scroll lg:overflow-visible lg:relative hidden">
                <a href="#" className="hover:text-blue-600">
                    Đặt khám
                </a>
                <a href="#" className="hover:text-blue-600">
                    Tư vấn trực tuyến
                </a>
                <a href="#" className="hover:text-blue-600">
                    Store
                </a>
                <a href="#" className="hover:text-blue-600">
                    Tin Y tế
                </a>
                <a href="#" className="hover:text-blue-600">
                    Dành cho nhân viên Y tế
                </a>
            </nav>

            {/* Login Button */}
            <div className="inline-flex space-x-3 items-center">
                {user && !user.auth ? (
                    <>
                        <NavLink
                            to="/login"
                            className="border border-blue-500 text-blue-600 px-4 py-1 rounded hover:bg-blue-100"
                        >
                            Đăng nhập
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="border border-blue-500 text-blue-600 px-4 py-1 rounded hover:bg-blue-100"
                        >
                            Đăng kí
                        </NavLink>
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </header>
    );
}

export default Header;
