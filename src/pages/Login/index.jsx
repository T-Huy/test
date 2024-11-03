import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginImg from '../../assets/img/login-img.jpg';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.module.scss';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

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
            console.log('email', email);
            console.log('password', password);

            const res = await axios.post(`http://localhost:9000/user/sign-in`, {
                email,
                password,
            });
            console.log('res', res);

            if (res.status === 200) {
                localStorage.setItem('token', res.data.access_token);

                alert('Đăng nhập thành công');
                navigate('/');
            } else {
                alert('Đăng nhập thất bại');
            }
        } catch (error) {
            alert('Đăng nhập thất bại');
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
                                className="absolute right-3 transform -translate-y-1/2 text-gray-500 top-1/2"
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
                        <div className="flex justify-center items-center mt-5 bg-white px-9 py-2 border border-gray-300">
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
