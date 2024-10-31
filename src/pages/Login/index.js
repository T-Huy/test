import { useState } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loginImg from '../../assets/img/login-img.jpg';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

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
        <div className={cx('login-page')}>
            <div className={cx('login-page__image')}>
                <img className={cx('img')} src={loginImg} alt="loginImage" />
            </div>
            <div className={cx('login-page__form-container')}>
                <div className={cx('login-page__form-content')}>
                    <div className={cx('auth-form__header')}>
                        <h3 className="auth-form__heading">Đăng nhập</h3>
                    </div>

                    <div className={cx('auth-form__form')}>
                        <div className={cx('auth-form__group')}>
                            <input
                                type="text"
                                className={cx('auth-form__input')}
                                placeholder="Email của bạn"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        {emailError && <span className={cx('error-message')}>{emailError}</span>}
                        <div className={cx('auth-form__group')}>
                            <div className={cx('password-container')}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={cx('auth-form__input')}
                                    placeholder="Mật khẩu của bạn"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button type="button" className={cx('password-toggle')} onClick={toggleShowPassword}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {passwordError && <span className={cx('error-message')}>{passwordError}</span>}
                        </div>
                    </div>
                    <div className={cx('auth-form__actions')}>
                        <a href="#" className={cx('auth-form__forgot')}>
                            Quên mật khẩu
                        </a>
                    </div>
                    <div className={cx('auth-form__controls')}>
                        <button className={cx('auth-form__login')} onClick={handleSubmit}>
                            Đăng nhập
                        </button>
                    </div>

                    <div className={cx('auth-form__socials')}>
                        <a href="" className={cx('auth-form__socials--google')}>
                            <FontAwesomeIcon icon={faGoogle} className={cx('auth-form__socials-icon')} />
                            <span className={cx('auth-form__socials-title')}>Đăng nhập với google</span>
                        </a>
                    </div>
                    <div className={cx('sign-up')}>
                        <span className={cx('sign-up__text')}>Don't have an account?</span>
                        <a href="#" className={cx('sign-up__link')}>
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
