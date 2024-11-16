import React, { useEffect, useState } from 'react';
import BackGround from '../../assets/img/background.png';
import { MdSearch } from 'react-icons/md';

function Home() {
    const images = [
        'https://i.pinimg.com/736x/8b/d9/44/8bd944a2576148952682eacd62970fc8.jpg',
        'https://i.pinimg.com/736x/af/c5/53/afc553e12c89eef85f87e9f9a34e02a0.jpg',
        'https://i.pinimg.com/736x/3a/26/8d/3a268ddc724585a07b1306e051641417.jpg',
        'https://i.pinimg.com/736x/36/c5/28/36c5286f8f150bf662214022935332c4.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Chuyển ảnh mỗi 4 giây
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div>
            <div className="h-[500px] bg-sky-100 relative overflow-hidden mt-20">
                {/* Background image */}
                <div className="relative w-full h-full overflow-hidden">
                    <div
                        className="flex transition-transform duration-1000 bg-opacity-5 z-0"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="min-w-full h-[500px] bg-cover bg-center"
                                style={{ backgroundImage: `url(${image})` }}
                            ></div>
                        ))}
                    </div>
                </div>
                {/* Lớp phủ để làm mờ */}
                {/* <div className="absolute inset-0 bg-slate-400 opacity-30 z-10"></div> */}
                {/* Search */}
                <div className="absolute left-0 right-0 top-52 z-20 max-w-5xl mx-auto ">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Nền tảng công nghệ</h1>
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
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-sky-500' : 'bg-white'}`}
                        ></div>
                    ))}
                </div>
            </div>

            
        </div>
    );
}

export default Home;
