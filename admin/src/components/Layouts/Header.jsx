import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../redux/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconUser from '../Icon/IconUser';
import IconMail from '../Icon/IconMail';
import IconLockDots from '../Icon/IconLockDots';
import IconLogout from '../Icon/IconLogout';
import IconMailDot from '../Icon/IconMailDot';
import IconArrowLeft from '../Icon/IconArrowLeft';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconXCircle from '../Icon/IconXCircle';
import { signOutUserFailure, signOutUserSuccess, signOutUserStart } from '../../redux/user/userSlice';
import axios from 'axios';

const Header = () => {
  const location = useLocation();
  const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  
  useEffect(() => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const all = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }
      const ul = selector.closest('ul.sub-menu');
      if (ul) {
        let ele = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [location]);

  const themeConfig = useSelector((state) => state.themeConfig);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const API_BASE = import.meta.env.VITE_API_BASE;

  // Messages state
  function createMarkup(messages) {
    return { __html: messages };
  }
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light text-success"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
      title: 'Congratulations!',
      message: 'Your OS has been updated.',
      time: '1hr',
    },
    {
      id: 2,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light text-info"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
      title: 'Did you know?',
      message: 'You can switch between artboards.',
      time: '2hr',
    },
    {
      id: 3,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light text-danger"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
      title: 'Something went wrong!',
      message: 'Send Report',
      time: '2days',
    },
    {
      id: 4,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light text-warning"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
      title: 'Warning',
      message: 'Your password strength is low.',
      time: '5days',
    },
  ]);

  const removeMessage = (value) => {
    setMessages(messages.filter((user) => user.id !== value));
  };

  const handleSignOut = async () => {
    console.log('signout');
    try {
      dispatch(signOutUserSuccess());
    } catch (error) {
      console.error(error);
    } finally {
      axios.post(`${API_BASE}/auth/logout`, null, { withCredentials: true });
    }
  };

  return (
    <header className="z-40 dark">
      <div className="shadow-sm">
        <div className="relative bg-[#0e1726] flex w-full items-center px-5 py-2.5 h-full">
          <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
            <Link to="/" className="main-logo flex items-center shrink-0">
              <img className="w-8 ltr:-ml-1 rtl:-mr-1 inline" src="/favicon.ico" alt="logo" />
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline text-white-light transition-all duration-300">
                SUSTclubs
              </span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex-none text-[#d0d2d6] hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-dark/40 hover:bg-dark/60"
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <IconMenu className="w-5 h-5" />
            </button>
          </div>

          {/* Right side items */}
          <div className="flex-1 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:sm:mr-0 flex items-center justify-end space-x-1.5 lg:space-x-2 rtl:space-x-reverse text-[#d0d2d6]">
            

            {/* Profile Dropdown */}
            <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement="bottom-end"
                btnClassName="relative group block"
                button={
                  <img 
                    className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" 
                    src={currentUser?.avatar} 
                    alt="userProfile" 
                  />
                }
              >
                <ul className="text-white-dark !py-0 w-[230px] font-semibold text-white-light/90 bg-gray-800 border border-gray-700">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img 
                        className="rounded-md w-10 h-10 object-cover" 
                        src={currentUser?.avatar} 
                        alt="userProfile" 
                      />
                      <div className="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 className="text-base text-white-light">{currentUser?.name}</h4>
                        <button 
                          type="button" 
                          className="text-dark-light/60 hover:text-white"
                        >
                          {currentUser?.email}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link 
                      to={currentUser?.studentId ? `/profile/${currentUser.studentId}` : (localStorage.getItem('studentId') ? `/profile/${localStorage.getItem('studentId')}` : '/')} 
                      className="hover:text-white"
                    >
                      <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      Profile
                    </Link>
                  </li>
                  <li className="border-t border-white-light/10">
                    <button className="text-danger !py-3" onClick={handleSignOut}>
                      <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;