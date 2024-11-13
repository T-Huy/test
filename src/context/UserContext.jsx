import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const initialUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodeToken = jwtDecode(token);
            return {
                email: decodeToken.email || '',
                userId: decodeToken.userId || '',
                role: decodeToken.roleId || '',
                auth: true,
            };
        }
        return { email: '', userId: '', role: '', auth: false };
    };

    const [user, setUser] = useState(initialUser);

    const loginContext = (email, token) => {
        const decodeToken = jwtDecode(token);
        setUser({
            email: email,
            userId: decodeToken.userId,
            role: decodeToken.roleId,
            auth: true,
        });
        localStorage.setItem('token', token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser((user) => ({
            email: '',
            userId: '',
            role: '',
            auth: false,
        }));
        navigate('/');
        toast.success('Đăng xuất thành công');
    };

    return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
