import { useState } from 'react';
function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handlePasswordChange = (e) => {
        const inputValue = e.target.value;

        setPassword(inputValue);
    };

    return (
        <div className="wrappperr flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg">
                {/* Bên trái - Hình ảnh */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="https://via.placeholder.com/400"
                        alt="Register"
                        className="object-cover w-full h-full rounded-l-lg"
                    />
                </div>
                {/* Bên phải - Form đăng ký */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Đăng ký</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="fullName"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                                placeholder="Nhập họ tên của bạn"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                                placeholder="Nhập email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                                placeholder="Nhập mật khẩu của bạn"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Đăng ký
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">
                        Bạn đã có tài khoản?{' '}
                        <a href="#" className="text-blue-500 font-semibold">
                            Đăng nhập
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
