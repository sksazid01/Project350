import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import Testimonial from '../components/Testimonial';
import { setPageTitle } from '../redux/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Aboutus = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('About Us'));
    }, [dispatch]);
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <div>
            <div className="bg-[url(/assets/images/inner-page-hero-bg.png)] bg-cover bg-bottom bg-no-repeat pt-[82px] lg:pt-[106px]">
                <div className="relative">
                    <div className="container">
                        <div className="items-center justify-between py-10 md:flex md:h-[400px] md:py-0">
                            <div className="heading relative mb-0 text-center ltr:md:text-left rtl:md:text-right">
                                <h6>About Us</h6>
                                <h4 className="!text-white">About SUSTclubs</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-gradient-to-t from-white/[56%] to-white/0 py-14 dark:!bg-none lg:py-[100px]">
                <Counter title="Who we are" />
            </section>

            <section className="relative pt-14 lg:pb-48 lg:pt-[100px]">
                <div className="container relative z-[1] flex flex-col items-center justify-center">
                    <div className="text-center lg:w-1/2 ltr:lg:text-left rtl:lg:text-right">
                        <div className="heading mb-5 text-center ltr:lg:text-left rtl:lg:text-right xl:w-[95%]">
                            <h6>About Us</h6>
                            <h4>Boosting SUST Clubs with Tech</h4>
                        </div>
                        <p className="pb-10 text-lg font-semibold leading-[30px]">
                            SUSTclubs is an innovative project by SUST students. We aim to simplify club management and enhance member interaction through our platform.
                        </p>
                        <Link to="#" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-200">
                            Join Our Development Team
                        </Link>
                    </div>
                </div>
                <div className="bottom-0 ltr:right-0 rtl:left-0 lg:absolute" data-aos={isRtl ? 'fade-right' : 'fade-left'} data-aos-duration="1000">
                    <img src="/assets/images/about-bg.png" alt="SUSTclubs Development Team" className="rtl:rotate-y-180" />
                </div>
            </section>
        </div>
    );
};

export default Aboutus;
