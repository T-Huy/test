import React, { useEffect, useRef, useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdKeyboardDoubleArrowRight, MdSearch } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';
import { LiaStethoscopeSolid } from 'react-icons/lia';
import { CiHospital1 } from 'react-icons/ci';
import { BsCoin } from 'react-icons/bs';
import { Icon } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { axiosClient } from '~/api/apiRequest';

function Home() {
    const [facilities, setFacilities] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    console.log('doctor', doctors);
    const images = [
        'https://i.pinimg.com/736x/8b/d9/44/8bd944a2576148952682eacd62970fc8.jpg',
        'https://i.pinimg.com/736x/af/c5/53/afc553e12c89eef85f87e9f9a34e02a0.jpg',
        'https://i.pinimg.com/736x/3a/26/8d/3a268ddc724585a07b1306e051641417.jpg',
        'https://i.pinimg.com/736x/36/c5/28/36c5286f8f150bf662214022935332c4.jpg',
    ];


    const IMAGE_URL = 'http://localhost:9000/uploads/';

    const specialties = [
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2FChuyenKhoa.png&w=96&q=75',
            name: 'Bác sĩ Gia Đình',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fumc%2Fsubjects%2F1655710722460-TIEU_HOA_GAN_MAT.png&w=96&q=75',
            name: 'Tiêu Hóa Gan Mật',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fnoi_tong_quat.png&w=96&q=75',
            name: 'Nội Tổng Quát',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fnoi_tiet.png&w=96&q=75',
            name: 'Nội Tiết',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fda_lieu.png&w=96&q=75',
            name: 'Da liễu',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Ftim_mach.png&w=96&q=75',
            name: 'Nội Tim Mạch',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fthan_kinh.png&w=96&q=75',
            name: 'Nội Thần Kinh',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fnoi_co_xuong_khop.png&w=96&q=75',
            name: 'Nội Cơ Xương Khớp',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Ftai_mui_hong.png&w=96&q=75',
            name: 'Tai Mũi Họng',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fmat.png&w=96&q=75',
            name: 'Mắt',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Ftieu_hoa.png&w=96&q=75',
            name: 'Nội Tiêu Hoá',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fumc%2Fsubjects%2FPG%2F1651821563777-VIEM_GAN.png&w=96&q=75',
            name: 'Nội Truyền Nhiễm',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fho_hap.png&w=96&q=75',
            name: 'Nội Hô Hấp',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Ftiet_nieu.png&w=96&q=75',
            name: 'Nội Tiết Niệu',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fxuong_khop_chinh_hinh.png&w=96&q=75',
            name: 'Ngoại Cơ Xương Khớp',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Fsan_phu_khoa.png&w=96&q=75',
            name: 'Sản - Phụ Khoa',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2Fsubjects%2Frang_ham_mat.png&w=96&q=75',
            name: 'Răng Hàm Mặt',
        },
        {
            image: 'https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fmedpro-production%2Fdefault%2Favatar%2FChuyenKhoa.png&w=96&q=75',
            name: 'Y Học Cổ Truyền',
        },
    ];

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await axiosClient.get('/clinic/dropdown');

                if (response.errCode === 0) {
                    const formattedData = response.data.map((item) => ({
                        id: item.clinicId,
                        name: item.name,
                        location: item.address,
                        image: item.image,
                    }));
                    setFacilities(formattedData);
                } else {
                    console.error('Failed to fetch data:', response.message);
                    setFacilities([]);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setFacilities([]);
            }
        };
        fetchClinics();
    }, []);

    console.log('DOCTOR', doctors);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axiosClient.get('/doctor/dropdown');
                if (response.errCode === 0) {
                    const formattedData = response.data.map((item) => ({
                        id: item.doctorInforId,
                        position: item.position,
                        fullname: item.doctorId.fullname,
                        specialtyName: item.specialtyId.name,
                        clinicName: item.clinicId.name,
                        price: item.price,
                        image: item.doctorId.image,
                        userId: item.doctorId.userId,
                    }));
                    setDoctors(formattedData);
                } else {
                    console.error('Failed to fetch data:', response.message);
                    setDoctors([]);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setDoctors([]);
            }
        };
        fetchDoctors();
    }, []);

    //Slider
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevClinicIndex) => (prevClinicIndex + 1) % images.length);
        }, 4000); // Chuyển ảnh mỗi 4 giây
        return () => clearInterval(interval);
    }, [images.length]);

    const handleChangeImage = (index) => {
        setCurrentImageIndex(index);
    };

    //Bac Si
    const [currentIndexClinic, setcurrentIndexClinic] = useState(0);
    const itemsToShowClinic = 4;

    const nextClinic = () => {
        setcurrentIndexClinic((prevClinicIndex) =>
            prevClinicIndex + 1 + itemsToShowClinic <= facilities.length ? prevClinicIndex + 1 : 0,
        );
    };

    const prevClinic = () => {
        setcurrentIndexClinic((prevClinicIndex) =>
            prevClinicIndex - 1 >= 0 ? prevClinicIndex - 1 : facilities.length - itemsToShowClinic,
        );
    };

    //Doctor
    const [currentIndexDoctor, setcurrentIndexDoctor] = useState(0);
    const itemsToShowDoctor = 4;

    const nextDoctor = () => {
        setcurrentIndexDoctor((prevDoctorIndex) =>
            prevDoctorIndex + 1 + itemsToShowDoctor <= doctors.length ? prevDoctorIndex + 1 : 0,
        );
    };

    const prevDoctor = () => {
        setcurrentIndexDoctor((prevDoctorIndex) =>
            prevDoctorIndex - 1 >= 0 ? prevDoctorIndex - 1 : doctors.length - itemsToShowDoctor,
        );
    };

    const handleGetClinic = (clinicId, nameClinic) => {
        console.log('clinicId:', clinicId);
        console.log('nameClinic:', nameClinic);
        navigate(`/benh-vien?name=${nameClinic}`, {
            state: {
                clinicId,
            },
        });
    };

    const positions = ['P0', 'P1', 'P2']; // Mảng các giá trị cần so sánh

    const getPositionLabel = (position) => {
        if (position === 'P0') {
            return 'Bác sĩ';
        } else if (positions.includes(position)) {
            return 'Chức danh khác'; // Thay thế bằng nhãn phù hợp cho các giá trị khác trong mảng
        } else {
            return position; // Giá trị mặc định nếu không khớp với bất kỳ giá trị nào trong mảng
        }
    };

    const handleGetDoctor = (doctorId, doctorName) => {
        console.log('doctorId:', doctorId);
        navigate(`/bac-si/get?name=${doctorName}`, {
            state: {
                doctorId,
            },
        });
    };

    return (
        <div>
            <div>
                <div className="h-[500px] bg-sky-100 relative overflow-hidden mt-20">
                    {/* Background image */}
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    currentImageIndex === index ? 'opacity-100 z-10' : 'opacity-0'
                                }`}
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            ></div>
                        ))}
                    {/* Lớp phủ để làm mờ */}
                    {/* <div className="absolute inset-0 bg-slate-400 opacity-30 z-10"></div> */}
                    {/* Search */}
                    <div className="absolute left-0 right-0 top-52 z-20 max-w-5xl mx-auto ">
                        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                            Nền tảng công nghệ
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-8">
                            Kết nối người dân với Cơ sở - Dịch vụ Y tế
                        </h2>

                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full h-16 pl-8 px-4 pr-12 rounded-full shadow-lg text-2xl outline-none border border-transparent focus:border-neutral-600"
                            />
                            <MdSearch className="cursor-pointer absolute right-8 top-1/2 text-4xl transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <p className="text-center text-3xl text-white mb-8">
                            Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
                        </p>
                    </div>

                    {/* Dấu chấm điều hướng */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => handleChangeImage(index)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${
                                    currentImageIndex === index ? 'bg-sky-500' : 'bg-white'
                                }`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#f0f7ff] pt-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-[28px] font-bold text-[#003366] mb-8">CƠ SỞ Y TẾ</h2>
                    <div className="relative max-w-screen-xl px-4">
                        <div className="flex">
                            {facilities
                                .slice(currentIndexClinic, currentIndexClinic + itemsToShowClinic)
                                .map((facility) => (
                                    <div
                                        key={facility.id}
                                        className="w-[296.5px] mx-[8px] bg-white rounded-lg shadow-md cursor-pointer"
                                    >
                                        <div className="p-6">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="flex justify-center items-center h-[160px] w-[160px] rounded-full overflow-hidden">
                                                    <img
                                                        src={`http://localhost:${
                                                            import.meta.env.VITE_BE_PORT
                                                        }/uploads/${facility.image}`}
                                                        alt={facility.name}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>

                                                <div className="flex flex-col justify-between gap-6 w-full">
                                                    <h3 className="text-3xl font-semibold text-center h-[37.5px]">
                                                        {facility.name}
                                                    </h3>
                                                    <div className="flex items-start gap-2 text-gray-600 text-2xl h-[37.5px]">
                                                        <GrLocation className="mt-1" />
                                                        <span>{facility.location}</span>
                                                    </div>
                                                    <div
                                                        className="w-full text-center bg-[#00B5F1] hover:bg-white border hover:border-[#00B5F1] hover:text-[#00B5F1] text-white font-bold py-3 px-4 rounded-xl"
                                                        onClick={() => handleGetClinic(facility.id, facility.name)}
                                                    >
                                                        Đặt khám ngay
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <button
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md"
                            onClick={prevClinic}
                        >
                            <MdChevronLeft />
                        </button>
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md"
                            onClick={nextClinic}
                        >
                            <MdChevronRight />
                        </button>
                    </div>
                    <div className="flex items-center font-normal max-w-64 border border-transparent hover:border-[#00B5F1] hover:rounded-2xl mx-auto mt-5 px-8 py-[8px] text-3xl">
                        <NavLink to="#" className="flex items-center gap-1 text-[#00b5f1]">
                            Xem tất cả
                            <MdKeyboardDoubleArrowRight className="mt-1" />
                        </NavLink>
                    </div>

                    <p className="text-center text-3xl text-white mb-8">
                        Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
                    </p>
                </div>

                {/* Dấu chấm điều hướng */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                                currentImageIndex === index ? 'bg-sky-500' : 'bg-white'
                            }`}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="w-full bg-[#f0f7ff] pt-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-[28px] font-bold text-[#003366] mb-8">BÁC SĨ</h2>
                    <div className="relative max-w-screen-xl px-4">
                        <div className="flex">
                            {doctors.slice(currentIndexDoctor, currentIndexDoctor + itemsToShowDoctor).map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="w-[296.5px] mx-[8px] bg-white rounded-lg shadow-md cursor-pointer"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="flex justify-center items-center h-[160px] w-[160px] rounded-full overflow-hidden">
                                                <img
                                                    src={`http://localhost:${import.meta.env.VITE_BE_PORT}/uploads/${
                                                        doctor.image
                                                    }`}
                                                    alt={doctor.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>

                                            <div className="flex flex-col justify-between gap-4 w-full text-[#003553]">
                                                <div>
                                                    <h3 className="text-3xl font-normal text-left">
                                                        {getPositionLabel(doctor.position)}
                                                    </h3>
                                                    <h3 className="text-4xl font-semibold text-left truncate">
                                                        {doctor.fullname}
                                                    </h3>
                                                </div>
                                                <div className="flex flex-col gap-2 leading-[20px]">
                                                    <div className="flex items-start gap-2">
                                                        <LiaStethoscopeSolid className="mt-1" />
                                                        {doctor.specialtyName}
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <BsCoin className="mt-1" />
                                                        {doctor.price}
                                                    </div>
                                                    <div className="flex items-start gap-2">
                                                        <CiHospital1 className="mt-1" />
                                                        {doctor.clinicName}
                                                    </div>
                                                </div>
                                                <div
                                                    className="w-full text-center bg-[#00B5F1] hover:bg-white border hover:border-[#00B5F1] hover:text-[#00B5F1] text-white font-bold py-3 px-4 rounded-xl"
                                                    onClick={() => handleGetDoctor(doctor.userId, doctor.fullname)}
                                                >
                                                    Đặt khám ngay
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md"
                            onClick={prevDoctor}
                        >
                            <MdChevronLeft />
                        </button>
                        <button
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md"
                            onClick={nextDoctor}
                        >
                            <MdChevronRight />
                        </button>
                    </div>
                </div>
                <div className="flex items-center font-normal max-w-64 border border-transparent hover:border-[#00B5F1] hover:rounded-2xl mx-auto mt-5 px-8 py-[8px] text-3xl">
                    <NavLink to="#" className="flex items-center gap-1 text-[#00b5f1]">
                        Xem tất cả
                        <MdKeyboardDoubleArrowRight className="mt-1" />
                    </NavLink>
                </div>
            </div>

            <div className="w-full bg-[#f0f7ff] pt-24 pb-12">
                <div className="container mx-auto pb-8">
                    <h1 className="text-3xl font-bold text-center mb-8 text-[28px]">CHUYÊN KHOA</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {specialties.map((specialty, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="w-32 h- flex items-center justify-center mb-2">
                                    <img src={specialty.image} alt={specialty.name} />
                                </div>
                                <span className="text-2xl">{specialty.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
