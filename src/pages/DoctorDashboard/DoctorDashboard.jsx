import React, { useState } from 'react';
import Sidebar from '../../components/Layouts/components/SidebarDoctor/Sidebar'; // Import Sidebar component
import DoctorInfo from './DoctorInfo'; // Import các component chức năng
import AppointmentManagement from './AppointmentManagement';
import WorkScheduleManagement from './WorkScheduleManagement';

const DoctorDashboard = () => {
  // State để lưu tab đang chọn
  const [selectedTab, setSelectedTab] = useState('patients'); // Mặc định là "patients"

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onSelectTab={setSelectedTab} selectedTab={selectedTab} />

      {/* Nội dung chính */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Render các component tương ứng theo tab đã chọn */}
        {selectedTab === 'overview' && <DoctorInfo />}
        {selectedTab === 'appointments' && <AppointmentManagement />}
        {selectedTab === 'schedule' && <WorkScheduleManagement />}
      </div>
    </div>
  );
};

export default DoctorDashboard;
