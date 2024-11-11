import React, { useState } from 'react';
import { FaUser, FaCalendarAlt, FaClipboardList, FaCommentDots, FaFileInvoiceDollar, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa'; // Các icon cho sidebar

const Sidebar = ({ onSelectTab, selectedTab }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleProfileClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="w-fit h-screen bg-white text-black flex flex-col shadow-lg">
      {/* Logo và tiêu đề */}
      <div className="text-xl font-bold text-center py-6 border-b border-gray-200 flex items-center">
  <img src="EasyMedLogo.jpg" alt="Logo" className="mx-auto mb-2" style={{ width: '50px', height: '50px',borderRadius: '50%' }} /> {/* Thay thế bằng đường dẫn logo của bạn */}
  <div className="ml-4 text-left">
    <p>EasyMed</p>
    <small>Chăm sóc sức khỏe, <br/> bảo vệ cuộc sống</small>
  </div>
</div>

      {/* Danh sách các tab */}
      <div className="flex-1">
        <ul className="space-y-2 mt-4 px-4">
          <li
            onClick={() => onSelectTab('overview')}
            className={`p-3 cursor-pointer flex items-center rounded-md hover:bg-blue-100 ${selectedTab === 'overview' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
          >
            <FaUser className="mr-3" />
            Thông tin cá nhân
          </li>
          <li
            onClick={() => onSelectTab('appointments')}
            className={`p-3 cursor-pointer flex items-center rounded-md hover:bg-blue-100 ${selectedTab === 'appointments' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
          >
            <FaCalendarAlt className="mr-3" />
            Quản lý Đặt lịch khám
          </li>
          <li
            onClick={() => onSelectTab('schedule')}
            className={`p-3 cursor-pointer flex items-center rounded-md hover:bg-blue-100 ${selectedTab === 'schedule' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
          >
            <FaClipboardList className="mr-3" />
            Quản lý Lịch làm việc
          </li>
        </ul>
      </div>

      {/* Logout icon */}
      <div className="px-4 py-2 border-t border-gray-200 flex items-center justify-center cursor-pointer">
        <FaSignOutAlt className="text-gray-700 hover:text-blue-600" />
      </div>

      <div className="px-4 py-6 border-t border-gray-200 relative">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={handleProfileClick}>
          <img
            src="https://snibbs.co/cdn/shop/articles/What_are_the_Challenges_of_Being_a_Doctor.jpg?v=1684314843" // Thay thế bằng đường dẫn ảnh avatar của bác sĩ
            alt="Doctor Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p>Drg. Adam H.</p>
            <small className="text-gray-500">Doctor</small>
          </div>
        </div>
        {showMenu && (
          <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Password</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
