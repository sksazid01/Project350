import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { setPageTitle } from '../redux/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { ClubActivitiesBackground } from '../components/club_management_backgrounds';
import '../assets/css/global.css'
import axios from 'axios';

const Marketing = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        city: '',
        message: ''
    });
    useEffect(() => {
        dispatch(setPageTitle('SUSTclubs'));
    }, [dispatch]);
    const isRtl = useSelector((state) => state.themeConfig.direction) === 'rtl' ? true : false;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    async function onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        const data = {
            service_id: "service_8ueqohp",
            template_id: "template_35e94ua",
            user_id: "V5nPVm2-HwEJNb5AG",
            template_params: {
                from_name: formData.name,
                from_email: formData.email,
                to_name: "The Development Team",
                message: `Message: ${formData.message} \nEmail: ${formData.email} \nPhone: ${formData.mobile}`,
            },
        };

        try {
            const res = await axios.post(
                "https://api.emailjs.com/api/v1.0/email/send",
                data
            );
            alert("Message sent successfully!");
            setFormData({ name: '', email: '', mobile: '', city: '', message: '' });
        } catch (error) {
            alert("Send Fail");
            console.error(error);
        }
    }

    return (
        <div className="bg-starfield text-white">
            <div className="overflow-hidden pt-[82px] sm:-mx-[250px] sm:rounded-b-[50%] lg:-mx-[150px] lg:pt-[106px]">
                <div className="relative">
                    <img src="/assets/images/banner-lefticon.png" alt="banner-lefticon" className="absolute left-0 top-20 sm:left-[250px] lg:left-[150px]" />
                    <img src="/assets/images/banner-rightIcon.png" alt="banner-rightIcon" className="absolute right-0 -top-4 sm:right-[250px] lg:right-[150px]" />
                    <ClubActivitiesBackground>
                        <div className="container">
                            <div className="relative z-[1] text-center text-white lg:w-3/5 xl:w-1/2 mx-auto">
                                <h2 className="text-4xl font-extrabold leading-normal sm:text-5xl lg:text-[70px] lg:leading-[90px]">
                                    Our <span className="italic text-primary">Campus</span> Our <span className="italic text-secondary">Club</span> Community
                                </h2>
                                <p className="my-8 text-lg lg:w-[90%] mx-auto">Shahjalal University of Science and Technology</p>
                                <Link to="/login" className="btn mx-auto mt-2 block w-fit bg-white">
                                    Explore Clubs
                                </Link>
                            </div>
                            <div
                                className="bottom-0 mx-auto mt-5 mb-2 w-auto ltr:right-0 rtl:left-0 md:w-[540px] lg:absolute lg:mb-0 lg:mt-0 xl:w-[650px]"
                                data-aos={isRtl ? 'fade-right' : 'fade-left'}
                                data-aos-duration="1000"
                                data-aos-offset="0"
                                data-aos-delay="200"
                            >
                            </div>
                        </div>
                    </ClubActivitiesBackground>
                </div>
            </div>

           
            <section className="py-12 dark:bg-starfield md:py-20">
  <div className="container">
    <div className="heading text-center">
      <h4>Platform Solutions</h4>
    </div>
    <div
      className="mt-24 grid grid-cols-1 gap-7 text-black ltr:text-right rtl:text-left sm:grid-cols-2 lg:grid-cols-3"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Card 1 */}
      <div className="relative flex flex-col items-center">
        <Link
          to="#"
          className="absolute -top-[54px] flex h-[108px] w-[108px] items-center justify-center rounded-full bg-secondary text-white shadow-[0_15px_30px_rgba(180,118,229,0.4)] group-hover:bg-black group-hover:shadow-[0_15px_30px_rgba(199,55,253,0.4)]"
          style={{ zIndex: 2 }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M26 4.33301C14.8417 4.33301 5.75 13.4247 5.75 24.583C5.75 35.7413 14.8417 44.833 26 44.833C37.1583 44.833 46.25 35.7413 46.25 24.583C46.25 13.4247 37.1583 4.33301 26 4.33301Z"
              fill="currentColor"
              opacity="0.4"
            />
            <path
              d="M26 16.25C23.1 16.25 20.75 18.6 20.75 21.5C20.75 24.4 23.1 26.75 26 26.75C28.9 26.75 31.25 24.4 31.25 21.5C31.25 18.6 28.9 16.25 26 16.25Z"
              fill="currentColor"
            />
            <path
              d="M35.75 36.5C35.75 32.0817 31.3317 28.5 26 28.5C20.6683 28.5 16.25 32.0817 16.25 36.5"
              fill="currentColor"
            />
          </svg>
        </Link>
        <div className="group relative flex flex-col items-center rounded-3xl border-2 border-transparent bg-white p-6 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:!shadow-none dark:hover:bg-secondary w-full mt-[54px]">
          <h3 className="text-[22px] font-extrabold dark:text-white dark:group-hover:text-black text-center">Member Management</h3>
          <p className="text-lg mt-4 font-semibold text-gray dark:group-hover:text-black text-center">
            Effortlessly manage club members with our integrated system. Track attendance, assign roles, and maintain member profiles all in one place.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative flex flex-col items-center">
        <Link
          to="#"
          className="absolute -top-[54px] flex h-[108px] w-[108px] items-center justify-center rounded-full bg-secondary text-white shadow-[0_15px_30px_rgba(180,118,229,0.4)] group-hover:bg-black group-hover:shadow-[0_15px_30px_rgba(199,55,253,0.4)]"
          style={{ zIndex: 2 }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              opacity="0.4"
              d="M39 6.5H13C8.85786 6.5 5.5 9.85786 5.5 14V31C5.5 35.1421 8.85786 38.5 13 38.5H39C43.1421 38.5 46.5 35.1421 46.5 31V14C46.5 9.85786 43.1421 6.5 39 6.5Z"
              fill="currentColor"
            />
            <path
              d="M39 38.5H13C8.85786 38.5 5.5 35.1421 5.5 31V38C5.5 42.1421 8.85786 45.5 13 45.5H39C43.1421 45.5 46.5 42.1421 46.5 38V31C46.5 35.1421 43.1421 38.5 39 38.5Z"
              fill="currentColor"
            />
            <path
              d="M16 17.5H21M16 23.5H30M16 29.5H36"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>
        <div className="group relative flex flex-col items-center rounded-3xl border-2 border-transparent bg-white p-6 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:!shadow-none dark:hover:bg-secondary w-full mt-[54px]">
          <h3 className="text-[22px] font-extrabold dark:text-white dark:group-hover:text-black text-center">Event Coordination</h3>
          <p className="text-lg mt-4 font-semibold text-gray dark:group-hover:text-black text-center">
            Plan and coordinate club events seamlessly. Create event calendars, manage registrations, and track participation with our comprehensive tools.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative flex flex-col items-center">
        <Link
          to="#"
          className="absolute -top-[54px] flex h-[108px] w-[108px] items-center justify-center rounded-full bg-secondary text-white shadow-[0_15px_30px_rgba(180,118,229,0.4)] group-hover:bg-black group-hover:shadow-[0_15px_30px_rgba(199,55,253,0.4)]"
          style={{ zIndex: 2 }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              opacity="0.4"
              d="M26 46.25C37.1797 46.25 46.25 37.1797 46.25 26C46.25 14.8203 37.1797 5.75 26 5.75C14.8203 5.75 5.75 14.8203 5.75 26C5.75 37.1797 14.8203 46.25 26 46.25Z"
              fill="currentColor"
            />
            <path
              d="M26 13V26L34 34"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 6H32M20 46H32"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>
        <div className="group relative flex flex-col items-center rounded-3xl border-2 border-transparent bg-white p-6 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:border-white/10 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.04] dark:to-transparent dark:!shadow-none dark:hover:bg-secondary w-full mt-[54px]">
          <h3 className="text-[22px] font-extrabold dark:text-white dark:group-hover:text-black text-center">Activity Tracking</h3>
          <p className="text-lg mt-4 font-semibold text-gray dark:group-hover:text-black text-center">
            Monitor club activities and progress in real-time. Generate reports, track goals, and showcase your club's achievements to the university community.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

            

            <section className="py-14 lg:py-[100px]">
                <div className="container relative">
                    <div className="heading text-center">
                        <h4 className="!text-white">
                            Building Stronger Campus <span className="text-primary">Communities</span>
                        </h4>
                    </div>

                    <div className="mx-auto grid max-w-[250px] gap-[30px] ltr:text-right rtl:text-left sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
                        <div
                            className="group flex cursor-pointer items-center gap-4 rounded-3xl bg-gray-dark py-10 px-6 transition duration-500 hover:bg-secondary"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <div className="flex-1">
                                <div className="pb-2.5 text-4xl font-black leading-none transition group-hover:text-black">
                                    <CountUp start={0} end={18} duration={3} suffix="+"></CountUp>
                                </div>
                                <span className="font-semibold text-white transition group-hover:text-black">Clubs</span>
                            </div>
                            <div className="shrink-0 text-[#47BDFF] group-hover:text-black">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_132_8975)">
                                        <path
                                            opacity="0.3"
                                            d="M9.26504 23.1907C8.86698 22.5979 9.34237 21.8701 10.0565 21.8701H15.3123C16.0264 21.8701 16.5018 22.5979 16.1037 23.1907C15.3466 24.3185 14.3 25.2316 13.0656 25.8283C12.8248 25.9448 12.544 25.9448 12.3032 25.8283C11.0688 25.2316 10.0222 24.3185 9.26504 23.1907Z"
                                            fill="currentcolor"
                                        />
                                        <path
                                            d="M19.7602 15.3657C19.7602 15.6093 19.8491 15.8444 20.0102 16.0271L21.8688 18.1348C22.0299 18.3175 22.1188 18.5527 22.1188 18.7962V19.6908C22.1188 20.2431 21.6711 20.6908 21.1188 20.6908H4.25C3.69772 20.6908 3.25 20.2431 3.25 19.6908V18.7962C3.25 18.5527 3.33888 18.3175 3.49997 18.1348L5.35863 16.0271C5.51971 15.8444 5.6086 15.6093 5.6086 15.3657V8.89781C5.6086 4.89015 8.41975 1.46516 12.3859 0.0983C12.5792 0.0316815 12.7896 0.0316814 12.9829 0.0982998C16.949 1.46516 19.7602 4.89015 19.7602 8.89781V15.3657ZM12.6844 11.2564C13.3099 11.2564 13.9098 11.0079 14.3522 10.5656C14.7945 10.1233 15.043 9.52335 15.043 8.89781C15.043 8.27227 14.7945 7.67235 14.3522 7.23003C13.9098 6.78771 13.3099 6.53921 12.6844 6.53921C12.0589 6.53921 11.4589 6.78771 11.0166 7.23003C10.5743 7.67235 10.3258 8.27227 10.3258 8.89781C10.3258 9.52335 10.5743 10.1233 11.0166 10.5656C11.4589 11.0079 12.0589 11.2564 12.6844 11.2564Z"
                                            fill="currentcolor"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_132_8975">
                                            <rect width="26" height="26" fill="currentcolor" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        <div
                            className="group flex cursor-pointer items-center gap-4 rounded-3xl bg-gray-dark py-10 px-6 transition duration-500 hover:bg-secondary"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <div className="flex-1">
                                <div className="pb-2.5 text-4xl font-black leading-none transition group-hover:text-black">
                                    <CountUp start={0} end={54} duration={4} suffix="+"></CountUp>
                                </div>
                                <span className="font-bold text-white transition group-hover:text-black">Club Partners</span>
                            </div>
                            <div className="shrink-0 text-[#47BDFF] group-hover:text-black">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_132_8984)">
                                        <path
                                            opacity="0.3"
                                            d="M4.2757 15.6076C4.27493 15.6076 4.27425 15.6081 4.27403 15.6089C4.06737 16.3063 3.94528 17.026 3.9104 17.7526L3.9 18.1998V24.9998C3.9 25.5521 3.45228 25.9998 2.9 25.9998H1C0.447715 25.9998 1.18712e-07 25.5521 1.18712e-07 24.9998V20.1498C-0.000255849 19.0287 0.413437 17.9469 1.16173 17.112C1.91001 16.2771 2.94021 15.7479 4.0547 15.6258L4.2757 15.6076ZM22.0225 17.0045C21.9324 16.3159 22.4694 15.6611 23.1157 15.9154C23.7351 16.1593 24.299 16.5382 24.7632 17.0314C25.5575 17.8755 25.9998 18.9908 26 20.1498V24.9998C26 25.5521 25.5523 25.9998 25 25.9998H23.1C22.5477 25.9998 22.1 25.5521 22.1 24.9998V18.1998C22.1 17.7945 22.0737 17.3956 22.0225 17.0045ZM4.55 7.7998C5.41195 7.7998 6.2386 8.14221 6.8481 8.75171C7.45759 9.3612 7.8 10.1879 7.8 11.0498C7.8 11.9118 7.45759 12.7384 6.8481 13.3479C6.2386 13.9574 5.41195 14.2998 4.55 14.2998C3.68805 14.2998 2.8614 13.9574 2.2519 13.3479C1.64241 12.7384 1.3 11.9118 1.3 11.0498C1.3 10.1879 1.64241 9.3612 2.2519 8.75171C2.8614 8.14221 3.68805 7.7998 4.55 7.7998ZM21.45 7.7998C22.312 7.7998 23.1386 8.14221 23.7481 8.75171C24.3576 9.3612 24.7 10.1879 24.7 11.0498C24.7 11.9118 24.3576 12.7384 23.7481 13.3479C23.1386 13.9574 22.312 14.2998 21.45 14.2998C20.588 14.2998 19.7614 13.9574 19.1519 13.3479C18.5424 12.7384 18.2 11.9118 18.2 11.0498C18.2 10.1879 18.5424 9.3612 19.1519 8.75171C19.7614 8.14221 20.588 7.7998 21.45 7.7998Z"
                                            fill="currentcolor"
                                        />
                                        <path
                                            d="M13 11.7C14.7239 11.7 16.3772 12.3848 17.5962 13.6038C18.8152 14.8228 19.5 16.4761 19.5 18.2V25C19.5 25.5523 19.0523 26 18.5 26H7.5C6.94772 26 6.5 25.5523 6.5 25V18.2C6.5 16.4761 7.18482 14.8228 8.40381 13.6038C9.62279 12.3848 11.2761 11.7 13 11.7ZM13 0C14.3791 0 15.7018 0.547856 16.677 1.52304C17.6521 2.49823 18.2 3.82087 18.2 5.2C18.2 6.57913 17.6521 7.90177 16.677 8.87696C15.7018 9.85214 14.3791 10.4 13 10.4C11.6209 10.4 10.2982 9.85214 9.32304 8.87696C8.34786 7.90177 7.8 6.57913 7.8 5.2C7.8 3.82087 8.34786 2.49823 9.32304 1.52304C10.2982 0.547856 11.6209 0 13 0Z"
                                            fill="currentcolor"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_132_8984">
                                            <rect width="26" height="26" fill="currentcolor" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        <div
                            className="group flex cursor-pointer items-center gap-4 rounded-3xl bg-gray-dark py-10 px-6 transition duration-500 hover:bg-secondary"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <div className="flex-1">
                                <div className="pb-2.5 text-4xl font-black leading-none transition group-hover:text-black">
                                    <CountUp start={0} end={5000} duration={4} suffix="+"></CountUp>
                                </div>
                                <span className="font-bold text-white transition group-hover:text-black">Happy Members</span>
                            </div>
                            <div className="shrink-0 text-[#47BDFF] group-hover:text-black">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_132_8993)">
                                        <path opacity="0.3" d="M13 26C5.8201 26 0 20.1799 0 13C0 5.8201 5.8201 0 13 0C20.1799 0 26 5.8201 26 13C26 20.1799 20.1799 26 13 26Z" fill="currentcolor" />
                                        <path
                                            d="M6.49961 14.2998C6.49961 16.0237 7.18443 17.677 8.40342 18.896C9.6224 20.115 11.2757 20.7998 12.9996 20.7998C14.7235 20.7998 16.3768 20.115 17.5958 18.896C18.8148 17.677 19.4996 16.0237 19.4996 14.2998H16.8996C16.8996 15.3341 16.4887 16.3261 15.7573 17.0575C15.0259 17.7889 14.034 18.1998 12.9996 18.1998C11.9653 18.1998 10.9733 17.7889 10.2419 17.0575C9.5105 16.3261 9.09961 15.3341 9.09961 14.2998H6.49961ZM7.79961 11.6998C8.31678 11.6998 8.81277 11.4944 9.17847 11.1287C9.54416 10.763 9.74961 10.267 9.74961 9.7498C9.74961 9.23263 9.54416 8.73664 9.17847 8.37095C8.81277 8.00525 8.31678 7.7998 7.79961 7.7998C7.28244 7.7998 6.78645 8.00525 6.42075 8.37095C6.05505 8.73664 5.84961 9.23263 5.84961 9.7498C5.84961 10.267 6.05505 10.763 6.42075 11.1287C6.78645 11.4944 7.28244 11.6998 7.79961 11.6998ZM18.1996 11.6998C18.7168 11.6998 19.2128 11.4944 19.5785 11.1287C19.9442 10.763 20.1496 10.267 20.1496 9.7498C20.1496 9.23263 19.9442 8.73664 19.5785 8.37095C19.2128 8.00525 18.7168 7.7998 18.1996 7.7998C17.6824 7.7998 17.1864 8.00525 16.8208 8.37095C16.4551 8.73664 16.2496 9.23263 16.2496 9.7498C16.2496 10.267 16.4551 10.763 16.8208 11.1287C17.1864 11.4944 17.6824 11.6998 18.1996 11.6998Z"
                                            fill="currentcolor"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_132_8993">
                                            <rect width="26" height="26" fill="currentcolor" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        <div
                            className="group flex cursor-pointer items-center gap-4 rounded-3xl bg-gray-dark py-10 px-6 transition duration-500 hover:bg-secondary"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <div className="flex-1">
                                <div className="pb-2.5 text-4xl font-black leading-none transition group-hover:text-black">
                                    <CountUp start={0} end={199} duration={4} suffix="+"></CountUp>
                                </div>
                                <span className="font-bold text-white transition group-hover:text-black">Project Done</span>
                            </div>
                            <div className="shrink-0 text-[#47BDFF] group-hover:text-black">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_132_9002)">
                                        <path
                                            d="M1.31194 8.73486H24.6881C24.8695 8.73478 25.049 8.77235 25.2151 8.84519C25.3813 8.91803 25.5305 9.02456 25.6534 9.15805C25.7763 9.29153 25.8702 9.44906 25.929 9.62067C25.9879 9.79229 26.0105 9.97425 25.9955 10.1551L24.9018 23.2686C24.8745 23.5962 24.7251 23.9017 24.4832 24.1244C24.2413 24.3472 23.9245 24.4709 23.5957 24.4711H2.40429C2.07547 24.4709 1.75871 24.3472 1.5168 24.1244C1.27489 23.9017 1.12548 23.5962 1.09819 23.2686L0.00452488 10.1551C-0.010534 9.97425 0.0120899 9.79229 0.0709658 9.62067C0.129842 9.44906 0.223688 9.29153 0.346571 9.15805C0.469454 9.02456 0.618698 8.91803 0.784866 8.84519C0.951034 8.77235 1.13051 8.73478 1.31194 8.73486Z"
                                            fill="currentcolor"
                                        />
                                        <path
                                            opacity="0.3"
                                            d="M14.5617 3.1965C14.7493 3.38404 15.0036 3.4894 15.2689 3.4894H23.4912C23.839 3.4894 24.1725 3.62756 24.4185 3.87348C24.6644 4.11941 24.8025 4.45296 24.8025 4.80075V5.1121C24.8025 5.66438 24.3548 6.1121 23.8025 6.1121H2.19824C1.64596 6.1121 1.19824 5.66438 1.19824 5.1121V2.17805C1.19824 1.83026 1.3364 1.49671 1.58233 1.25078C1.82825 1.00486 2.1618 0.866699 2.50959 0.866699H11.8177C12.0829 0.866699 12.3373 0.972056 12.5248 1.15959L14.5617 3.1965Z"
                                            fill="currentcolor"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_132_9002">
                                            <rect width="26" height="26" fill="currentcolor" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section
                className="relative overflow-hidden py-10 lg:py-20"
            //             style={{
            //                 background: `
            //   radial-gradient(ellipse at top center, #fa238a33 0%, #22113a 30%),
            //   linear-gradient(to bottom, #22113a 70%, #191132 100%)
            // `
            //             }}
            >
                {/* Stars overlay */}
                <div className="pointer-events-none absolute inset-0 z-0">
                    <svg width="100%" height="100%">
                        {/* You can adjust or duplicate these for more stars */}
                        <circle cx="25" cy="40" r="1.6" fill="#fff" opacity="0.8" />
                        <circle cx="100" cy="180" r="1.2" fill="#fff" opacity="0.7" />
                        <circle cx="260" cy="90" r="0.8" fill="#fff" opacity="0.75" />
                        <circle cx="210" cy="200" r="1.1" fill="#fff" opacity="0.6" />
                        <circle cx="65" cy="110" r="1.4" fill="#fff" opacity="0.5" />

                        {/* Add more stars if needed */}
                    </svg>
                </div>

                <div className="container relative z-10">
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <div className="mb-6 flex items-center justify-center gap-2.5">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M0 0H20V20H0V0Z" fill="#47BDFF" />
                                </svg>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="6.5" stroke="#B476E5" strokeWidth="7" />
                                </svg>
                            </div>
                            <div className="heading mb-0 text-center">
                                <h6 className="!text-secondary">Our Process</h6>
                                <h4>Three Simple Steps to Accelerate Your Growth</h4>
                            </div>
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-10 text-center items-center justify-center">
                                <div className="flex flex-col items-center">
                                    <h2 className="text-[60px] font-extrabold leading-[50px] text-secondary">1</h2>
                                    <p className="mt-2 text-xl font-semibold">Become a Member</p>
                                    <span className="mt-1 text-base text-gray-400">Sign up and join an exciting club community.</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h2 className="text-[60px] font-extrabold leading-[50px] text-primary">2</h2>
                                    <p className="mt-2 text-xl font-semibold">Participate & Connect</p>
                                    <span className="mt-1 text-base text-gray-400">Engage in club activities and make new connections.</span>
                                </div>
                                <div className="flex flex-col items-center relative">
                                    <span className="absolute inset-x-0 -top-12 pointer-events-none -z-10">
                                        <img src="/assets/images/marketing/shadow-box.svg" alt="" />
                                    </span>
                                    <h2 className="text-[60px] font-extrabold leading-[50px] text-secondary">3</h2>
                                    <p className="mt-2 text-xl font-semibold">Grow & Succeed</p>
                                    <span className="mt-1 text-base text-gray-400">Broaden your horizons and unlock new opportunities.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="relative py-10 md:py-20 dark:bg-starfield">
                <div className="container">
                    <div className="heading text-center">
                        <h6 className="!text-secondary">Our core values</h6>
                        <h4>The principles guiding our university clubs</h4>
                    </div>
                    <div className="grid grid-cols-1 justify-between gap-7 ltr:text-right rtl:text-left md:grid-cols-2" data-aos="fade-up" data-aos-duration="1000">
                        <div className="group flex gap-6 rounded-[32px] border-2 border-white/[0.1] bg-white py-10 px-6 duration-200 hover:border-secondary hover:bg-secondary/20 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent">
                            <div className="flex-1">
                                <h3 className="text-2xl font-extrabold text-primary">Leadership</h3>
                                <p className="mt-4 text-lg font-semibold">
                                    We foster leadership skills, empowering students to take initiative and guide their peers towards shared goals and visions.
                                </p>
                            </div>
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgba(71,189,255,0.06)] text-[#47BDFF]">
                                <svg width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M33.6822 11.1466L31.4947 7.35783C31.2046 6.85537 30.7268 6.48878 30.1665 6.33863C29.606 6.18848 29.009 6.26709 28.5066 6.55717L26.9578 7.45191C25.4683 6.11519 23.7148 5.10614 21.8106 4.49V2.6875C21.8106 2.10734 21.5801 1.55091 21.1699 1.14071C20.7597 0.73044 20.2033 0.5 19.6231 0.5H15.2481C14.668 0.5 14.1115 0.73044 13.7013 1.14071C13.2911 1.55091 13.0606 2.10734 13.0606 2.6875V4.48342C11.1508 5.09487 9.3932 6.10602 7.90472 7.44967L6.36031 6.55717C5.85869 6.26989 5.26376 6.19282 4.70544 6.34283C4.14719 6.49284 3.67098 6.85775 3.38097 7.35783L1.19347 11.1466C0.903388 11.649 0.824779 12.2461 0.974929 12.8064C1.12508 13.3668 1.49167 13.8446 1.99406 14.1347L3.55156 15.0359C3.13149 16.9919 3.13149 19.0147 3.55156 20.9706L1.99406 21.8697C1.49167 22.1597 1.12508 22.6376 0.974929 23.1979C0.824779 23.7583 0.903388 24.3554 1.19347 24.8578L3.38097 28.6466C3.67105 29.149 4.1488 29.5156 4.70922 29.6657C5.26957 29.8159 5.86667 29.7372 6.36906 29.4472L7.91781 28.5525C9.40734 29.892 11.1628 30.902 13.0694 31.5166V33.3125C13.0694 33.8927 13.2998 34.4491 13.7101 34.8593C14.1203 35.2696 14.6767 35.5 15.2569 35.5H19.6319C20.212 35.5 20.7684 35.2696 21.1787 34.8593C21.5889 34.4491 21.8194 33.8927 21.8194 33.3125V31.5187C23.7277 30.9067 25.4844 29.8964 26.9731 28.5547L28.5153 29.4472C29.0178 29.7372 29.6148 29.8159 30.1752 29.6657C30.7356 29.5156 31.2133 29.149 31.5035 28.6466L33.691 24.8578C33.981 24.3554 34.0596 23.7583 33.9094 23.1979C33.7594 22.6376 33.3927 22.1597 32.8903 21.8697L31.335 20.9728C31.7562 19.0155 31.7562 16.991 31.335 15.0338L32.8903 14.1347C33.3912 13.8431 33.756 13.3647 33.9045 12.8045C34.0529 12.2442 33.973 11.6479 33.6822 11.1466ZM17.4356 25.6562C15.9214 25.6562 14.4411 25.2072 13.182 24.3659C11.923 23.5247 10.9417 22.3289 10.3622 20.9299C9.78268 19.5309 9.63106 17.9915 9.92646 16.5063C10.2219 15.0211 10.9511 13.657 12.0218 12.5862C13.0926 11.5155 14.4568 10.7863 15.942 10.4909C17.4272 10.1954 18.9665 10.347 20.3656 10.9266C21.7646 11.506 22.9603 12.4874 23.8016 13.7464C24.6428 15.0055 25.0919 16.4858 25.0919 18C25.0919 20.0306 24.2852 21.978 22.8494 23.4138C21.4136 24.8496 19.4662 25.6562 17.4356 25.6562Z"
                                        fill="currentcolor"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="group flex gap-6 rounded-[32px] border-2 border-white/[0.1] bg-white py-10 px-6 duration-200 hover:border-secondary hover:bg-secondary/20 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent">
                            <div className="flex-1">
                                <h3 className="text-2xl font-extrabold text-secondary">Inclusivity</h3>
                                <p className="mt-4 text-lg font-semibold">
                                    We embrace diversity and create an inclusive environment where all students feel welcome, valued, and respected regardless of their background.
                                </p>
                            </div>
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgba(180,118,229,0.06)] text-[#B476E5]">
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.8133 0.821289C13.6502 0.821289 10.5582 1.75924 7.92817 3.51658C5.29817 5.27392 3.2483 7.77167 2.03784 10.694C0.827388 13.6163 0.51066 16.8319 1.12771 19.9343C1.74483 23.0365 3.26798 25.8862 5.50469 28.1228C7.74133 30.3596 10.591 31.8827 13.6933 32.4998C16.7956 33.1169 20.0112 32.8001 22.9335 31.5897C25.8559 30.3792 28.3536 28.3294 30.111 25.6994C31.8683 23.0694 32.8062 19.9773 32.8062 16.8142C32.8013 12.5741 31.1147 8.50915 28.1166 5.51096C25.1184 2.51278 21.0534 0.826226 16.8133 0.821289ZM26.0453 11.7498L16.9226 24.1296C16.8149 24.2725 16.6798 24.3925 16.5253 24.4827C16.3707 24.5728 16.1997 24.6312 16.0222 24.6545C15.8449 24.6778 15.6646 24.6656 15.4919 24.6185C15.3193 24.5714 15.1578 24.4904 15.0168 24.3802L8.50238 19.1718C8.36568 19.0624 8.25185 18.9272 8.16744 18.7738C8.08302 18.6204 8.02962 18.4519 8.01036 18.278C7.97135 17.9265 8.07356 17.5741 8.29448 17.2979C8.51539 17.0219 8.83691 16.8449 9.18834 16.8059C9.36232 16.7867 9.53844 16.8018 9.70658 16.8506C9.87471 16.8993 10.0316 16.9807 10.1683 17.09L15.6005 21.4361L23.8995 10.1731C23.9994 10.0232 24.1287 9.89511 24.2795 9.79658C24.4303 9.69798 24.5996 9.63101 24.777 9.59972C24.9544 9.56843 25.1363 9.57344 25.3118 9.6144C25.4873 9.65542 25.6525 9.73156 25.7977 9.83823C25.9429 9.94489 26.065 10.0799 26.1565 10.2351C26.248 10.3903 26.3071 10.5624 26.3303 10.7411C26.3535 10.9198 26.3401 11.1012 26.2911 11.2746C26.2421 11.448 26.1585 11.6096 26.0453 11.7498Z"
                                        fill="currentcolor"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="group flex gap-6 rounded-[32px] border-2 border-white/[0.1] bg-white py-10 px-6 duration-200 hover:border-secondary hover:bg-secondary/20 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent">
                            <div className="flex-1">
                                <h3 className="text-2xl font-extrabold text-secondary">Innovation</h3>
                                <p className="mt-4 text-lg font-semibold">
                                    We encourage creative thinking and innovative approaches to club activities, events, and problem-solving within our university community.
                                </p>
                            </div>
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgba(180,118,229,0.06)] text-[#B476E5]">
                                <svg width="39" height="23" viewBox="0 0 39 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.41997 22.2C3.0107 22.2012 3.57945 21.9763 4.00967 21.5715L14.2216 11.993C14.3677 11.8547 14.5621 11.779 14.7633 11.782C14.9645 11.785 15.1565 11.8665 15.2985 12.0091L18.7335 15.4457C19.767 16.4323 21.1408 16.9828 22.5696 16.9828C23.9984 16.9828 25.3722 16.4323 26.4057 15.4457L32.1553 9.69598C32.1912 9.66 32.2338 9.63151 32.2807 9.61205C32.3275 9.59252 32.3779 9.58251 32.4286 9.58251C32.4794 9.58251 32.5297 9.59252 32.5765 9.61205C32.6234 9.63151 32.6661 9.66 32.7019 9.69598L35.4248 12.4093C35.7156 12.6987 36.1092 12.8611 36.5195 12.861C36.9305 12.8605 37.3245 12.6972 37.6153 12.4067C37.9061 12.1163 38.0698 11.7224 38.0706 11.3114V2.04953C38.0702 1.63842 37.9066 1.24432 37.6158 0.953751C37.3249 0.663251 36.9306 0.500012 36.5195 0.500012H27.2206C26.9128 0.498822 26.6116 0.589332 26.3554 0.760062C26.0992 0.930722 25.8997 1.17383 25.7823 1.45838C25.6649 1.74293 25.6348 2.05597 25.696 2.35767C25.7573 2.65937 25.9069 2.93601 26.126 3.15224L28.8586 5.88483C28.9314 5.95777 28.9724 6.05661 28.9727 6.15972C28.9729 6.21054 28.9629 6.26094 28.9433 6.30784C28.9237 6.35481 28.8949 6.3973 28.8586 6.43293L23.1169 12.1762C22.971 12.3205 22.774 12.4015 22.5688 12.4015C22.3635 12.4015 22.1666 12.3205 22.0207 12.1762L18.584 8.73957C17.593 7.73857 16.2499 7.16443 14.8415 7.13986C13.4331 7.11522 12.0707 7.64197 11.0453 8.60776L0.830203 18.1783C0.491543 18.4975 0.256413 18.911 0.155263 19.3652C0.054043 19.8195 0.0914927 20.2937 0.262713 20.7265C0.433933 21.1593 0.731013 21.5307 1.11559 21.7928C1.50017 22.055 1.95454 22.1957 2.41997 22.1968V22.2Z"
                                        fill="currentcolor"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="group flex gap-6 rounded-[32px] border-2 border-white/[0.1] bg-white py-10 px-6 duration-200 hover:border-secondary hover:bg-secondary/20 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent">
                            <div className="flex-1">
                                <h3 className="text-2xl font-extrabold text-primary">Collaboration</h3>
                                <p className="mt-4 text-lg font-semibold">
                                    We promote teamwork and collaboration among club members, fostering a sense of community and shared purpose within our university.
                                </p>
                            </div>
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[rgba(71,189,255,0.06)] text-[#47BDFF]">
                                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M41.7656 39.9469C41.7656 40.1702 41.8543 40.3843 42.0122 40.5421C42.17 40.7 42.3842 40.7887 42.6074 40.7887H47.3563C47.4942 40.7885 47.6299 40.7547 47.7516 40.6898C47.8732 40.6249 47.9772 40.5313 48.0541 40.4169C48.1311 40.3025 48.1788 40.171 48.193 40.0339C48.2073 39.8967 48.1876 39.7582 48.1357 39.6305C47.6363 38.3821 46.81 37.2913 45.7437 36.4723C44.6774 35.6533 43.4103 35.1364 42.0754 34.9758C41.9358 34.9589 41.7941 34.9773 41.6634 35.0293C41.5328 35.0813 41.4172 35.1652 41.3273 35.2734C41.2374 35.3815 41.176 35.5105 41.1488 35.6485C41.1216 35.7865 41.1293 35.9291 41.1714 36.0633C41.5654 37.3202 41.7657 38.6297 41.7656 39.9469Z"
                                        fill="currentcolor"
                                    />
                                    <path
                                        d="M16.2911 35.9898C16.3316 35.8638 16.3418 35.7299 16.3208 35.5991C16.2999 35.4683 16.2483 35.3443 16.1704 35.2372C16.0925 35.13 15.9904 35.0428 15.8724 34.9826C15.7544 34.9224 15.6239 34.8908 15.4914 34.8906H15.4712C13.9632 34.8913 12.4899 35.3432 11.2408 36.1879C9.99161 37.0327 9.02365 38.2318 8.46148 39.631C8.40989 39.7588 8.39057 39.8974 8.40506 40.0344C8.41955 40.1714 8.46743 40.3028 8.54457 40.417C8.62171 40.5312 8.72566 40.6247 8.84739 40.6894C8.96905 40.754 9.10478 40.7877 9.24254 40.7876H14.8316C15.0548 40.7876 15.2688 40.6989 15.4267 40.5411C15.5845 40.3832 15.6732 40.1691 15.6732 39.9459C15.6726 38.6031 15.8811 37.2685 16.2911 35.9898Z"
                                        fill="currentcolor"
                                    />
                                    <path
                                        d="M24.6457 29.5232C24.7113 29.5634 24.7645 29.6207 24.7997 29.689C24.835 29.7573 24.8509 29.8339 24.8457 29.9105C24.8405 29.9872 24.8144 30.061 24.7703 30.1239C24.7261 30.1867 24.6655 30.2364 24.5952 30.2673C22.6983 31.0772 21.081 32.4262 19.9438 34.147C18.8066 35.8676 18.1996 37.8844 18.1982 39.947C18.1982 40.1702 18.2869 40.3843 18.4448 40.5421C18.6026 40.7 18.8167 40.7886 19.0399 40.7886H38.3993C38.6225 40.7886 38.8366 40.7 38.9945 40.5421C39.1523 40.3843 39.241 40.1702 39.241 39.947C39.2375 37.8813 38.6266 35.8623 37.4844 34.1412C36.3422 32.4201 34.7191 31.0729 32.817 30.2673C32.7459 30.2364 32.6847 30.1866 32.64 30.1232C32.5953 30.0599 32.5689 29.9855 32.5637 29.9081C32.5585 29.8308 32.5746 29.7534 32.6104 29.6847C32.6462 29.6159 32.7002 29.5583 32.7666 29.5182C34.268 28.6264 35.4349 27.2659 36.0877 25.6462C36.7405 24.0264 36.843 22.237 36.3796 20.5533C35.9161 18.8695 34.9122 17.3847 33.5225 16.3272C32.1327 15.2697 30.434 14.698 28.6877 14.7002C26.9414 14.7024 25.2441 15.2783 23.857 16.3393C22.4699 17.4002 21.4698 18.8875 21.0105 20.5724C20.5512 22.2573 20.6582 24.0464 21.315 25.6645C21.9718 27.2826 23.1421 28.6401 24.6457 29.5282V29.5232ZM24.0902 22.67C24.0902 22.3517 24.1258 22.0344 24.1963 21.7239C24.2255 21.594 24.2852 21.4728 24.3703 21.3705C24.4555 21.2681 24.5637 21.1874 24.6861 21.135C24.8086 21.0825 24.9416 21.0599 25.0745 21.0689C25.2073 21.078 25.3362 21.1184 25.4504 21.1869C27.064 22.1583 28.9119 22.6711 30.7952 22.67C31.2877 22.6696 31.7795 22.633 32.2666 22.5606C32.3981 22.5409 32.5324 22.5527 32.6585 22.5949C32.7846 22.6372 32.8989 22.7086 32.992 22.8036C33.0852 22.8985 33.1545 23.0142 33.1943 23.1411C33.2341 23.2679 33.2433 23.4025 33.2211 23.5336C33.0071 24.6607 32.3802 25.6675 31.463 26.3567C30.5459 27.0459 29.4045 27.368 28.2624 27.26C27.1202 27.152 26.0595 26.6216 25.2878 25.7727C24.5161 24.9236 24.089 23.8173 24.0902 22.67Z"
                                        fill="currentcolor"
                                    />
                                    <path
                                        d="M41.1266 33.2135C42.0932 33.2194 43.0377 32.9244 43.8292 32.3695C44.6206 31.8146 45.2198 31.0272 45.5438 30.1164C45.8677 29.2057 45.9003 28.2168 45.637 27.2868C45.3737 26.3567 44.8276 25.5315 44.0744 24.9257C43.3211 24.32 42.3981 23.9635 41.4331 23.9058C40.4682 23.8481 39.5093 24.092 38.6893 24.6037C37.8691 25.1154 37.2286 25.8695 36.8564 26.7616C36.4841 27.6537 36.3986 28.6394 36.6117 29.5823C36.848 30.6062 37.4216 31.5209 38.2405 32.1795C39.0594 32.8381 40.0758 33.2023 41.1266 33.2135Z"
                                        fill="currentcolor"
                                    />
                                    <path
                                        d="M15.4712 33.2129C18.0279 33.2129 20.1006 31.1402 20.1006 28.5835C20.1006 26.0267 18.0279 23.9541 15.4712 23.9541C12.9144 23.9541 10.8418 26.0267 10.8418 28.5835C10.8418 31.1402 12.9144 33.2129 15.4712 33.2129Z"
                                        fill="currentcolor"
                                    />
                                    <path
                                        d="M28.2989 28.5546C31.1994 28.5546 33.5508 26.2033 33.5508 23.3027C33.5508 20.4022 31.1994 18.0508 28.2989 18.0508C25.3983 18.0508 23.047 20.4022 23.047 23.3027C23.047 26.2033 25.3983 28.5546 28.2989 28.5546Z"
                                        fill="currentcolor"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden py-12 lg:py-24">
                <div className="container">
                    <div className="heading text-center">
                        <h6 className="!text-secondary">Meet Our Team</h6>
                        <h4>Our experienced core members</h4>
                    </div>
                </div>

                <div className="container relative px-16">
                    <div className="swiper-button-prev2 absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-secondary text-secondary duration-200 hover:bg-secondary hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5892 14.4111L9.41083 15.5895L3.82167 10.0003L9.41083 4.41113L10.5892 5.58947L7.01167 9.16697H15V10.8336H7.01167L10.5892 14.4111Z" fill="currentcolor" />
                        </svg>
                    </div>

                    <div className="swiper-button-next1 absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-secondary text-secondary duration-200 hover:bg-secondary hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.41083 14.4111L10.5892 15.5895L16.1783 10.0003L10.5892 4.41113L9.41083 5.58947L12.9883 9.16697H5V10.8336H12.9883L9.41083 14.4111Z" fill="currentcolor" />
                        </svg>
                    </div>

                    <Swiper
                        loop={true}
                        slidesPerView="auto"
                        spaceBetween={30}
                        navigation={{
                            nextEl: '.swiper-button-next1',
                            prevEl: '.swiper-button-prev2',
                        }}
                        modules={[Navigation]}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            600: {
                                slidesPerView: 2,
                            },
                            1000: {
                                slidesPerView: 3,
                            },
                            1600: {
                                slidesPerView: 4,
                            },
                        }}
                        dir={isRtl ? 'rtl' : 'ltr'}
                        key={isRtl ? 'true' : 'false'}
                    >
                        <SwiperSlide className="relative text-center">
                            <span className="absolute inset-x-0 -top-5">
                                <img src="/assets/images/marketing/team-shadow.svg" className="mx-auto" alt="" />
                            </span>
                            <div className="mx-auto w-48 rounded-full">
                                <img src="/assets/images/demoMember.svg" alt="" /> {/* Image source updated */}
                            </div>
                            <h3 className="mt-2 text-xl font-extrabold text-black dark:text-white">project-350</h3> {/* Name updated */}
                            <p className="mt-2.5 text-sm font-semibold">developer</p> {/* Title updated */}
                        </SwiperSlide>

                        <SwiperSlide className="relative text-center">
                            <span className="absolute inset-x-0 -top-5">
                                <img src="/assets/images/marketing/team-shadow1.svg" className="mx-auto" alt="" />
                            </span>
                            <div className="mx-auto w-48 rounded-full">
                                <img src="/assets/images/demoMember.svg" alt="" /> {/* Image source updated */}
                            </div>
                            <h3 className="mt-2 text-xl font-extrabold text-black dark:text-white">project-350</h3> {/* Name updated */}
                            <p className="mt-2.5 text-sm font-semibold">developer</p> {/* Title updated */}
                        </SwiperSlide>

                        <SwiperSlide className="relative text-center">
                            <span className="absolute inset-x-0 -top-5">
                                <img src="/assets/images/marketing/team-shadow.svg" className="mx-auto" alt="" />
                            </span>
                            <div className="mx-auto w-48 rounded-full">
                                <img src="/assets/images/demoMember.svg" alt="" /> {/* Image source updated */}
                            </div>
                            <h3 className="mt-2 text-xl font-extrabold text-black dark:text-white">project-350</h3> {/* Name updated */}
                            <p className="mt-2.5 text-sm font-semibold">developer</p> {/* Title updated */}
                        </SwiperSlide>

                        <SwiperSlide className="relative text-center">
                            <div className="SwiperSlide">
                                <span className="absolute inset-x-0 -top-5">
                                    <img src="/assets/images/marketing/team-shadow1.svg" className="mx-auto" alt="" />
                                </span>
                                <div className="mx-auto w-48 rounded-full">
                                    <img src="/assets/images/demoMember.svg" alt="" /> {/* Image source updated */}
                                </div>
                                <h3 className="mt-2 text-xl font-extrabold text-black dark:text-white">project-350</h3> {/* Name updated */}
                                <p className="mt-2.5 text-sm font-semibold">developer</p> {/* Title updated */}
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>


            <section className="py-14 lg:py-[100px]">
                <div className="container">
                    <div className="relative z-10 lg:flex">
                        <div className="heading text-center lg:mb-0 lg:w-1/3 ltr:lg:pr-10 ltr:lg:text-left rtl:lg:pl-10 rtl:lg:text-right">
                            <h6>Get In Touch.</h6>
                            <h4 className="sm:!leading-[50px]">Ready to Get Started?</h4>

                            <svg className="mx-auto mt-8" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="80" stroke="#B476E5" strokeWidth="2" fill="none" />
                                <path d="M100 40 L130 80 L100 120 L70 80 Z" fill="#47BDFF" opacity="0.3" />
                                <circle cx="100" cy="100" r="40" fill="#B476E5" opacity="0.2" />
                            </svg>
                        </div>

                        <form onSubmit={onSubmit} className="rounded-3xl bg-white px-4 py-12 dark:bg-[#101626] lg:w-2/3 lg:px-8">
                            <div className="grid gap-10 sm:grid-cols-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                    />
                                    <label className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white">
                                        Full Name
                                    </label>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white">
                                        <circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M3 18c0-3.5 3.5-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                    />
                                    <label className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white">
                                        Email Address
                                    </label>
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white">
                                        <rect x="1" y="2" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M1 4l9 5l9-5" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                    />
                                    <label className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white">
                                        Mobile Number
                                    </label>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white">
                                        <rect x="4" y="1" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="9" cy="14" r="1" fill="currentColor" />
                                    </svg>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                    />
                                    <label className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white">
                                        City
                                    </label>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white">
                                        <path d="M10 2C6 2 3 5 3 9c0 5 7 9 7 9s7-4 7-9c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="10" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative mt-10">
                                <input
                                    type="text"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary ltr:pr-12 rtl:pl-12"
                                />
                                <label className="absolute -top-3 bg-white px-2 font-bold ltr:left-6 rtl:right-6 dark:bg-[#101626] dark:text-white">
                                    Message
                                </label>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 dark:text-white">
                                    <path d="M2 2h16v12h-8l-4 3v-3H2V2z" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="6" cy="8" r="1" fill="currentColor" />
                                    <circle cx="10" cy="8" r="1" fill="currentColor" />
                                    <circle cx="14" cy="8" r="1" fill="currentColor" />
                                </svg>
                            </div>

                            <div className="mt-10 text-center ltr:lg:text-right rtl:lg:text-left">
                                <button type="submit" className="btn bg-gray px-12 capitalize text-white dark:bg-white dark:text-black dark:hover:bg-secondary">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>








        </div>
    );
};

export default Marketing;
