import { Link } from 'react-router-dom';
import OfficeSwiper from '../components/OfficeSwiper';
import { useSelector } from 'react-redux';
import { setPageTitle } from '../redux/themeConfigSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const Contactus = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Contact Us'));
    }, [dispatch]);
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <div>
            <div className="bg-[url(/assets/images/inner-page-hero-bg.png)] bg-cover bg-bottom bg-no-repeat pt-[82px] lg:pt-[106px]">
                <div className="relative">
                    <div className="container">
                        <div className="items-center justify-between py-10 md:flex md:h-[400px] md:py-0">
                            <div className="heading relative mb-0 text-center ltr:md:text-left rtl:md:text-right">
                                <h6>Contact Us</h6>
                                <h4 className="!text-white">Get in touch with us</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contactus;
