import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { UserContext } from '~/context/UserContext';
import { toast } from 'react-toastify';
import { axiosClient, axiosInstance } from '~/api/apiRequest';

function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const { user } = useContext(UserContext);

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [showPassword_1, setShowPassword_1] = useState(false);
    const toggleShowPassword_1 = () => {
        setShowPassword_1(!showPassword_1);
    };

    const [showPassword_2, setShowPassword_2] = useState(false);
    const toggleShowPassword_2 = () => {
        setShowPassword_2(!showPassword_2);
    };

    const handleChangePassword = async () => {
        if (newPassword === confirmPassword) {
            // Gửi yêu cầu PUT tới API để thay đổi mật khẩu
            const response = await axiosInstance.post('/user/update-password', {
                userId: user.userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            });
            // console.log('Response::', response);
            if (response.status === 'OK') {
                toast.success('Mật khẩu đã được thay đổi thành công');
            } else {
                toast.error(response.message);
            }
        } else {
            toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
        }
    };
    return (
        <div>
            <h3 className="text-5xl font-semibold text-center">Đổi Mật Khẩu</h3>
            <div className="flex items-center justify-center mt-12">
                <div className=" ">
                    <div className="mb-4 relative">
                        <label htmlFor="oldPassword" className="block text-3xl">
                            Mật khẩu cũ
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="oldPassword"
                            className="w-[400px] p-2 border border-gray-300 rounded mt-5"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute top-[70%] right-3 transform -translate-y-1/2 text-gray-500 "
                            onClick={toggleShowPassword}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <div className="mb-4 relative mt-5">
                        <label htmlFor="newPassword" className="block text-3xl">
                            Mật khẩu mới
                        </label>
                        <input
                            type={showPassword_1 ? 'text' : 'password'}
                            id="newPassword"
                            className="w-full p-2 border border-gray-300 rounded mt-5"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute top-[70%] right-3 transform -translate-y-1/2 text-gray-500 "
                            onClick={toggleShowPassword_1}
                        >
                            <FontAwesomeIcon icon={showPassword_1 ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <div className="mb-4 relative mt-5">
                        <label htmlFor="confirmPassword" className="block text-3xl">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type={showPassword_2 ? 'text' : 'password'}
                            id="confirmPassword"
                            className="w-full p-2 border border-gray-300 rounded mt-5"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute top-[70%] right-3 transform -translate-y-1/2 text-gray-500 "
                            onClick={toggleShowPassword_2}
                        >
                            <FontAwesomeIcon icon={showPassword_2 ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <div className="mb-4 relative mt-10">
                        <button
                            type="submit"
                            onClick={handleChangePassword}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
