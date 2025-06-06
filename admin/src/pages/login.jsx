import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '/src/redux/themeConfigSlice.js';
import Dropdown from '/src/components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '/src/components/Icon/IconCaretDown';
import IconMail from '/src/components/Icon/IconMail';
import IconLockDots from '/src/components/Icon/IconLockDots';
import IconInstagram from '/src/components/Icon/IconInstagram';
import IconFacebookCircle from '/src/components/Icon/IconFacebookCircle';
import IconTwitter from '/src/components/Icon/IconTwitter';
import IconGoogle from '/src/components/Icon/IconGoogle';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const LoginCover = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE = import.meta.env.VITE_API_BASE;
  
  useEffect(() => {
    dispatch(setPageTitle('SUSTclubs Admin Login'));
  });

  const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl';
  const themeConfig = useSelector((state) => state.themeConfig);
  const setLocale = (flag) => {
    setFlag(flag);
    if (flag.toLowerCase() === 'ae') {
      dispatch(toggleRTL('rtl'));
    } else {
      dispatch(toggleRTL('ltr'));
    }
  };
  const [flag, setFlag] = useState(themeConfig.locale);

  useEffect(() => {
    dispatch(signInFailure(null));
  }, [dispatch]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true });
      if (res.status !== 200) {
        dispatch(signInFailure(res.data.errorMessage));
        throw new Error(res.data.errorMessage);
      }
      
      // if(res.data.user.role === 'user'){
      //   throw new Error('You are not authorized to access this page');
      // }
      Cookies.set('accessToken', res.data.tokens.access.token,
        {
          expires: new Date(res.data.tokens.access.expires),
          secure: true,
          sameSite: 'none',
          httpOnly: true,
        }
      );
      Cookies.set('refreshToken', res.data.tokens.refresh.token,
        {
          expires: new Date(res.data.tokens.refresh.expires),
          secure: true,
          sameSite: 'none',
          httpOnly: true,
        }
      );
      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  const handleGoogleClick = async () => {
    console.log('Google Clicked');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-white font-bold text-xl">
          <img src="/assets/images/logo-pink.png" alt="Logo" className="w-25 h-12 mr-2" />
          SUSTclubs
        </Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/about" className="text-white">About</Link></li>
          <li><Link to="/contact" className="text-white">Contact</Link></li>
        </ul>
        <div className="dropdown">
          <Dropdown
            offset={[0, 8]}
            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
            btnClassName="text-white flex items-center gap-2"
            button={
              <>
                <span>{flag.toUpperCase()}</span>
                <IconCaretDown />
              </>
            }
          >
            <ul className="p-2 text-black">
              {themeConfig.languageList.map((item) => (
                <li key={item.code}>
                  <button
                    type="button"
                    className={`w-full hover:text-primary ${flag === item.code ? 'text-primary' : ''}`}
                    onClick={() => {
                      i18next.changeLanguage(item.code);
                      setLocale(item.code);
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
      </nav>
      <main className="flex-grow flex justify-center items-center bg-gray-100 p-6">
        <div className="w-full max-w-[440px] lg:mt-16">
               <div className="mb-10">
                 <h1 className="text-3xl font-extrabold uppercase !leading-snug text-grey-800 md:text-4xl text-center">Sign in</h1>
                 <p className="text-base font-bold leading-normal text-white-dark text-center">Enter your email and password to login</p>
               </div>
               <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                 {error && <div className="text-red-500 text-sm">{error}</div>}
                 <div>
                   <label htmlFor="Email">Email</label>
                   <div className="relative text-white-dark">
                     <input onChange={handleChange} id="email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark" />
                     <span className="absolute start-4 top-1/2 -translate-y-1/2">
                       <IconMail fill={true} />
                     </span>
                   </div>
                 </div>
                 <div>
                   <label htmlFor="Password">Password</label>
                   <div className="relative text-white-dark">
                     <input
                      onChange={handleChange}
                      id="password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Enter Password"
                      className="form-input ps-10 pe-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconLockDots fill={true} />
                    </span>
                    <span className="absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                      {isPasswordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </span>
                  </div>
                </div>
                
                <button 
                  disabled={loading} 
                  type="submit" 
                  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(118, 181, 197, 0.44)]"
                  style={{ background: 'linear-gradient(135deg, rgba(30, 129, 176, 1) 0%, rgba(118, 181, 197, 1) 100%)' }}
                  >
                  {loading ? 'Loading...' : 'Sign In'}
                </button>
              </form>
            </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} SUSTclubs. All Rights Reserved.
      </footer>
    </div>
  );
};



export default LoginCover;
