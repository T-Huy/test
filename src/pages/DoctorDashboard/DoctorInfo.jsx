import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaCamera} from 'react-icons/fa'; 


function DoctorProfile () {
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    address: '',
    gender: '',
    birthdate: '',
    specialty: '',
    phone: '',
    email: '',
    clinic: '',
    position: '',
    image:''
  });

  const [selectedFile, setSelectedFile] = useState(null); // Thêm trạng thái để lưu trữ tệp ảnh
  const [previewImage, setPreviewImage] = useState(null); // Thêm trạng thái để lưu trữ URL tạm thời của ảnh

  console.log("Image",selectedFile)

  useEffect(() => {
    // Fetch doctor info from the API
    axios.get('http://localhost:8080/doctor/8')
        .then((response) => {
            const data = response.data;
            if (data.errCode === 0) {
                setDoctorInfo({
                    name: data.data.fullname,
                    address: data.data.address,
                    gender: data.data.gender === 'Male' ? 'Nam' : 'Nữ',
                    birthdate: data.data.birthDate.split('T')[0],
                    specialty: data.data.specialtyName,
                    phone: data.data.phoneNumber,
                    email: data.data.email,
                    clinic: data.data.clinicName,
                    position: data.data.position,
                    image: data.data.image
                });
                console.log('Doctor data:', data);
            }
        })
        .catch((error) => console.error('Error fetching doctor data:', error));
}, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setSelectedFile(file); // Lưu trữ tệp ảnh trong trạng thái
      setPreviewImage(URL.createObjectURL(file)); // Tạo URL tạm thời cho ảnh và lưu trữ trong trạng thái
    } else {
      setDoctorInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);

    console.log('Updating doctor data:', doctorInfo);

    const formData = new FormData();
    formData.append('fullname', doctorInfo.name);
    formData.append('address', doctorInfo.address);
    const genderValue = doctorInfo.gender === 'Nam' ? 'Male' : doctorInfo.gender === 'Nữ' ? 'Female' : 'Other';
  formData.append('gender', genderValue);
    formData.append('birthDate', doctorInfo.birthdate);
    formData.append('phoneNumber', doctorInfo.phone);
    formData.append('email', doctorInfo.email);
    if (selectedFile) {
      formData.append('image', selectedFile); // Thêm tệp ảnh vào FormData
    }

    axios.put('http://localhost:8080/doctor/8', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        access_token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGVJZCI6IlIxIiwiaWF0IjoxNzMxMzM5MTQ2LCJleHAiOjE3MzEzNDI3NDZ9.GDvT6BIY8wcbkZa35cVlRtdLDRTONHQzPpMc-pdTWFQ` // Thay thế bằng token mới của bạn
      }
    })
      .then(response => {
        alert('Cập nhật thông tin thành công');
      })
      .catch(error => {
        console.error('Error updating doctor data:', error);
        alert('Cập nhật thông tin thất bại');
      });
  };

  console.log("doctorinfo",doctorInfo);

  const IMAGE_URL = 'http://localhost:8080/uploads/';
  return (
    
    <div className=" w-150 h-full px-40 border rounded-lg shadow-lg bg-white overflow-y-auto">
      {/* <h2 className="text-5xl font-bold text-center mb-6">Thông Tin Cá Nhân Bác Sĩ</h2> */}

      {/* Ảnh Avatar */}
<div className="top-3 flex justify-center mb-6 relative">
  <img
    src={previewImage || `${IMAGE_URL}${doctorInfo.image}`} // Thay thế URL này bằng link ảnh thực tế của bác sĩ
    alt="Doctor Avatar"
    className="w-48 h-48 rounded-full border-2 border-gray-300"
  />
  {isEditing && (
    <div>
    <label htmlFor="imageUpload" className="cursor-pointer">
        <FaCamera className="w-6 h-6 text-gray-600" />
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )}
</div>
      <div className="flex gap-1 relative top-5">
        {/* Cột 1 */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block font-semibold">Họ tên</label>
            <input
              type="text"
              name="name"
              value={doctorInfo.name}
              onChange={handleChange}
              disabled = {!isEditing}
              className={`w-1/2 p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={doctorInfo.address}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-1/2 p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>

          <div className="mb-4">
  <label className="block font-semibold">Giới tính</label>
  {isEditing ? (
    <select
      name="gender"
      value={doctorInfo.gender}
      onChange={handleChange}
      className="w-1/2 p-2 border rounded bg-white"
    >
      <option value="Nam">Nam</option>
      <option value="Nữ">Nữ</option>
      <option value="Khác">Khác</option>
    </select>
  ) : (
    <input
      type="text"
      name="gender"
      value={doctorInfo.gender}
      disabled={!isEditing}
      className="w-1/2 p-2 border rounded bg-gray-100"
    />
  )}
</div>

          <div className="mb-4">
            <label className="block font-semibold">Ngày sinh</label>
            <input
              type="date"
              name="birthdate"
              value={doctorInfo.birthdate}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-1/2 p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={doctorInfo.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-1/2 p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>
        </div>

        {/* Cột 2 */}
        <div className="flex-1">
          <div className="mb-4">
            <label className="block font-semibold">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={doctorInfo.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-1/2 p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Bệnh viện</label>
            <input
              type="text"
              name="clinic"
              value={doctorInfo.clinic}
              onChange={handleChange}
              disabled={true}
              className={`w-1/2 p-2 border rounded ${isEditing ? 'bg-gray-200' : 'bg-gray-100'}`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Chuyên khoa</label>
            <input
              type="text"
              name="specialty"
              value={doctorInfo.specialty}
              onChange={handleChange}
              disabled={true}
              className={`w-1/2 p-2 border rounded ${isEditing ? 'bg-gray-200' : 'bg-gray-100'}`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Học vị</label>
            <input
              type="text"
              name="position"
              value={doctorInfo.position}
              onChange={handleChange}
              disabled={true}
              className={`w-1/2 p-2 border rounded ${isEditing ? 'bg-gray-200' : 'bg-gray-100'}`}
            />
          </div>
        </div>
      </div>

      {/* Nút Chỉnh sửa và Lưu */}
      <div className="flex justify-center space-x-4 mt-6">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Chỉnh sửa
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Lưu thông tin
          </button>
        )}
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Hủy
          </button>
        )}
      </div>
    </div>
  );
}

export default DoctorProfile;