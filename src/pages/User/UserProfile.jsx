import React from 'react';

export default function UserProfile() {
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 flex items-center space-x-4">
                <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    TH
                </div>
                <div>
                    <h2 className="text-xl font-bold">NGUYỄN QUỐC THỊNH</h2>
                    <p className="text-sm text-gray-600">Mã BN: YMP242012847</p>
                </div>
            </div>
            <div className="px-4 pb-4">
                <div className="bg-orange-100 text-orange-800 p-3 rounded-md mb-4 text-sm">
                    Hoàn thiện thông tin để đặt khám và quản lý hồ sơ y tế được tốt hơn.
                </div>
                <Section title="Thông tin cơ bản">
                    <InfoItem label="Họ và tên" value="Nguyễn Quốc Thịnh" />
                    <InfoItem label="Điện thoại" value="0936549477" />
                    <InfoItem label="Ngày sinh" value="13/11/2003" />
                    <InfoItem label="Giới tính" value="Nam" />
                    <InfoItem label="Địa chỉ" value="123, Phường 12, Quận 10, Hồ Chí Minh" />
                </Section>
                <Section title="Thông tin bổ sung">
                    <InfoItem label="Mã BHYT" value="1231232131" />
                    <InfoItem label="Số CMND/CCCD" value="123213123" />
                    <InfoItem label="Dân tộc" value="Kinh" />
                    <InfoItem label="Nghề nghiệp" value="Công An" />
                    <InfoItem label="Email" value="nguyenquocthinh111@gmail.com" />
                </Section>
            </div>
            <div className="px-4 pb-4">
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                    Thay đổi thông tin
                </button>
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="mb-4">
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

function InfoItem({ label, value }) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-600">{label}</span>
            <span>{value}</span>
        </div>
    );
}
