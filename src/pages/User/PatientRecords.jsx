// function PatientRecords() {
//     return <p>Hồ sơ bệnh nhân</p>;
// }

// export default PatientRecords;

import React from 'react';
import { User, Calendar, Phone, Users, MapPin, Users2 } from 'lucide-react';

const PatientRecord = ({
    name = 'TRAN VAN TUAN',
    dateOfBirth = '03/03/1967',
    phoneNumber = '093****470',
    gender = 'Nam',
    address = 'MHN, Xã Hòa Bắc, Huyện Hòa Vang, Thành phố Đà Nẵng',
    ethnicity = 'Kinh',
}) => {
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <h1 className="text-2xl font-bold mb-4">Danh sách hồ sơ bệnh nhân</h1>
            <div className="px-6 py-4">
                <div className="space-y-2">
                    <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-semibold mr-2">Họ và tên:</span> {name}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-semibold mr-2">Ngày sinh:</span> {dateOfBirth}
                    </div>
                    <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-semibold mr-2">Số điện thoại:</span> {phoneNumber}
                    </div>
                    <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-semibold mr-2">Giới tính:</span> {gender}
                    </div>
                    <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-semibold mr-2">Địa chỉ:</span> {address}
                    </div>
                    <div className="flex items-center">
                        <Users2 className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-semibold mr-2">Dân tộc:</span> {ethnicity}
                    </div>
                </div>
            </div>
            <div className="px-6 py-4 bg-gray-100 flex justify-end space-x-2">
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Xóa hồ sơ</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sửa hồ sơ</button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Chi tiết</button>
            </div>
        </div>
    );
};

export default PatientRecord;
