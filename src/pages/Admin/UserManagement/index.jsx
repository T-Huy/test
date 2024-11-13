import React, { useState, useEffect, useRef,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faGauge, faClock, faPlus, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { UserContext } from "~/context/UserContext";
const UserManagement = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { logout } = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    image: null,
    role: "",
    gender: "",
  });

  const [updateUser, setUpdateUser] = useState({
    name: "Huy",
    email: "lthuy@gmail.com",
    address: "Bình Định",
    phone: "0987654321",
    password: "123456",
    role: "R3",
    image: "https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/meme-meo-khoc-5-1725388333.jpg",
    gender: "",
  });

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (value.trim() === "") {
      // Nếu trường nhập trống, hiển thị lỗi
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "Trường này không được để trống",
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

  const handleLogout = () => {
    logout();
};

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setValidationErrors({});
    setIsModalOpen(false);
    setUser({
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      image: null,
      role: "",
      gender: "",
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
    setUser({ ...user, [name]: value });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  const imageInputRef = useRef(null); // Khai báo ref cho input file

  const handleImageUpload = (e) => {
    //setUser({ ...user, image: e.target.files[0] });
    //url tạm thời
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setUser({ ...user, image: objectURL }); // Lưu blob URL
    }
  };

  const handleUpdateImageUpload = (e) => {
    //setUser({ ...user, image: e.target.files[0] });

    //url tạm thời
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setUpdateUser({ ...updateUser, image: objectURL }); // Lưu blob URL
    }
    //base64
  };

  const handleAddUser = () => {
    const errors = {};
    if (!user.name) errors.name = "Tên người dùng không được để trống.";
    if (!user.email) errors.email = "Email không được để trống.";
    if (!user.address) errors.address = "Địa chỉ không được để trống.";
    if (!user.phone) errors.phone = "Số điện thoại không được để trống.";
    if (!user.password) errors.password = "Mật khẩu không được để trống.";
    if (!user.role) errors.role = "Vai trò không được để trống.";
    if (!user.gender) errors.gender = "Giới tính không được để trống.";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Cập nhật lỗi
      return; // Ngăn không thêm nếu có lỗi
    }

    alert("Thêm tài khoản thành công!");
    setValidationErrors(errors);
    console.log("New User Info:", user);
    handleCloseModal();
  };

  const handleUpdateUser = () => {
    const errors = {};
    if (!updateUser.name) errors.name = "Tên người dùng không được để trống.";
    //if (!user.email) errors.email = "Email không được để trống.";
    if (!updateUser.address) errors.address = "Địa chỉ không được để trống.";
    if (!updateUser.phone) errors.phone = "Số điện thoại không được để trống.";
    if (!updateUser.password) errors.password = "Mật khẩu không được để trống.";
    if (!updateUser.role) errors.role = "Vai trò không được để trống.";
    if (!updateUser.gender) errors.gender = "Giới tính không được để trống.";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Cập nhật lỗi
      return; // Ngăn không thêm nếu có lỗi
    }

    alert("Cập nhật tài khoản thành công!");
    setValidationErrors(errors);
    console.log("Updated User Info:", updateUser);
    handleCloseUpdateModal();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
        left: rect.left,  // Align dropdown with the left edge of Admin button
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

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Dữ liệu các mục menu
  const menuItems = [
    { path: "/admin/dashboard", label: "Bảng thống kê", icon: <FontAwesomeIcon icon={faGauge} /> },
    { path: "/admin/clinic", label: "Quản lý bệnh viện", icon: <FontAwesomeIcon icon={faHospital} /> },
    { path: "/admin/doctor", label: "Quản lý bác sĩ", icon: "👩‍⚕️" },
    { path: "/admin/user", label: "Quản lý tài khoản người dùng", icon: "👤" },
    { path: "/admin/specialty", label: "Quản lý chuyên khoa", icon: "🩺" },
    { path: "/admin/schedule", label: "Quản lý lịch hẹn", icon: "📅" },
    { path: "/admin/worktime", label: "Quản lý thời gian làm việc", icon: <FontAwesomeIcon icon={faClock} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-100 border-r transition-all duration-300 mt-4 ${isExpanded ? "w-100" : "w-16"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-2 bg-gray-300">
          {isExpanded && <span className="font-bold">Admin Menu</span>}
          <button
            onClick={toggleAdminMenu}
            className="p-2 text-gray-700 hover:bg-gray-200 rounded"
          >
            {isExpanded ? <IoMenu /> : <IoMenu />}
          </button>
        </div>
        <ul className="space-y-2 mt-4">
          {/* Menu items */}
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`cursor-pointer flex items-center px-4 py-2 rounded ${location.pathname === item.path
                ? "bg-pink-500 text-white" // Nền hồng cho mục hiện tại
                : "hover:bg-gray-200"    // Hover hiệu ứng cho mục khác
                } ${isExpanded ? "justify-start" : "justify-center"}`}
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
                  src={"https://phuongnamvina.com/img_data/images/logo-benh-vien.jpg" || "https://via.placeholder.com/150"}
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
                    src={"https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/meme-meo-khoc-5-1725388333.jpg" || "https://via.placeholder.com/150"}
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
                    top: dropdownPosition.top + 8 + "px", // Add a small offset
                    left: dropdownPosition.left + "px",
                  }}
                >
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Hồ sơ cá nhân
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
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
          <h2 className="text-center text-2xl font-bold mb-4">QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG</h2>

          <div className="flex items-center justify-between mb-4">
            {/* Thanh tìm kiếm */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="border border-gray-400 rounded px-3 py-2 w-96"
              />
              <button className="bg-gray-200 border border-gray-400 px-4 py-2 rounded">
                🔍
              </button>
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
                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                <th className="border border-gray-300 px-4 py-2">Tên</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                <th className="border border-gray-300 px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto">
                    <img
                      src={"https://s3.ap-southeast-1.amazonaws.com/cdn.vntre.vn/default/meme-meo-khoc-5-1725388333.jpg" || "https://via.placeholder.com/150"}
                      alt="Image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">Lê Tấn Huy</td>
                <td className="border border-gray-300 px-4 py-2 text-center">letanhuy2003@gmail.com</td>
                <td className="border border-gray-300 px-4 py-2 text-center">Bình Định</td>
                <td className="border border-gray-300 px-4 py-2 text-center">0987654321</td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-8">
                  <button className="text-blue-500" onClick={handleOpenUpdateModal}>✏️</button>
                  <button className="text-red-500">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Modal Thêm tài khoản*/}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white w-1/2 p-6 rounded shadow-lg relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                  ✖
                </button>
                <h2 className="text-xl font-bold mb-4">Thêm tài khoản</h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Cột bên trái: Email và Mật khẩu*/}
                  <div className="flex-1 space-y-4">

                    <div>
                      <label>Email<span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border w-full px-2 py-1 rounded ${validationErrors.email ? "border-red-500" : "border-gray-400"
                          }`}
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm">{validationErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label>Mật khẩu<span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"} // Thay đổi type dựa trên showPassword
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`border w-full px-2 py-1 rounded ${validationErrors.password ? "border-red-500" : "border-gray-400"}`}
                        />
                        <span
                          onClick={() => toggleShowPassword()} // Toggle trạng thái showPassword
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                        >
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                      </div>
                      {validationErrors.password && (
                        <p className="text-red-500 text-sm">{validationErrors.password}</p>
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
                          src={user.image || "https://via.placeholder.com/150"}
                          alt="Current User"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input //  Nút để tải lên hình ảnh mới 
                        type="file"
                        name="image"
                        onChange={handleImageUpload}
                        className="hidden"  // Ẩn trường input, sẽ dùng nút ẩn để mở
                        ref={imageInputRef}  // Sử dụng ref để trigger khi cần
                      />
                    </div>
                  </div>
                  <div>
                    <label>Tên tài khoản<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.name ? "border-red-500" : "border-gray-400"
                        }`}
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label>Số điện thoại<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.phone ? "border-red-500" : "border-gray-400"
                        }`}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm">{validationErrors.phone}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label>Địa chỉ<span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.address ? "border-red-500" : "border-gray-400"
                        }`}
                    />
                    {validationErrors.address && (
                      <p className="text-red-500 text-sm">{validationErrors.address}</p>
                    )}
                  </div>
                  <div>
                    <label>Giới tính<span className="text-red-500">*</span></label>
                    <select
                      type="text"
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.gender ? "border-red-500" : "border-gray-400"
                        }`}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </select>
                    {validationErrors.gender && (
                      <p className="text-red-500 text-sm">{validationErrors.gender}</p>
                    )}
                  </div>
                  <div>
                    <label>Vai trò<span className="text-red-500">*</span></label>
                    <select
                      type="text"
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.role ? "border-red-500" : "border-gray-400"
                        }`}
                    >
                      <option value="">Chọn vai trò</option>
                      <option value="R1">Admin</option>
                      <option value="R2">Bác sĩ</option>
                      <option value="R3">Người dùng</option>
                    </select>
                    {validationErrors.role && (
                      <p className="text-red-500 text-sm">{validationErrors.role}</p>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={handleAddUser}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Modal Cập Nhật tài khoản */}
          {isUpdateModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white w-1/2 p-6 rounded shadow-lg relative">
                <button
                  onClick={handleCloseUpdateModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                  ✖
                </button>
                <h2 className="text-xl font-bold mb-4">Cập nhật tài khoản</h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Cột bên trái: Tên tài khoản và Email */}
                  <div className="flex-1 space-y-4">

                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={updateUser.email}
                        disabled
                        className="border w-full px-2 py-1 rounded border-gray-100"
                      />
                    </div>
                    <div>
                      <label>Mật khẩu</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"} // Thay đổi type dựa trên showPassword
                          name="password"
                          value={updateUser.password}
                          onChange={handleUpdateChange}
                          onBlur={handleBlur}
                          className={`border w-full px-2 py-1 rounded ${validationErrors.password ? "border-red-500" : "border-gray-400"}`}
                        />
                        <span
                          onClick={() => toggleShowPassword()} // Toggle trạng thái showPassword
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                        >
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                      </div>
                      {validationErrors.password && (
                        <p className="text-red-500 text-sm">{validationErrors.password}</p>
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
                          src={updateUser.image || "https://via.placeholder.com/150"}
                          alt="Current User"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input //  Nút để tải lên hình ảnh mới 
                        type="file"
                        name="image"
                        onChange={handleUpdateImageUpload}
                        className="hidden"  // Ẩn trường input, sẽ dùng nút ẩn để mở
                        ref={imageInputRef}  // Sử dụng ref để trigger khi cần
                      />
                    </div>
                  </div>
                  <div>
                    <label>Tên tài khoản</label>
                    <input
                      type="text"
                      name="name"
                      value={updateUser.name}
                      onChange={handleUpdateChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.name ? "border-red-500" : "border-gray-400"
                        }`}
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      value={updateUser.phone}
                      onChange={handleUpdateChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.phone ? "border-red-500" : "border-gray-400"
                        }`}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm">{validationErrors.phone}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      value={updateUser.address}
                      onChange={handleUpdateChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.address ? "border-red-500" : "border-gray-400"
                        }`}
                    />
                    {validationErrors.address && (
                      <p className="text-red-500 text-sm">{validationErrors.address}</p>
                    )}
                  </div>
                  <div>
                    <label>Giới tính</label>
                    <select
                      type="text"
                      name="gender"
                      value={updateUser.gender}
                      onChange={handleUpdateChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.gender ? "border-red-500" : "border-gray-400"
                        }`}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </select>
                    {validationErrors.gender && (
                      <p className="text-red-500 text-sm">{validationErrors.gender}</p>
                    )}
                  </div>
                  <div>
                    <label>Vai trò</label>
                    <select
                      type="text"
                      name="role"
                      value={updateUser.role}
                      onChange={handleUpdateChange}
                      onBlur={handleBlur}
                      className={`border w-full px-2 py-1 rounded ${validationErrors.role ? "border-red-500" : "border-gray-400"
                        }`}
                    >
                      <option value="">Chọn vai trò</option>
                      <option value="R1">Admin</option>
                      <option value="R2">Bác sĩ</option>
                      <option value="R3">Người dùng</option>
                    </select>
                    {validationErrors.role && (
                      <p className="text-red-500 text-sm">{validationErrors.role}</p>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={handleUpdateUser}
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
    </div >
  );
};

export default UserManagement;
