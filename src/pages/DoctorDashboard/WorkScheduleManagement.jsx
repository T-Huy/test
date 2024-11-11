import React, { useState } from 'react';

function DoctorScheduleManagement () {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  // Danh sách các khung giờ có sẵn
  const timeSlots = [
    "8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
    "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
  ];

  // Xử lý khi người dùng chọn hoặc bỏ chọn khung giờ
  const toggleTimeSlot = (slot) => {
    setSelectedTimeSlots((prevSlots) =>
      prevSlots.includes(slot)
        ? prevSlots.filter((time) => time !== slot)
        : [...prevSlots, slot]
    );
  };

  // Xử lý khi nhấn nút "Lưu thông tin"
  const handleSave = () => {
    // Thực hiện các thao tác lưu dữ liệu
    alert('Thông tin đã được lưu!');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-8">QUẢN LÝ KẾ HOẠCH KHÁM BỆNH CỦA BÁC SĨ</h1>

      <div className="flex justify-center items-center mb-6 space-x-4">
        {/* Chọn bác sĩ */}
        <div>
          <label className="font-semibold mr-2">Chọn bác sĩ</label>
          <input
            type="text"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            placeholder="Nguyễn Duy Hưng"
            className="border p-2 rounded"
          />
        </div>

        {/* Chọn ngày */}
        <div>
          <label className="font-semibold mr-2">Chọn ngày</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Hiển thị các khung giờ */}
      <div className="flex justify-center space-x-4 mb-6">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => toggleTimeSlot(slot)}
            className={`p-2 border rounded ${selectedTimeSlots.includes(slot) ? 'bg-yellow-500 text-white' : 'bg-white text-black'}`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Nút Lưu thông tin */}
      <div className="flex justify-center">
        <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
          Lưu thông tin
        </button>
      </div>
    </div>
  );
};

export default DoctorScheduleManagement;
