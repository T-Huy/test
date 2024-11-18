import React, { useState, useEffect } from 'react';
import { MapPin, Search, Clock, DollarSign } from 'lucide-react';
import axios from 'axios';
import { axiosInstance } from '~/api/apiRequest';
import { useNavigate } from 'react-router-dom';

function AllDoctor() {
    const [searchQuery, setSearchQuery] = useState('');
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axiosInstance.get('/doctor');
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
                        className="w-full pl-16 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Doctors List */}
            <div className="grid grid-cols-1 gap-4 mb-8">
                {filteredDoctors.map((doctor) => (
                    <div
                        key={doctor._id}
                        className="flex gap-4 p-6 border rounded-lg hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={`${IMAGE_URL}${doctor.doctorId.image}`}
                            alt={doctor.doctorId.fullname}
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-blue-600 text-3xl">{doctor.doctorId.fullname}</h3>
                                    <p className="text-2xl text-gray-500">{doctor.specialtyId.name}</p>
                                </div>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                    onClick={() => handleBooking(doctor.doctorId.userId)}
                                >
                                    Đặt ngay
                                </button>
                            </div>
                            <div className="mt-2 grid grid-cols-3 gap-4 text-2xl">
                                <div className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4 text-gray-400" />
                                    <span>{formatCurrency(doctor.price)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span>{doctor.clinicId.name}</span>
                                </div>
                            </div>
                            <p className="mt-3 text-xl text-gray-500">{doctor.clinicId.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllDoctor;
