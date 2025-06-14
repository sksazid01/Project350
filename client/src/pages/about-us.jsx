import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
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
                </div>
            </section>

            <section className="relative py-14 lg:py-[100px] xl:-mt-[100px] flex items-center justify-center min-h-screen">
                <div className="relative w-full max-w-[1400px] mx-auto">
                    {/* Shadow layer - offset to the left */}
                    <div className="absolute top-3 -left-3 hidden h-full w-full rounded-[32px] bg-white/10 dark:bg-gray-dark/50 xl:inline-block"></div>

                    {/* Main white/black background */}
                    <div className="absolute top-0 left-0 z-[1] h-full w-full bg-white dark:bg-black xl:rounded-[32px]"></div>

                    {/* Content container */}
                    <div className="container relative z-[2] mx-auto px-4 py-16">
                        <div className="text-center mb-12">
                            <div className="heading mb-5">
                                <h6 className="text-primary">How SUSTclubs Works</h6>
                                <h4 className="text-3xl font-bold">Manage Clubs in 3 Simple Steps</h4>
                            </div>
                            <p className="pb-10 text-lg font-semibold leading-[30px] max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
                                SUSTclubs helps you manage clubs and get students involved easily at SUST.
                            </p>
                        </div>

                        <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3 max-w-[1000px] mx-auto">
                            <div data-aos="fade-up" data-aos-duration="1000">
                                <div className="flex items-start gap-[10px] rounded-[10px] border border-transparent bg-secondary/10 py-6 px-5 transition hover:border-secondary hover:bg-transparent">
                                    <span className="flex h-[50px] w-[50px] min-w-[50px] items-center justify-center rounded-full bg-secondary text-lg text-white">01</span>
                                    <div>
                                        <h6 className="mb-1 font-bold text-secondary">Sign Up</h6>
                                        <p className="text-sm font-semibold text-black dark:text-gray">
                                            Quickly create your club and add members.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000">
                                <div className="flex items-start gap-[10px] rounded-[10px] border border-transparent bg-secondary/10 py-6 px-5 transition hover:border-secondary hover:bg-transparent">
                                    <span className="flex h-[50px] w-[50px] min-w-[50px] items-center justify-center rounded-full bg-secondary text-lg text-white">02</span>
                                    <div>
                                        <h6 className="mb-1 font-bold text-secondary">Plan Events</h6>
                                        <p className="text-sm font-semibold text-black dark:text-gray">
                                            Easily schedule and share club activities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000">
                                <div className="flex items-start gap-[10px] rounded-[10px] border border-transparent bg-secondary/10 py-6 px-5 transition hover:border-secondary hover:bg-transparent">
                                    <span className="flex h-[50px] w-[50px] min-w-[50px] items-center justify-center rounded-full bg-secondary text-lg text-white">03</span>
                                    <div>
                                        <h6 className="mb-1 font-bold text-secondary">Track Engagement</h6>
                                        <p className="text-sm font-semibold text-black dark:text-gray">
                                            See how active members are and how events perform.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Aboutus;
