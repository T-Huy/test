import React, { useState, useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faGauge, faClock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { UserContext } from '~/context/UserContext';
const ScheduleManagement = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedStatus, setSelectedStatus] = useState('Tất cả');
    const { logout } = useContext(UserContext);
    const [schedule, setSchedule] = useState({
        scheduleId: '',
        date: '',
        time: '',
        doctor: '',
        patient: '',
        phone: '',
        address: '',
        status: '',
    });

    const [updateSchedule, setUpdateSchedule] = useState({
        scheduleId: 1,
        date: '2024-11-13',
        time: 'T2',
        doctor: 'Huy',
        patient: 'Cảnh',
        phone: '0987654321',
        address: 'Bình Định',
        status: 'S1',
    });

    const schedules = [
        {
            scheduleId: 1,
            date: '06/10/2024',
            time: 'T2', //9:00-9:30
            doctor: 'Huy',
            patient: 'Thịnh',
            phone: '0987654321',
            address: 'Long An',
            status: 'S1', //Đã thanh toán
        },
        {
            scheduleId: 2,
            date: '06/10/2024',
            time: 'T2', //9:00-9:30
            doctor: 'Huy',
            patient: 'Thịnh',
            phone: '0987654321',
            address: 'Long An',
            status: 'S3', //Đã hủy
        },
        // Thêm các lịch hẹn khác nếu cần
    ];

    const handleLogout = () => {
        logout();
    };

    const filteredSchedules =
        selectedStatus === 'Tất cả' ? schedules : schedules.filter((sche) => sche.status === selectedStatus);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setValidationErrors({});
        setIsModalOpen(false);
        setSchedule({
            scheduleId: '',
            date: '',
            time: '',
            doctor: '',
            patient: '',
            phone: '',
            address: '',
            status: '',
        });
    };

    const handleOpenUpdateModal = () => {
        setIsUpdateModalOpen(true);
        console.error();
    };

    const handleCloseUpdateModal = () => {
        setValidationErrors({});
        setIsUpdateModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule({ ...schedule, [name]: value });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateSchedule({ ...updateSchedule, [name]: value });
    };

    const imageInputRef = useRef(null); // Khai báo ref cho input file

    const handleImageUpload = (e) => {
        //url tạm thời
        const file = e.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setSchedule({ ...schedule, image: objectURL }); // Lưu blob URL
        }
    };

    const handleUpdateImageUpload = (e) => {
        //url tạm thời
        const file = e.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setUpdateSchedule({ ...updateSchedule, image: objectURL }); // Lưu blob URL
        }
        //base64
    };

    const handleAddSchedule = () => {
        //Chưa có error do không dùng Thêm
        alert('Thêm lịch hẹn thành công!');
        console.log('New Schedule Info:', schedule);
        handleCloseModal();
    };

    const handleUpdateSchedule = () => {
        const errors = {};
        if (!updateSchedule.time) errors.time = 'Ca khám không được để trống.';
        if (!updateSchedule.status) errors.status = 'Trạng thái không được để trống.';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors); // Cập nhật lỗi
            return; // Ngăn không thêm nếu có lỗi
        }
        alert('Cập nhật lịch hẹn thành công!');
        setValidationErrors(errors);
        console.log('Updated Schedule Info:', updateSchedule);
        handleCloseUpdateModal();
    };

    const toggleAdminMenu = () => {
        setIsExpanded(!isExpanded);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef(null);
    const adminRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        if (isMenuOpen && adminRef.current) {
            const rect = adminRef.current.getBoundingClientRect();
            // Set dropdown position to be below the Admin button
            setDropdownPosition({
                top: rect.bottom, // Position dropdown below the button
                left: rect.left, // Align dropdown with the left edge of Admin button
            });
        }
    }, [isMenuOpen]);

    // Close the menu if clicked outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !adminRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Dữ liệu các mục menu
    const menuItems = [
        { path: '/admin/dashboard', label: 'Bảng thống kê', icon: <FontAwesomeIcon icon={faGauge} /> },
        { path: '/admin/clinic', label: 'Quản lý bệnh viện', icon: <FontAwesomeIcon icon={faHospital} /> },
        { path: '/admin/doctor', label: 'Quản lý bác sĩ', icon: '👩‍⚕️' },
        { path: '/admin/user', label: 'Quản lý tài khoản người dùng', icon: '👤' },
        { path: '/admin/specialty', label: 'Quản lý chuyên khoa', icon: '🩺' },
        { path: '/admin/schedule', label: 'Quản lý lịch hẹn', icon: '📅' },
        { path: '/admin/worktime', label: 'Quản lý thời gian làm việc', icon: <FontAwesomeIcon icon={faClock} /> },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className={`bg-gray-100 border-r transition-all duration-300 mt-4 ${isExpanded ? 'w-100' : 'w-16'}`}>
                <div className="flex items-center justify-between px-4 py-2 bg-gray-300">
                    {isExpanded && <span className="font-bold">Admin Menu</span>}
                    <button onClick={toggleAdminMenu} className="p-2 text-gray-700 hover:bg-gray-200 rounded">
                        {isExpanded ? <IoMenu /> : <IoMenu />}
                    </button>
                </div>
                <ul className="space-y-2 mt-4">
                    {/* Menu items */}
                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            className={`cursor-pointer flex items-center px-4 py-2 rounded ${
                                location.pathname === item.path
                                    ? 'bg-pink-500 text-white' // Nền hồng cho mục hiện tại
                                    : 'hover:bg-gray-200' // Hover hiệu ứng cho mục khác
                            } ${isExpanded ? 'justify-start' : 'justify-center'}`}
                            onClick={() => navigate(item.path)}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {isExpanded && <span className="ml-4">{item.label}</span>}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4">
                <div className="bg-gray-200">
                    <div className="border-t border-gray-400"></div>
                    <div className="bg-gray-200 mx-auto">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={
                                        'https://phuongnamvina.com/img_data/images/logo-benh-vien.jpg' ||
                                        'https://via.placeholder.com/150'
                                    }
                                    alt="Logo"
                                    className="w-24 h-24 object-contain"
                                />
                                <h1 className="text-5xl font-bold">EasyMed</h1>
                            </div>
                            {/* Admin và Menu */}
                            <div
                                ref={adminRef}
                                className="flex items-center space-x-4 cursor-pointer"
                                onClick={toggleMenu}
                            >
                                <span className="font-bold">Admin</span>
                                <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={
                                            'https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/meme-meo-khoc-5-1725388333.jpg' ||
                                            'https://via.placeholder.com/150'
                                        }
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Menu thả xuống */}
                            {isMenuOpen && (
                                <div
                                    ref={menuRef}
                                    className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-40 z-20"
                                    style={{
                                        top: dropdownPosition.top + 8 + 'px', // Add a small offset
                                        left: dropdownPosition.left + 'px',
                                    }}
                                >
                                    <ul className="py-2">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Hồ sơ cá nhân</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Đăng xuất</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="border-t border-gray-400"></div>
                </div>

                {/* Nội dung chính */}
                <div className="px-16 py-8">
                    {/* Tiêu đề */}
                    <h2 className="text-center text-2xl font-bold mb-4">QUẢN LÝ LỊCH HẸN</h2>

                    <div className="flex items-center justify-between mb-4">
                        {/* Thanh tìm kiếm */}
                        <div className="grid grid-col-2 gap-4">
                            <div className="flex items-center space-x-2 ">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    className="border border-gray-400 rounded px-3 py-2 w-96"
                                />
                                <button className="bg-gray-200 border border-gray-400 px-4 py-2 rounded">🔍</button>
                            </div>
                            <div>
                                <input type="date" className="border rounded px-2 py-1" defaultValue="2024-11-13" />
                            </div>
                        </div>

                        {/* Nút Thêm */}
                        {/* <button
              className="flex items-center space-x-2 bg-gray-200 border border-gray-400 px-4 py-2 rounded"
              onClick={handleOpenModal}
            >
              <span>Thêm</span>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button> */}
                    </div>

                    {/* Status Filters */}
                    <div className="flex space-x-4 mb-4">
                        {['Tất cả', 'Đã thanh toán', 'Đã khám xong', 'Đã hủy'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-4 py-2 rounded border ${
                                    selectedStatus === status ? 'bg-gray-300 font-bold' : 'bg-white'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    {/* Bảng */}
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">STT</th>
                                <th className="border border-gray-300 px-4 py-2">Ngày khám</th>
                                <th className="border border-gray-300 px-4 py-2">Ca khám</th>
                                <th className="border border-gray-300 px-4 py-2">Bác sĩ</th>
                                <th className="border border-gray-300 px-4 py-2">Tên bệnh nhân</th>
                                <th className="border border-gray-300 px-4 py-2">SĐT</th>
                                <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                                <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                                <th className="border border-gray-300 px-4 py-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSchedules.length > 0 ? (
                                filteredSchedules.map((sche, index) => (
                                    <tr key={sche.id} className="text-center">
                                        <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
                                        <td className="border border-gray-300 px-2 py-1">{sche.date}</td>
                                        <td className="border border-gray-300 px-2 py-1">{sche.time}</td>
                                        <td className="border border-gray-300 px-2 py-1">{sche.doctor}</td>
                                        <td className="border border-gray-300 px-2 py-1">{sche.patient}</td>
                                        <td className="border border-gray-300 px-2 py-1">{sche.phone}</td>
                                        <td className="border border-gray-300 px-2 py-1">{sche.address}</td>
                                        <td className="border border-gray-300 px-2 py-1">{sche.status}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center space-x-8">
                                            <button className="text-blue-500" onClick={handleOpenUpdateModal}>
                                                ✏️
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">
                                        Không có lịch hẹn nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Modal Cập Nhật lịch hẹn */}
                    {isUpdateModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white w-1/2 p-6 rounded shadow-lg relative">
                                <button
                                    onClick={handleCloseUpdateModal}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                                >
                                    ✖
                                </button>
                                <h2 className="text-xl font-bold mb-4">Cập nhật lịch hẹn</h2>
                                <div className="grid grid-cols-2">
                                    <div>
                                        <label>Ngày khám</label>
                                        <input
                                            type="date"
                                            name="date"
                                            readOnly
                                            value={updateSchedule.date}
                                            onChange={handleUpdateChange}
                                            className="border border-gray-400 w-full px-2 py-1 rounded"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label>Bác sĩ</label>
                                        <input
                                            type="text"
                                            name="doctor"
                                            value={updateSchedule.doctor}
                                            disabled
                                            className="border border-gray-100 w-full px-2 py-1 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label>Bệnh nhân</label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={updateSchedule.patient}
                                            onChange={handleUpdateChange}
                                            disabled
                                            className="border border-gray-100 w-full px-2 py-1 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label>Ca khám</label>
                                        <select
                                            type="text"
                                            name="time"
                                            value={updateSchedule.time}
                                            onChange={handleUpdateChange}
                                            className="border border-gray-400 w-full px-2 py-1 rounded"
                                        >
                                            <option value="">Chọn ca khám</option>
                                            <option value="T1">8:00-8:30</option>
                                            <option value="T2">9:00-9:30</option>
                                            <option value="T3">10:00-10:30</option>
                                            <option value="T4">11:00-11:30</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Địa chỉ</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={updateSchedule.address}
                                            onChange={handleUpdateChange}
                                            disabled
                                            className="border border-gray-100 w-full px-2 py-1 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label>Trạng thái</label>
                                        <select
                                            type="text"
                                            name="status"
                                            value={updateSchedule.status}
                                            onChange={handleUpdateChange}
                                            className="border border-gray-400 w-full px-2 py-1 rounded"
                                        >
                                            <option value="">Chọn trạng thái</option>
                                            <option value="S1">Đã thanh toán</option>
                                            <option value="S2">Đã khám xong</option>
                                            <option value="S3">Đã hủy</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Số điện thoại</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={updateSchedule.phone}
                                            onChange={handleUpdateChange}
                                            disabled
                                            className="border border-gray-100 w-full px-2 py-1 rounded"
                                        />
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <button
                                            onClick={handleUpdateSchedule}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScheduleManagement;
