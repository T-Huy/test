import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginImg from '../../assets/img/pngegg.png';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { axiosClient } from '~/api/apiRequest';
import { jwtDecode } from 'jwt-decode';
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const { loginContext } = useContext(UserContext);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email không được để trống.');
        } else if (!emailPattern.test(email)) {
            setEmailError('Email không đúng định dạng.');
        }
        if (!password) {
            setPasswordError('Mật khẩu không được để trống.');
        }
        try {
            const res = await axiosClient.post(`/sign-in`, {
                email,
                password,
            });
            console.log(res);

            if (res.status === 'OK') {
                loginContext(email, res.access_token);
                toast.success('Đăng nhập thành công');
                const decodeToken = jwtDecode(res.access_token);
                console.log(decodeToken.roleId);

                if (decodeToken.roleId === 'R1') {
                    navigate('/admin/');
                } else if (decodeToken.roleId === 'R2') navigate('/doctor/');
                else {
                    navigate('/');
                }
            } else {
                console.log('why 1');

                toast.error('Đăng nhập thất bại');
            }
        } catch (error) {
            console.log('why 2');
            console.error(error);
            toast.error('Đăng nhập thất bại');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[50vh] h-[600px] bg-white shadow-md rounded-md w-[calc(100%-540px)] max-w-[1200px] mx-auto overflow-hidden">
            <div className="flex-1">
                <img className="w-full h-auto" src={loginImg} alt="loginImage" />
            </div>
            <div className="flex-1">
                <div className="p-12">
                    <div className="mb-6">
                        <h3 className="text-2xl font-normal text-gray-800">Đăng nhập</h3>
                    </div>
                    <div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="w-full h-[40px] mt-4 px-3 py-2  border border-gray-500 rounded-lg "
                                placeholder="Email của bạn"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {emailError && <span className="text-red-500  mt-1">{emailError}</span>}
                        </div>
                        <div className="mb-4 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full h-[40px] mt-4 px-3 py-2 border border-gray-500 rounded-lg "
                                placeholder="Mật khẩu của bạn"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className="absolute top-[63%] right-3 transform -translate-y-1/2 text-gray-500 "
                                onClick={toggleShowPassword}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                            {passwordError && <span className="text-red-500 mt-1">{passwordError}</span>}
                        </div>
                        <div className="text-right mb-4">
                            <a href="#" className="text-blue-500">
                                Quên mật khẩu
                            </a>
                        </div>
                        <div>
                            <button
                                className="w-full mt-3 text-white bg-blue-500 py-3 px-6 rounded hover:bg-blue-600"
                                onClick={handleSubmit}
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <span className="flex items-center m-8">
                            <span className="h-px flex-1 bg-black"></span>
                            <span className="shrink-0 px-6">Hoặc</span>
                            <span className="h-px flex-1 bg-black"></span>
                        </span>
                        <div className="flex justify-center items-center mt-5 bg-white px-9 py-2 border border-gray-300 cursor-pointer">
                            <a href="#" className="flex items-center text-gray-500">
                                <FontAwesomeIcon icon={faGoogle} className="text-lg" />
                                <span className="ml-3">Đăng nhập với Google</span>
                            </a>
                        </div>
                        <div className="text-center mt-3">
                            <span className="text-gray-500">Don't have an account?</span>
                            <a href="#" className="text-blue-500 ml-3 underline">
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
