import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import { setPageTitle } from '../redux/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import '../assets/css/global.css';
import { ClubActivitiesBackground } from '../components/club_management_backgrounds';


const Aboutus = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('About Us'));
    }, [dispatch]);
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <div className="bg-starfield text-white">
            <div className="overflow-hidden pt-[82px] sm:-mx-[250px] sm:rounded-b-[50%] lg:-mx-[150px] lg:pt-[106px]">
                <div className="relative">
                    <ClubActivitiesBackground>
                    <div className="container">
                        <div className="items-center justify-between py-10 md:flex md:h-[400px] md:py-0">
                                <div className="heading relative mb-0 text-center ltr:md:text-left rtl:md:text-right md:w-2/3">
                                <h6>About Us</h6>
                                <h4 className="!text-white">About SUSTclubs</h4>
                            </div>
                                <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center md:justify-end">
                                    <Link to="/contact-us" className="btn btn-gradient border-0 uppercase shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-200">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ClubActivitiesBackground>
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

            <section className="relative py-8 lg:py-16 xl:-mt-[100px] flex items-center justify-center">
                <div className="relative w-full max-w-[1400px] mx-auto">
                    <div className="absolute top-3 -left-3 hidden h-full w-full rounded-[32px] bg-white/10 dark:bg-gray-dark/50 xl:inline-block"></div>

                    <div className="absolute top-0 left-0 z-[1] h-full w-full bg-white dark:bg-black xl:rounded-[32px]"></div>

                    <div className="container relative z-[2] mx-auto px-4 py-10">
                        <div className="text-center mb-8">
                            <div className="heading mb-3">
                                <h6 className="text-primary">How SUSTclubs Works</h6>
                                <h4 className="text-3xl font-bold">Manage Clubs in 3 Simple Steps</h4>
                            </div>
                            <p className="pb-6 text-lg font-semibold leading-[30px] max-w-[600px] mx-auto text-gray-500 dark:text-gray-400">
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


            <section className="py-14 lg:py-[100px]">
                <div className="container">
                    <div className="heading text-center">
                        <h6>Meet Our Team</h6>
                        <h4>Creative Minds</h4>
                    </div>
                    <div className="flex justify-center">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-[1000px]">
                        <div className="group cursor-pointer text-center">
                            <div className="relative h-[280px] rounded-3xl transition-all duration-500 group-hover:shadow-[0_0_25px_#979797]">
                                    <img src="/assets/images/mahfuj.jpg" alt="Md Mahfuj Alam" className="h-full w-full rounded-3xl object-cover object-top" />
                            </div>
                                <h4 className="pt-5 pb-2 text-xl font-extrabold text-black transition duration-500 group-hover:text-secondary dark:text-white">Md Mahfuj Alam</h4>
                                <h6 className="text-sm font-bold">Team Member 1</h6>
                        </div>
                        <div className="group cursor-pointer text-center">
                            <div className="relative h-[280px] rounded-3xl transition-all duration-500 group-hover:shadow-[0_0_25px_#979797]">
                                    <img src="/assets/images/sk.jpg" alt="Md Ahasanul Haque Sazid" className="h-full w-full rounded-3xl object-cover object-top" />
                            </div>
                                <h4 className="pt-5 pb-2 text-xl font-extrabold text-black transition duration-500 group-hover:text-secondary dark:text-white">Md Ahasanul Haque Sazid</h4>
                                <h6 className="text-sm font-bold">Team Member 2</h6>
                        </div>
                        <div className="group cursor-pointer text-center">
                            <div className="relative h-[280px] rounded-3xl transition-all duration-500 group-hover:shadow-[0_0_25px_#979797]">
                                    <img src="/assets/images/walid.jpg" alt="Md Latifur Rahman Walid" className="h-full w-full rounded-3xl object-cover object-top" />
                            </div>
                                <h4 className="pt-5 pb-2 text-xl font-extrabold text-black transition duration-500 group-hover:text-secondary dark:text-white">Md Latifur Rahman Walid</h4>
                                <h6 className="text-sm font-bold">Team Member 3</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="relative overflow-x-hidden border-t-2 border-transparent py-14 dark:border-gray/20 lg:py-[100px]">
                <div className="container">
                    <div className="relative text-center">
                        <div className="relative inline-block" data-aos="fade-down" data-aos-duration="1000">
                            <svg width="200" height="80" viewBox="0 0 200 80" className="mx-auto">
                                <text x="50%" y="50" textAnchor="middle" className="fill-primary text-5xl font-bold italic" style={{ fontFamily: 'cursive' }}>
                                    Stay
                                </text>
                            </svg>

                            <svg width="400" height="100" viewBox="0 0 400 100" className="mx-auto -mt-8">
                                <text x="50%" y="70" textAnchor="middle" className="fill-gray-200 text-7xl font-black tracking-wider opacity-20" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                                    UPDATED
                                </text>
                                </svg>
                        </div>
                        <p className="pt-2 text-center text-lg font-bold text-gray-dark dark:text-white">
                            Enter your email address to register to our newsletter subscription delivered on a regular basis!
                        </p>
                        <form action="" className="relative z-[1] pt-[50px] text-center" data-aos="fade-up" data-aos-duration="1000">
                            <div className="relative inline-block w-full sm:w-auto">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full rounded-3xl py-4 font-bold leading-5 outline-none ltr:pl-4 ltr:pr-[110px] rtl:pr-4 rtl:pl-[110px] dark:bg-gray-dark sm:w-[540px] sm:py-6 ltr:sm:pl-[30px] ltr:sm:pr-[140px] rtl:sm:pr-[30px] rtl:sm:pl-[140px]"
                                />
                                <button
                                    type="submit"
                                    className="absolute top-0 h-full bg-secondary px-4 font-extrabold uppercase text-white ltr:right-0 ltr:rounded-r-3xl rtl:left-0 rtl:rounded-l-3xl sm:px-7"
                                >
                                    submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="absolute bottom-20 ltr:left-0 rtl:right-0">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 10 L80 90 L20 90 Z" stroke="#7780A1" strokeWidth="2" fill="none" opacity="0.1" />
                    </svg>
                </div>
            </section>
        </div>
    );
};

export default Aboutus;
