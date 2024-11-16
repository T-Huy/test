import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();
    {
        console.log('===>');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }); // Khi pathname thay đổi, useEffect sẽ chạy và cuộn lên đầu trang

    return null; // Không render bất kỳ nội dung nào
}

export default ScrollToTop;
