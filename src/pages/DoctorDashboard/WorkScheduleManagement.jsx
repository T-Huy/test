import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorScheduleManagement() {
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

    const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGVJZCI6IlIxIiwiaWF0IjoxNzMxNDY5MTY5LCJleHAiOjE3MzE0NzI3Njl9.Yf3HuSVo2gpZ8gJr1KsvfbA2KrKshXRrGqyc3XPvEkI`;

    // Danh sách các khung giờ có sẵn
    const timeSlots = [
        { label: '8:00 - 9:00', value: 'T1' },
        { label: '9:00 - 10:00', value: 'T2' },
        { label: '10:00 - 11:00', value: 'T3' },
        { label: '11:00 - 12:00', value: 'T4' },
        { label: '13:00 - 14:00', value: 'T5' },
        { label: '14:00 - 15:00', value: 'T6' },
        { label: '15:00 - 16:00', value: 'T7' },
        { label: '16:00 - 17:00', value: 'T8' },
    ];

    useEffect(() => {
        // Đặt ngày mặc định là ngày hiện tại khi component được tải
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
    }, []);

    // Lấy thông tin lịch làm việc theo ngày
    const fetchScheduleByDate = async (date) => {
        try {
            const response = await axios.get(`http://localhost:8080/schedule/8?date=${date}`, {
                headers: {
                    access_token: token,
                },
            });
            if (response.data.status === 'OK') {
                const bookedSlots = response.data.data.length > 0 ? response.data.data[0].timeTypes : [];
                setSelectedTimeSlots(bookedSlots);
            } else {
                console.error('Error fetching schedule:', response.data.message);
                setSelectedTimeSlots([]); // Nếu không có lịch thì để rỗng
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
            setSelectedTimeSlots([]);
        }
    };

    // Gọi API khi ngày thay đổi
    useEffect(() => {
        if (selectedDate) {
            fetchScheduleByDate(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        const fetchDoctorInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/doctor/8');
                if (response.data.errCode === 0) {
                    setSelectedDoctor(response.data.data);
                } else {
                    console.error('Error fetching doctor information:', response.data.errMessage);
                }
            } catch (error) {
                console.error('Error fetching doctor information:', error);
            }
        };

        fetchDoctorInfo();
    }, []);

    // Xử lý khi người dùng chọn hoặc bỏ chọn khung giờ
    const toggleTimeSlot = (slotValue) => {
        setSelectedTimeSlots((prevSlots) =>
            prevSlots.includes(slotValue) ? prevSlots.filter((time) => time !== slotValue) : [...prevSlots, slotValue],
        );
    };

    // Xử lý khi nhấn nút "Lưu thông tin"
    const handleSave = async () => {
        const requestData = {
            doctorId: selectedDoctor.doctorId,
            scheduleDate: selectedDate,
            timeTypes: selectedTimeSlots,
        };

        console.log('Request data:', requestData);
        try {
            const response = await axios.put('http://localhost:8080/schedule/8', requestData, {
                headers: {
                    access_token: token,
                },
            });
            if (response.data.status === 'OK') {
                alert('Thông tin đã được lưu thành công!');
            } else if (response.data.message === 'Schedule already exists') {
                alert('Lịch làm việc cho bác sĩ đã tồn tại.');
            } else {
                alert('Lưu thông tin không thành công: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error saving schedule:', error);
            alert('Có lỗi xảy ra khi lưu thông tin.');
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">QUẢN LÝ KẾ HOẠCH KHÁM BỆNH CỦA BÁC SĨ</h1>

            <div className="flex justify-center items-center mb-6 space-x-4">
                {/* Chọn bác sĩ */}
                <div>
                    <label className="font-semibold mr-2">Bác sĩ</label>
                    <input
                        type="text"
                        value={selectedDoctor.fullname || ''}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="border p-2 rounded"
                        disabled={true}
                    />
                </div>

                {/* Chọn ngày */}
                <div>
                    <label className="font-semibold mr-2">Chọn ngày</label>
                    <input
                        type="date"
                        value={selectedDate || ''}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
            </div>

            {/* Hiển thị các khung giờ */}
            <div className="flex justify-center space-x-4 mb-6">
                {timeSlots.map((slot) => (
                    <button
                        key={slot.value}
                        onClick={() => toggleTimeSlot(slot.value)}
                        className={`p-2 border rounded ${
                            selectedTimeSlots.includes(slot.value) ? 'bg-yellow-500 text-white' : 'bg-white text-black'
                        }`}
                    >
                        {slot.label}
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
}

export default DoctorScheduleManagement;
