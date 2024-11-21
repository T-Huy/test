import React, { useState, useEffect, useContext } from 'react';
import { MapPin, Clock, CreditCard, Shield } from 'lucide-react';
import { axiosInstance } from '~/api/apiRequest';
import { Await, useSearchParams, useNavigate, useLocation } from 'react-router-dom'; // Dùng để lấy `patientRecordId` từ URL
import parse from 'html-react-parser';
import './CSS/DoctorDescription.css';
import { GrLocation } from 'react-icons/gr';
import { CiHospital1 } from 'react-icons/ci';
import { UserContext } from '~/context/UserContext';

function DoctorInfo() {
    const [selectedTime, setSelectedTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [doctorInfo, setDoctorInfo] = useState([]);
    const { state } = useLocation();
    const {user}=useContext(UserContext);
    console.log('STATE', state);

    const [searchParams] = useSearchParams();
    const doctorId = searchParams.get('id') || state.doctorId;
    const navigate = useNavigate();

    // console.log('Doctor info: ', doctorInfo);
    useEffect(() => {
        console.log('1');
        const fetchDoctorInfo = async () => {
            try {
                const response = await axiosInstance.get(`/doctor/${doctorId}`);
                console.log('2');
                console.log('Doctor info000: ', response);
                if (response.errCode === 0) {
                    setDoctorInfo(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch doctor info: ', error.message);
            }
        };
        fetchDoctorInfo();
    }, []);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setCurrentDate(formattedDate);
    }, []);

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

    const handleDateChange = (event) => {
        setCurrentDate(event.target.value);
    };

    const IMAGE_URL = `http://localhost:${import.meta.env.VITE_BE_PORT}/uploads/`;
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // Fetch lịch làm việc
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axiosInstance.get(`/schedule/${doctorId}?date=${currentDate}`);
                console.log('Schedule:', response);
                if (response.status === 'OK') {
                    setSchedule(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch schedule:', error.message);
            }
        };
        fetchSchedule();
    }, [currentDate]);

    // Map timeTypes sang label
    // const mapTimeTypeToLabel = (timeTypes) => {
    //     return timeTypes.map((timeType) => {
    //         const slot = timeSlots.find((slot) => slot.value === timeType);
    //         return slot ? { value: timeType, label: slot.label } : { value: timeType, label: timeType };
    //     });
    // };

    const mapTimeTypeToLabel = (scheduleData) => {
        // Lấy danh sách timeTypes và currentNumbers từ dữ liệu lịch
        const { timeTypes, currentNumbers } = scheduleData;

        // Lọc các timeTypes dựa trên currentNumbers (bỏ qua nếu currentNumbers === 2)
        const availableTimeSlots = timeTypes.filter((_, index) => currentNumbers[index] !== 2);

        // Map timeTypes đã lọc sang label
        return availableTimeSlots.map((timeType) => {
            const slot = timeSlots.find((slot) => slot.value === timeType);
            return slot ? { value: timeType, label: slot.label } : { value: timeType, label: timeType };
        });
    };
    const getCityFromAddress = (address) => {
        const parts = address.split(', ');
        return parts[parts.length - 1];
    };

    const handleTimeSlotClick = (timeSlot) => {
        if(!user.auth){
            return navigate('/login');
        }
        setSelectedTime(timeSlot);
        navigate('/bac-si/get/record', {
            state: {
                doctorId,
                currentDate,
                timeSlot,
            },
        });
    };

    // const customDescription = doctorInfo.description;
    console.log('doctor', doctorInfo);
    // console.log('customDescription:', customDescription);

    return (
        <div className="max-w-fit mx-auto p-6 mt-24 ">
            {/* Doctor Info Section */}
            <div className="flex items-center gap-6 mb-8">
                <img
                    src={`${IMAGE_URL}${doctorInfo.image}`} // Thay thế URL này bằng link ảnh thực tế của bác sĩ
                    alt="Doctor profile"
                    className="w-44 h-44 object-cover rounded-lg"
                />
                <div className="flex-1">
                    <h1 className="text-5xl font-bold mb-2">
                        {doctorInfo.position} {doctorInfo.fullname}
                    </h1>
                    <div className="flex items-start gap-2">
                        <GrLocation className="mt-1" />
                        {getCityFromAddress(doctorInfo.address || '')}
                    </div>
                </div>
            </div>

            {/* Schedule Section */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 h-[247px]">
                    <div className="border rounded-lg p-4 h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <h2 className="font-semibold text-3xl">LỊCH KHÁM</h2>
                        </div>
                        <input
                            type="date"
                            value={currentDate}
                            onChange={handleDateChange}
                            className="w-1/3 p-1 border rounded-lg cursor-pointer"
                        />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5 h-[112.5px] items-center">
                            {schedule.length > 0 ? (
                                mapTimeTypeToLabel(schedule[0]).map(({ value, label }, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTimeSlotClick(value)}
                                        className={`p-3 rounded text-xl font-semibold ${
                                            selectedTime === label
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))
                            ) : (
                                <p className="col-span-2 md:col-span-1 md:col-start-2 font-medium">
                                    Không có lịch khám nào
                                </p>
                            )}
                        </div>
                        <p className="flex justify-start items-end text-gray-500 text-xl mt-6">
                            Chọn và đặt (Phí đặt lịch 0đ)
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Location Info */}
                    <div className="flex flex-col gap-4 justify-between border rounded-lg p-4 w-[280px]">
                        <h2 className="font-semibold">ĐỊA CHỈ KHÁM</h2>
                        <div className="flex items-start gap-2">
                            <CiHospital1 className="mt-1" />
                            <span>{doctorInfo.clinicName}</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <GrLocation className="mt-1" />
                            {doctorInfo.addressClinic}
                        </div>
                    </div>

                    {/* Fee Info */}
                    <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-gray-500" />
                            <h2 className="font-semibold">GIÁ KHÁM: {formatCurrency(doctorInfo.price)}</h2>
                            {/* {doctorInfo.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Work History */}

            <div className="doctor-description leading-7 my-6 border w-[874px] p-4">
                {doctorInfo.description ? parse(doctorInfo.description) : 'Mô tả không có sẵn'}
            </div>
        </div>
    );
}

export default DoctorInfo;
