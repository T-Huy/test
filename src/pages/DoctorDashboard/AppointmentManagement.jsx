import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientManagement() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGVJZCI6IlIxIiwiaWF0IjoxNzMxMzQ1NjczLCJleHAiOjE3MzEzNDkyNzN9.conicyaVRdqgO7exag9p_yc-K7yPfcgzBrMLJ2rfnWw`


  useEffect(() => {
    // Đặt ngày mặc định là ngày hiện tại khi component được tải
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    // Hàm gọi API để lấy dữ liệu lịch hẹn
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8080/booking/doctor/8?date=${selectedDate}`, {
          headers: {
            access_token: token
          },
        });
        
        if (response.data.status === "OK") {
          setAppointments(response.data.data);
        } else {
          console.error('Failed to fetch data:', response.data.message);
          setAppointments([]);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setAppointments([]);
      }finally{
        setLoading(false);
      }
    };

    // Gọi API mỗi khi selectedDate thay đổi
    if (selectedDate) {
      fetchAppointments();
    }
  }, [selectedDate]);

  // Hàm xử lý khi người dùng chọn ngày mới
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(`http://localhost:8080/booking/${appointmentId}`, 
        { status }, 
        { headers: { 
          access_token: token
        } 
      }
      );

      if (response.data.status === "OK") {
        // Update the local state to reflect the status change
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment.bookingId === appointmentId
              ? { ...appointment, status:  valueVi }
              : appointment
          )
        );
      } else {
        setError('Failed to update status');
      }
    } catch (error) {
      setError('Error updating status');
    }
  };

  return (
    <div className="p-4">
      {/* Chọn ngày khám */}
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="date" className="font-semibold">Chọn ngày khám</label>
        <input 
          type="date" 
          id="date" 
          className="border p-2 rounded" 
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Display loading or error message */}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* Bảng thông tin bệnh nhân */}
      <table className="w-full border-collapse border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">STT</th>
            <th className="border p-2">Thời gian khám</th>
            <th className="border p-2">Tên bệnh nhân</th>
            <th className="border p-2">Địa chỉ</th>
            <th className="border p-2">Số điện thoại</th>
            <th className="border p-2">Giới tính</th>
            <th className="border p-2">Lý do khám</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{appointment.timeType.valueVi}</td>
              <td className="border p-2">{appointment.patientRecordId.fullname}</td>
              <td className="border p-2">{appointment.patientRecordId.address}</td>
              <td className="border p-2">{appointment.patientRecordId.phoneNumber}</td>
              <td className="border p-2">
  {appointment.patientRecordId.gender === 'Male' ? 'Nam' : 
   appointment.patientRecordId.gender === 'Female' ? 'Nữ' : 'Khác'}
</td>
              <td className="border p-2">{appointment.reason}</td>
              <td className="border p-2">{appointment.status.valueVi}</td>
              <td className="border p-2 space-x-2">
                <button className="bg-blue-500 text-white p-1 rounded"
                onClick={()=>updateStatus(appointment.bookingId,"S3")}
                >Hoàn thành</button>
                <button className="bg-red-500 text-white p-1 rounded"
                onClick={()=>updateStatus(appointment.bookingId,"S4")}
                >Hủy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientManagement;