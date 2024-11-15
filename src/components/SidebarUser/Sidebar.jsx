import React, { useState } from 'react';
import { FaUser, FaClipboardList, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ onSelectTab, selectedTab }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleProfileClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="w-fit h-screen bg-white text-black flex flex-col shadow-lg">
            {/* Tab List */}
            <div className="flex-1">
                <ul className="space-y-2 mt-4 px-4">
                    <li
                        onClick={() => onSelectTab('profile')}
                        className={`p-3 cursor-pointer flex items-center rounded-md hover:bg-blue-100 ${
                            selectedTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                        }`}
                    >
                        <FaUser className="mr-3" />
                        Hồ sơ cá nhân
                    </li>
                    <li
                        onClick={() => onSelectTab('appointments')}
                        className={`p-3 cursor-pointer flex items-center rounded-md hover:bg-blue-100 ${
                            selectedTab === 'appointments' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                        }`}
                    >
                        <FaCalendarAlt className="mr-3" />
                        Quản lý Đặt lịch khám
                    </li>
                    <li
                        onClick={() => onSelectTab('patientRecords')}
                        className={`p-3 cursor-pointer flex items-center rounded-md hover:bg-blue-100 ${
                            selectedTab === 'patientRecords' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                        }`}
                    >
                        <FaClipboardList className="mr-3" />
                        Hồ sơ bệnh nhân
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
