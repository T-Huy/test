import React, { useState, useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faGauge, faClock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { UserContext } from '~/context/UserContext';
import { axiosInstance } from '~/api/apiRequest';
const ClinicManagement = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { logout } = useContext(UserContext);
    const [clinics, setClinics] = useState([]);
    const [newClinic, setNewClinic]= useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        description: '',
        image: '',
    })

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await axiosInstance.get('/clinic');
                
                if (response.errCode === 0) {
                    setClinics(response.data);
                } else {
                    console.error('Failed to fetch data:', response.message);
                    setClinics([]);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setClinics([]);
            }
        };
        fetchClinics();
    }, []);


    const [updateClinic, setUpdateClinic] = useState({
        name: 'BV. Chợ Rẫy',
        email: 'ChoRay@gmail.com',
        address: 'TP. Hồ Chí Minh',
        phone: '0987654321',
        description: '',
        image: 'https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/meme-meo-khoc-5-1725388333.jpg',
    });

    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (value.trim() === '') {
            // Nếu trường nhập trống, hiển thị lỗi
            setValidationErrors((prev) => ({
                ...prev,
                [name]: 'Trường này không được để trống',
            }));
        } else {
            // Nếu trường nhập hợp lệ, xóa lỗi
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setValidationErrors({});
        setIsModalOpen(false);
        setClinic({
            name: '',
            email: '',
            address: '',
            phone: '',
            description: '',
            image: null,
        });
    };

    const handleOpenUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setValidationErrors({});
        setIsUpdateModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClinic({ ...clinic, [name]: value });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateClinic({ ...updateClinic, [name]: value });
    };

    const imageInputRef = useRef(null); // Khai báo ref cho input file

    const handleImageUpload = (e) => {
        //setClinic({ ...clinic, image: e.target.files[0] });
        //url tạm thời
        const file = e.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setClinic({ ...clinic, image: objectURL }); // Lưu blob URL
        }
    };

    const handleUpdateImageUpload = (e) => {
        //setClinic({ ...clinic, image: e.target.files[0] });

        //url tạm thời
        const file = e.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setUpdateClinic({ ...updateClinic, image: objectURL }); // Lưu blob URL
        }
        //base64
    };

    const handleAddClinic = () => {
        const errors = {};
        if (!clinic.name) errors.name = 'Tên bệnh viện không được để trống.';
        if (!clinic.email) errors.email = 'Email không được để trống.';
        if (!clinic.address) errors.address = 'Địa chỉ không được để trống.';
        if (!clinic.phone) errors.phone = 'Số điện thoại không được để trống.';
        if (!clinic.description) errors.description = 'Mô tả không được để trống.';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors); // Cập nhật lỗi
            return; // Ngăn không thêm nếu có lỗi
        }

        alert('Thêm bệnh viện thành công!');
        setValidationErrors(errors);
        console.log('New Clinic Info:', clinic);
        handleCloseModal();
    };

    const handleUpdateClinic = () => {
        const errors = {};
        if (!updateClinic.name) errors.name = 'Tên bệnh viện không được để trống.';
        if (!updateClinic.email) errors.email = 'Email không được để trống.';
        if (!updateClinic.address) errors.address = 'Địa chỉ không được để trống.';
        if (!updateClinic.phone) errors.phone = 'Số điện thoại không được để trống.';
        if (!updateClinic.description) errors.description = 'Mô tả không được để trống.';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors); // Cập nhật lỗi
            return; // Ngăn không thêm nếu có lỗi
        }

        alert('Cập nhật bệnh viện thành công!');
        setValidationErrors(errors);
        console.log('Updated Clinic Info:', updateClinic);
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

    const handleLogout = () => {
        logout();
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
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </li>
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
                    <h2 className="text-center text-2xl font-bold mb-4">QUẢN LÝ BỆNH VIỆN</h2>

                    <div className="flex items-center justify-between mb-4">
                        {/* Thanh tìm kiếm */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="border border-gray-400 rounded px-3 py-2 w-96"
                            />
                            <button className="bg-gray-200 border border-gray-400 px-4 py-2 rounded">🔍</button>
                        </div>

                        {/* Nút Thêm */}
                        <button
                            className="flex items-center space-x-2 bg-gray-200 border border-gray-400 px-4 py-2 rounded"
                            onClick={handleOpenModal}
                        >
                            <span>Thêm</span>
                            <span>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                        </button>
                    </div>

                    {/* Bảng */}
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">STT</th>
                                <th className="border border-gray-300 px-4 py-2">Tên</th>
                                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                                <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                                <th className="border border-gray-300 px-4 py-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clinics.map((clinic,index) => (
                                <tr key={clinic.clinicId}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{index+1}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{clinic.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto">
                                            <img
                                                src={`http://localhost:9000/uploads/${clinic.image}`}
                                                alt={clinic.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{clinic.email}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{clinic.address}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{clinic.phoneNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center space-x-8">
                                        <button className="text-blue-500" onClick={handleOpenUpdateModal}>
                                            ✏️
                                        </button>
                                        <button className="text-red-500">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal Thêm Bệnh Viện*/}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white w-1/2 p-6 rounded shadow-lg relative">
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                                >
                                    ✖
                                </button>
                                <h2 className="text-xl font-bold mb-4">Thêm bệnh viện</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Cột bên trái: Tên bệnh viện và Email */}
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label>
                                                Tên bệnh viện<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={clinic.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`border w-full px-2 py-1 rounded ${
                                                    validationErrors.name ? 'border-red-500' : 'border-gray-400'
                                                }`}
                                            />
                                            {validationErrors.name && (
                                                <p className="text-red-500 text-sm">{validationErrors.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label>
                                                Email<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={clinic.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`border w-full px-2 py-1 rounded ${
                                                    validationErrors.email ? 'border-red-500' : 'border-gray-400'
                                                }`}
                                            />
                                            {validationErrors.email && (
                                                <p className="text-red-500 text-sm">{validationErrors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cột bên phải: Hình ảnh và nút "Thay đổi" */}
                                    <div className="flex flex-col items-center space-x-12">
                                        <label>Hình ảnh</label>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-40 h-40 border rounded overflow-hidden cursor-pointer flex items-center justify-center"
                                                onClick={() => imageInputRef.current.click()}
                                            >
                                                <img
                                                    src={clinic.image || 'https://via.placeholder.com/150'}
                                                    alt="Current Clinic"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <input //  Nút để tải lên hình ảnh mới
                                                type="file"
                                                name="image"
                                                onChange={handleImageUpload}
                                                className="hidden" // Ẩn trường input, sẽ dùng nút ẩn để mở
                                                ref={imageInputRef} // Sử dụng ref để trigger khi cần
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label>
                                            Địa chỉ<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={clinic.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`border w-full px-2 py-1 rounded ${
                                                validationErrors.address ? 'border-red-500' : 'border-gray-400'
                                            }`}
                                        />
                                        {validationErrors.address && (
                                            <p className="text-red-500 text-sm">{validationErrors.address}</p>
                                        )}
                                    </div>
                                    <div className="col-span-2">
                                        <label>
                                            Số điện thoại<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={clinic.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`border w-full px-2 py-1 rounded ${
                                                validationErrors.phone ? 'border-red-500' : 'border-gray-400'
                                            }`}
                                        />
                                        {validationErrors.phone && (
                                            <p className="text-red-500 text-sm">{validationErrors.phone}</p>
                                        )}
                                    </div>
                                    <div className="col-span-2">
                                        <label>
                                            Mô tả<span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={clinic.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            rows="4"
                                            className={`border w-full px-2 py-1 rounded ${
                                                validationErrors.description ? 'border-red-500' : 'border-gray-400'
                                            }`}
                                        ></textarea>
                                        {validationErrors.description && (
                                            <p className="text-red-500 text-sm">{validationErrors.description}</p>
                                        )}
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <button
                                            onClick={handleAddClinic}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Thêm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Modal Cập Nhật Bệnh Viện */}
                    {isUpdateModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white w-1/2 p-6 rounded shadow-lg relative">
                                <button
                                    onClick={handleCloseUpdateModal}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                                >
                                    ✖
                                </button>
                                <h2 className="text-xl font-bold mb-4">Cập nhật bệnh viện</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Cột bên trái: Tên bệnh viện và Email */}
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label>Tên bệnh viện</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={updateClinic.name}
                                                onChange={handleUpdateChange}
                                                onBlur={handleBlur}
                                                className={`border w-full px-2 py-1 rounded ${
                                                    validationErrors.name ? 'border-red-500' : 'border-gray-400'
                                                }`}
                                            />
                                            {validationErrors.name && (
                                                <p className="text-red-500 text-sm">{validationErrors.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={updateClinic.email}
                                                onChange={handleUpdateChange}
                                                onBlur={handleBlur}
                                                className={`border w-full px-2 py-1 rounded ${
                                                    validationErrors.email ? 'border-red-500' : 'border-gray-400'
                                                }`}
                                            />
                                            {validationErrors.email && (
                                                <p className="text-red-500 text-sm">{validationErrors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cột bên phải: Hình ảnh và nút "Thay đổi" */}
                                    <div className="flex flex-col items-center space-x-12">
                                        <label>Hình ảnh</label>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-40 h-40 border rounded overflow-hidden cursor-pointer flex items-center justify-center"
                                                onClick={() => imageInputRef.current.click()}
                                            >
                                                <img
                                                    src={updateClinic.image || 'https://via.placeholder.com/150'}
                                                    alt="Current Clinic"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <input //  Nút để tải lên hình ảnh mới
                                                type="file"
                                                name="image"
                                                onChange={handleUpdateImageUpload}
                                                className="hidden" // Ẩn trường input, sẽ dùng nút ẩn để mở
                                                ref={imageInputRef} // Sử dụng ref để trigger khi cần
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label>Địa chỉ</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={updateClinic.address}
                                            onChange={handleUpdateChange}
                                            onBlur={handleBlur}
                                            className={`border w-full px-2 py-1 rounded ${
                                                validationErrors.address ? 'border-red-500' : 'border-gray-400'
                                            }`}
                                        />
                                        {validationErrors.address && (
                                            <p className="text-red-500 text-sm">{validationErrors.address}</p>
                                        )}
                                    </div>
                                    <div className="col-span-2">
                                        <label>Số điện thoại</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={updateClinic.phone}
                                            onChange={handleUpdateChange}
                                            onBlur={handleBlur}
                                            className={`border w-full px-2 py-1 rounded ${
                                                validationErrors.phone ? 'border-red-500' : 'border-gray-400'
                                            }`}
                                        />
                                        {validationErrors.phone && (
                                            <p className="text-red-500 text-sm">{validationErrors.phone}</p>
                                        )}
                                    </div>
                                    <div className="col-span-2">
                                        <label>Mô tả</label>
                                        <textarea
                                            name="description"
                                            value={updateClinic.description}
                                            onChange={handleUpdateChange}
                                            onBlur={handleBlur}
                                            rows="4"
                                            className={`border w-full px-2 py-1 rounded ${
                                                validationErrors.description ? 'border-red-500' : 'border-gray-400'
                                            }`}
                                        ></textarea>
                                        {validationErrors.description && (
                                            <p className="text-red-500 text-sm">{validationErrors.description}</p>
                                        )}
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <button
                                            onClick={handleUpdateClinic}
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

export default ClinicManagement;
