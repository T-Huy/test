import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaUser, FaCalendarAlt, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import pngegg from '../../assets/img/pngegg.png';
import { UserContext } from '~/context/UserContext';

const Sidebar = ({ onSelectTab, selectedTab }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [doctorInfo, setDoctorInfo] = useState({ name: '', image: '', userId: '' });
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const { logout } = useContext(UserContext);

    useEffect(() => {
        // Fetch doctor info from API
        axios
            .get('http://localhost:9000/doctor/8') // Thay thế bằng endpoint của bạn
            .then((response) => {
                const data = response.data;
                if (data.errCode === 0) {
                    setDoctorInfo({
                        name: data.data.fullname,
                        image: data.data.image,
                        userId: data.data.doctorId,
                    });
                }
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching doctor data:', error));
    }, []);

    const handleProfileClick = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        logout();
    };

    console.log('Doctor Info:', doctorInfo);

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            // Gửi yêu cầu PUT tới API để thay đổi mật khẩu
            axios
                .post(
                    'http://localhost:9000/user/update-password',
                    {
                        userId: doctorInfo.userId,
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                        confirmPassword: confirmPassword,
                    },
                    {
                        headers: {
                            access_token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGVJZCI6IlIzIiwiaWF0IjoxNzMxNDc5MDE0LCJleHAiOjE3MzE0ODI2MTR9.zpm7yuaj03_xVXPx5XhiUYoq8_-quD2VgNTnyrWbU6A`,
                        },
                    },
                )
                .then((response) => {
                    const { status, message } = response.data;
                    if (status === 'OK') {
                        alert('Mật khẩu đã được thay đổi thành công');
                        setShowChangePasswordModal(false); // Đóng modal sau khi thành công
                    } else {
                        alert(message); // Hiển thị thông báo lỗi
                    }
                })
                .catch((error) => {
                    console.error('Error changing password:', error);
                    alert('Đã có lỗi xảy ra khi thay đổi mật khẩu');
                });
        } else {
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp');
        }
    };

    const IMAGE_URL = 'http://localhost:9000/uploads/';

    useEffect(() => {
        onSelectTab('overview');
    }, []);
    return (
        <div className="w-fit h-screen bg-white text-black flex flex-col shadow-lg">
            <div className="text-xl font-bold text-center py-6 border-b border-gray-200 flex items-center">
                <img
                    src={pngegg}
                    alt="Logo"
                    className="mx-auto mb-2"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                <div className="ml-4 text-left">
                    <p>EasyMed</p>
                    <small>
                        Chăm sóc sức khỏe, <br /> bảo vệ cuộc sống
                    </small>
                </div>
            </div>

            <div className="flex-1">
                <ul className="space-y-2 mt-4 px-4">
                    <li
                        onClick={() => onSelectTab('overview')}
                        className={`p-3 cursor-pointer flex items-center rounded-md hover:bg-blue-100 ${
                            selectedTab === 'overview' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                        }`}
                    >
                        <FaUser className="mr-3" /> Thông tin cá nhân
                    </li>
                    <li
                        onClick={() => onSelectTab('appointments')}
                        className={`p-3 cursor-pointer flex items-center rounded-md hover:bg-blue-100 ${
                            selectedTab === 'appointments' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                        }`}
                    >
                        <FaCalendarAlt className="mr-3" /> Quản lý Đặt lịch khám
                    </li>
                    <li
                        onClick={() => onSelectTab('schedule')}
                        className={`p-3 cursor-pointer flex items-center rounded-md hover:bg-blue-100 ${
                            selectedTab === 'schedule' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                        }`}
                    >
                        <FaClipboardList className="mr-3" /> Quản lý Lịch làm việc
                    </li>
                </ul>
            </div>

            <div className="px-4 py-6 border-t border-gray-200 relative">
                <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
                    <img
                        // src={doctorInfo.image ? `${IMAGE_URL}${doctorInfo.image}` : pngegg}
                        src={pngegg}
                        alt="Doctor Avatar"
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <p>{doctorInfo.name}</p>
                        <small className="text-gray-500">Doctor</small>
                    </div>
                </div>
                {showMenu && (
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                        <ul>
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => setShowChangePasswordModal(true)}
                            >
                                Đổi mật khẩu
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                                Đăng Xuất
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Modal Đổi Mật Khẩu */}
            {showChangePasswordModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-128">
                        {' '}
                        {/* Thay w-96 thành w-128 để modal rộng hơn */}
                        <h3 className="text-xl font-semibold mb-4">Đổi Mật Khẩu</h3>
                        <div className="mb-4">
                            <label htmlFor="oldPassword" className="block text-sm">
                                Mật khẩu cũ
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm">
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleChangePassword}>
                                Lưu
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-black rounded"
                                onClick={() => setShowChangePasswordModal(false)}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
