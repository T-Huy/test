import React, { useState, useEffect } from 'react';
import { MapPin, Search, Clock, DollarSign } from 'lucide-react';
import axios from 'axios';
import { axiosInstance } from '~/api/apiRequest';
import { useNavigate, useLocation } from 'react-router-dom';
import { LiaStethoscopeSolid } from 'react-icons/lia';
import { BsCoin } from 'react-icons/bs';
import { CiHospital1 } from 'react-icons/ci';
import { GrLocation } from 'react-icons/gr';

function AllDoctor() {
    const [searchQuery, setSearchQuery] = useState('');
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    const { state } = useLocation();

    console.log('STATEEEE', state);

    const getClinicId = state.clinicId || '';
    const getSpecialtyId = state.specialtyId || '';

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axiosInstance.get(
                    `/doctor?clinicId=${getClinicId}&specialtyId=${getSpecialtyId}`,
                );
                console.log('response:', response);
                if (response.errCode === 0) {
                    setDoctors(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch doctors:', error.message);
            }
        };

        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(
        (doctor) =>
            doctor.doctorId.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialtyId.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const IMAGE_URL = 'http://localhost:9000/uploads/';
    const formatCurrency = (value) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    const handleBooking = (doctorId) => {
        // Điều hướng đến trang với ID bác sĩ
        navigate(`/bac-si/get?id=${doctorId}`);
    };

    const positions = ['P0', 'P1', 'P2']; // Mảng các giá trị cần so sánh

    const getPositionLabel = (position) => {
        if (position === 'P0') {
            return 'Bác sĩ';
        } else if (positions.includes(position)) {
            return 'Chức danh khác'; // Thay thế bằng nhãn phù hợp cho các giá trị khác trong mảng
        } else {
            return position; // Giá trị mặc định nếu không khớp với bất kỳ giá trị nào trong mảng
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 mt-28">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div className="max-w-3xl">
                    <h1 className="text-5xl font-bold text-blue-600 mb-2">ĐẶT KHÁM THEO BÁC SĨ</h1>
                    <p className="text-gray-600">Chủ động chọn bác sĩ mà bạn tin tưởng, an tâm khám bệnh</p>
                </div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDnzPZqAqXqhY9oTVXKd6taVLF4c1lpAzcw&s"
                    alt="Medical Staff"
                    className="w-[300px] h-auto"
                />
            </div>

            {/* Search Section */}
            <div className="mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm bác sĩ"
                        className="w-full pl-16 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Doctors List */}
            <div>
                {filteredDoctors.map((doctor) => (
                    <div
                        key={doctor._id}
                        className="flex justify-center items-center gap-4 p-6 mb-6 border rounded-lg hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={`${IMAGE_URL}${doctor.doctorId.image}`}
                            alt={doctor.doctorId.fullname}
                            className="w-36 h-36 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between flex-col items-start">
                                <div className="flex gap-2">
                                    <h4 className="font-bold text-blue-600 text-3xl">
                                        {getPositionLabel(doctor.position)}
                                    </h4>
                                    <h4 className="font-semibold text-blue-600 text-3xl">{doctor.doctorId.fullname}</h4>
                                </div>

                                <div className="mt-2  gap-4 text-2xl">
                                    <div className="flex items-start gap-2">
                                        <LiaStethoscopeSolid className="mt-1" />
                                        {doctor.specialtyId.name}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BsCoin className="mt-1" />
                                        <span>{formatCurrency(doctor.price)}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CiHospital1 className="mt-1" />
                                        <span>{doctor.clinicId.name}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <GrLocation className="mt-1" />
                                        <span>{doctor.clinicId.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="px-6 py-2 mr-8 font-semibold bg-blue-500 text-white rounded-3xl hover:bg-blue-600"
                            onClick={() => handleBooking(doctor.doctorId.userId)}
                        >
                            Đặt ngay
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllDoctor;
