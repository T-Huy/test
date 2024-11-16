import React, { useState, useEffect, useContext } from 'react';
import { User, Calendar, Phone, Users, MapPin, Briefcase } from 'lucide-react';
import { axiosInstance } from '~/api/apiRequest';
import { UserContext } from '~/context/UserContext';

function PatientRecord() {
    const { user } = useContext(UserContext);

    const [patientData, setPatientData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axiosInstance.get(`/patientrecord/patient/${user.userId}`);
                if (response.status === 'OK') {
                    setPatientData(response.data); // Lưu toàn bộ mảng bệnh nhân vào state
                } else {
                    setError('Không thể lấy dữ liệu');
                }
            } catch (error) {
                setError('Đã xảy ra lỗi khi lấy dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [user.userId]);

    const handleDelete = (patientId) => {
        console.log(`Xóa hồ sơ bệnh nhân có ID: ${patientId}`);
    };

    const handleEdit = (patientId) => {
        console.log(`Chỉnh sửa hồ sơ bệnh nhân có ID: ${patientId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1 className="text-5xl font-bold mb-4 text-center">Danh sách hồ sơ bệnh nhân</h1>
            <div className="space-y-6 px-4">
                {patientData.map((patient) => (
                    <div
                        key={patient.patientRecordId}
                        className="bg-white shadow-xl rounded-lg overflow-hidden p-4 w-[520px] border-spacing-3 mt-4"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <User className="mr-2 h-6 w-6 text-gray-500" />
                                <span className="font-semibold mr-2">Họ và tên:</span> {patient.fullname}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-6 w-6 text-gray-500" />
                                <span className="font-semibold mr-2">Ngày sinh:</span>{' '}
                                {new Date(patient.birthDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                                <Phone className="mr-2 h-6 w-6 text-gray-500" />
                                <span className="font-semibold mr-2">Số điện thoại:</span> {patient.phoneNumber}
                            </div>
                            <div className="flex items-center">
                                <Users className="mr-2 h-6 w-6 text-gray-500" />
                                <span className="font-semibold mr-2">Giới tính:</span>{' '}
                                {patient.gender === 'Male' ? 'Nam' : 'Nữ'}
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-2 h-6 w-6 text-gray-500" />
                                <span className="font-semibold mr-2">Địa chỉ:</span> {patient.address}
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="mr-2 h-6 w-6 text-gray-500" />
                                <span className="font-semibold mr-2">Nghề nghiệp:</span> {patient.job}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => handleDelete(patient.patientRecordId)}
                            >
                                Xóa hồ sơ
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => handleEdit(patient.patientRecordId)}
                            >
                                Sửa hồ sơ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PatientRecord;
