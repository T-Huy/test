import React, { useState } from 'react';

const AppointmentManagement = () => {
    const [activeTab, setActiveTab] = useState('cancelled');

    const tabs = [
        { id: 'paid', label: 'Đã thanh toán' },
        { id: 'unpaid', label: 'Chưa thanh toán' },
        { id: 'examined', label: 'Đã khám' },
        { id: 'cancelled', label: 'Đã hủy' },
    ];

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách phiếu khám bệnh</h1>
            <div className="flex space-x-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                            activeTab === tab.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {/* Content for the selected tab would go here */}
            <div className="mt-4">
                {/* Placeholder for tab content */}
                <p>Content for {tabs.find((tab) => tab.id === activeTab)?.label} tab</p>
            </div>
        </div>
    );
};

export default AppointmentManagement;
