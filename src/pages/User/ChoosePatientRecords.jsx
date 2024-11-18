import React, { useState, useEffect, useContext } from 'react';
import { User, Calendar, Phone, Users, MapPin, Briefcase, Mail, IdCard } from 'lucide-react';
import { axiosInstance } from '~/api/apiRequest';
import { UserContext } from '~/context/UserContext';
import { Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmationModal from '~/components/Confirm/ConfirmationModal';

function ChoosePatientRecord() {
    const { user } = useContext(UserContext);
    const { state } = useLocation();
    console.log('STATE', state);

    const [patientData, setPatientData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false); // Quản lý hiển thị modal
    const [editingPatient, setEditingPatient] = useState(null); // Lưu thông tin bệnh nhân đang chỉnh sửa
    const [patientIdToDelete, setPatientIdToDelete] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axiosInstance.get(`/patientrecord/patient/${user.userId}`);
                console.log(response);
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
        setPatientIdToDelete(patientId);
        setShowModal(true); // Show confirmation modal
    };

    const handleConfirmDelete = async () => {
        console.log(`Xóa hồ sơ bệnh nhân có ID: ${patientIdToDelete}`);
        try {
            const response = await axiosInstance.delete(`/patientrecord/${patientIdToDelete}`);
            console.log('DELETE', response);
            if (response.errCode === 0) {
                // Remove the deleted patient from the state
                setPatientData((prevData) =>
                    prevData.filter((patient) => patient.patientRecordId !== patientIdToDelete),
                );
                toast.success('Đã xóa hồ sơ thành công');
            } else {
                toast.error('Không thể xóa hồ sơ');
            }
        } catch (error) {
            console.error('Lỗi khi xóa hồ sơ:', error);
            toast.error('Đã xảy ra lỗi khi xóa hồ sơ');
        }
        setShowModal(false); // Close the modal after deletion
    };

    const handleCancelDelete = () => {
        setShowModal(false); // Close the modal without deleting
    };

    const handleEdit = (patientId) => {
        console.log(`Chỉnh sửa hồ sơ bệnh nhân có ID: ${patientId}`);
        navigate(`/user/records/update?id=${patientId}`);
    };

    const handleAdd = () => {
        navigate(`/user/records/addNew`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleSubmit = (formData) => {
        console.log('Dữ liệu đã submit:', formData);
    };

    const handleContinue = (patientId) => {
        // Navigating to the confirm page with patientRecordId and state
        navigate('/bac-si/get/record/confirm', { state: { patientId, patientState: state } });
    };

    return (
        <div>
            <h1 className="text-5xl font-bold mb-4 text-center mt-36">Chọn hồ sơ bệnh nhân</h1>
            <div className="flex justify-end mb-4 px-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleAdd}>
                    Thêm hồ sơ bệnh nhân
                </button>
            </div>
            <div className="space-y-6 px-4 flex flex-col items-center">
                {patientData.map((patient) => (
                    <div
                        key={patient.patientRecordId}
                        className="bg-white shadow-xl rounded-lg overflow-hidden p-4 w-[650px] border-spacing-3 mt-4"
                    >
                        <div className="space-y-4">
                            <div className="flex gap-1 relative top-5">
                                {/* Cột 1 */}
                                <div className="flex-1">
                                    <div className="space-y-3">
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
                                            <span className="font-semibold mr-2">Số điện thoại:</span>{' '}
                                            {patient.phoneNumber}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="mr-2 h-6 w-6 text-gray-500" />
                                            <span className="font-semibold mr-2">Giới tính:</span>{' '}
                                            {patient.gender === 'Male' ? 'Nam' : 'Nữ'}
                                        </div>
                                    </div>
                                </div>

                                {/* Cột 2 */}
                                <div className="flex-1">
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <MapPin className="mr-2 h-6 w-6 text-gray-500" />
                                            <span className="font-semibold mr-2">Địa chỉ:</span> {patient.address}
                                        </div>
                                        <div className="flex items-center">
                                            <Briefcase className="mr-2 h-6 w-6 text-gray-500" />
                                            <span className="font-semibold mr-2">Nghề nghiệp:</span> {patient.job}
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="mr-2 h-6 w-6 text-gray-500" />
                                            <span className="font-semibold mr-2">Email:</span> {patient.email}
                                        </div>
                                        <div className="flex items-center">
                                            <IdCard className="mr-2 h-6 w-6 text-gray-500" />
                                            <span className="font-semibold mr-2">CCCD:</span> {patient.CCCD}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between space-x-2 mt-10">
                            <div className="flex space-x-2">
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
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-300"
                                onClick={() => handleContinue(patient.patientRecordId)}
                            >
                                Tiếp tục
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showModal}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message="Bạn có chắc chắn muốn xóa hồ sơ bệnh nhân này?"
            />
        </div>
    );
}

export default ChoosePatientRecord;
