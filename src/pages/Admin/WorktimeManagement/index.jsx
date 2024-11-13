import React, { useState, useEffect, useRef,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faGauge, faClock, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { UserContext } from "~/context/UserContext";
const WorktimeManagement = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedTimesUpdate, setSelectedTimesUpdate] = useState([]);
  const { logout } = useContext(UserContext);
  const [worktime, setWorktime] = useState({
    date: "",
    doctor: "",
    times: [""],
  });

  const [updateWorktime, setUpdateWorktime] = useState({
    date: "2024-11-13",
    doctor: "1",
    times: ["7:00 - 7:30",
      "7:30 - 8:00"],
  });

  const timeSlots = [
    "7:00 - 7:30",
    "7:30 - 8:00",
    "8:00 - 8:30",
    "8:30 - 9:00",
    "9:00 - 9:30",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "13:30 - 14:00",
    "14:00 - 14:30",
    "14:30 - 15:00",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00",
  ];

  const handleTimeSlotClick = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time)); // Bỏ chọn nếu đã chọn
    } else {
      setSelectedTimes([...selectedTimes, time]); // Thêm vào nếu chưa chọn
    }
  };

  const handleTimeSlotUpdateClick = (time) => {
    if (selectedTimesUpdate.includes(time)) {
      setSelectedTimesUpdate(selectedTimesUpdate.filter((t) => t !== time)); // Bỏ chọn nếu đã chọn
    } else {
      setSelectedTimesUpdate([...selectedTimesUpdate, time]); // Thêm vào nếu chưa chọn
    }
  };

  const workTimeData = [
    {
      id: 1,
      doctor: "Huy",
      date: "06/10/2024",
      times: ["7:00 - 7:30", "7:30 - 8:00", "8:00 - 8:30", "8:30 - 9:00"],
    },
  ];

  const handleLogout = () => {
    logout();
};

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setValidationErrors({});
    setIsModalOpen(false);
    setWorktime({
      name: "",
      email: "",
      address: "",
      phone: "",
      description: "",
      image: null,
    });
  };

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
    setSelectedTimesUpdate(updateWorktime.times)
  };

  const handleCloseUpdateModal = () => {
    setValidationErrors({});
    setIsUpdateModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorktime({ ...worktime, [name]: value });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateWorktime({ ...updateWorktime, [name]: value });
  };

  const imageInputRef = useRef(null); // Khai báo ref cho input file

  const handleImageUpload = (e) => {
    //setWorktime({ ...worktime, image: e.target.files[0] });
    //url tạm thời
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setWorktime({ ...worktime, image: objectURL }); // Lưu blob URL
    }
  };

  const handleUpdateImageUpload = (e) => {
    //setWorktime({ ...worktime, image: e.target.files[0] });

    //url tạm thời
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setUpdateWorktime({ ...updateWorktime, image: objectURL }); // Lưu blob URL
    }
    //base64
  };

  const handleAddWorktime = () => {
    const errors = {};
    if (worktime.times.length === 0) errors.name = "Ca làm việc không được để trống.";
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Cập nhật lỗi
      return; // Ngăn không thêm nếu có lỗi
    }

    alert("Thêm ca làm việc thành công!");
    setValidationErrors(errors);
    console.log("New Worktime Info:", worktime);
    handleCloseModal();
  };

  const handleUpdateWorktime = () => {
    const errors = {};
    if (!updateWorktime.name) errors.name = "Ca làm việc không được để trống.";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Cập nhật lỗi
      return; // Ngăn không thêm nếu có lỗi
    }

    alert("Cập nhật ca làm việc thành công!");
    setValidationErrors(errors);
    console.log("Updated Worktime Info:", updateWorktime);
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
          <h2 className="text-center text-2xl font-bold mb-4">QUẢN LÝ CA LÀM VIỆC</h2>

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
          </div>
          <div className="flex items-center justify-between mb-4">
            <input
              type="date"
              className="border rounded px-2 py-1"
              defaultValue="2024-11-13"
            />
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
                <th className="border border-gray-300 px-4 py-2">Tên bác sĩ</th>
                <th className="border border-gray-300 px-4 py-2">Ngày khám</th>
                <th className="border border-gray-300 px-4 py-2">Ca khám</th>
                <th className="border border-gray-300 px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {workTimeData.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.doctor}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.date}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="grid grid-cols-3 gap-2">
                      {item.times.map((time, timeIndex) => (
                        <span
                          key={timeIndex}
                          className="bg-gray-100 px-2 py-1 rounded border"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center space-x-8">
                    <button className="text-blue-500 hover:text-blue-700" onClick={handleOpenUpdateModal}>✏️</button>
                    <button className="text-red-500 hover:text-red-700">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal Thêm Ca Làm Việc*/}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white w-1/2 p-6 rounded shadow-lg relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                  ✖
                </button>
                <h2 className="text-xl font-bold mb-4">Thêm ca làm việc</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>Chọn ngày</label>
                    <input
                      type="date"
                      name="date"
                      value={worktime.date}
                      onChange={handleChange}
                      className="border w-full px-2 py-1 rounded border-gray-400"
                    />
                  </div>
                  <div>
                    <label>Chọn bác sĩ</label>
                    <select
                      type="text"
                      name="phone"
                      value={worktime.doctor}
                      onChange={handleChange}
                      className="border w-full px-2 py-1 rounded border-gray-400"
                    >
                      <option value="">Chọn bác sĩ</option>
                      <option value="1">Huy</option>
                      <option value="2">Cảnh</option>
                      <option value="3">Thịnh</option>
                    </select>
                  </div>

                </div>
                {/* Time Slot Selection */}
                <div>
                  <label className="block font-bold mt-12 mb-4">Chọn thời gian</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSlotClick(time)}
                        className={`border px-4 py-2 rounded ${selectedTimes.includes(time) ? "bg-gray-300 font-bold" : "bg-white"
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={handleAddWorktime}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Modal Cập Nhật Ca Làm Việc*/}
          {isUpdateModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white w-1/2 p-6 rounded shadow-lg relative">
                <button
                  onClick={handleCloseUpdateModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                  ✖
                </button>
                <h2 className="text-xl font-bold mb-4">Cập nhật ca làm việc</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>Chọn ngày</label>
                    <input
                      type="date"
                      name="date"
                      readOnly
                      value={updateWorktime.date}
                      onChange={handleChange}
                      className="border w-full px-2 py-1 rounded border-gray-400"
                    />
                  </div>
                  <div>
                    <label>Chọn bác sĩ</label>
                    <select
                      type="text"
                      name="phone"
                      value={updateWorktime.doctor}
                      onChange={handleChange}
                      className="border w-full px-2 py-1 rounded border-gray-400"
                    >
                      <option value="">Chọn bác sĩ</option>
                      <option value="1">Huy</option>
                      <option value="2">Cảnh</option>
                      <option value="3">Thịnh</option>
                    </select>
                  </div>

                </div>
                {/* Time Slot Selection */}
                <div>
                  <label className="block font-bold mt-12 mb-4">Chọn thời gian</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className={`border px-4 py-2 rounded ${selectedTimesUpdate.includes(time) ? "bg-gray-300 font-bold" : "bg-white"
                          }`}
                        onClick={() => handleTimeSlotUpdateClick(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={handleUpdateWorktime}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default WorktimeManagement;
