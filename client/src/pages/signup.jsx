import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '/src/redux/themeConfigSlice.js';
import Dropdown from '/src/components/Dropdown';
import i18next, { t } from 'i18next';
import IconCaretDown from '/src/components/Icon/IconCaretDown';
import IconMail from '/src/components/Icon/IconMail';
import IconLockDots from '/src/components/Icon/IconLockDots';
import IconInstagram from '/src/components/Icon/IconInstagram';
import IconFacebookCircle from '/src/components/Icon/IconFacebookCircle';
import IconTwitter from '/src/components/Icon/IconTwitter';
import IconGoogle from '/src/components/Icon/IconGoogle';
import IconUser from '/src/components/Icon/IconUser';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { signUpStart, signUpSuccess, signUpFailure } from '../redux/user/userSlice.js';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GoogleLogin } from '@react-oauth/google';
import '../assets/css/global.css';
import Swal from 'sweetalert2';

const LoginCover = () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE = "https://backend350.vercel.app/v1"
  useEffect(() => {
    dispatch(setPageTitle('Sign Up'));
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
    dispatch(signUpFailure(null));
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
      dispatch(signUpStart());
      const res = await axios.post(`${API_BASE}/auth/register`, formData, { withCredentials: true });
        Cookies.set('accessToken', res.data.tokens.access.token,
        {
          expires: new Date(res.data.tokens.access.expires),
          httpOnly: true,
          secure: true,
          sameSite: 'none',
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
      dispatch(signUpSuccess(res.data));
      navigate("/");
    } catch (error) {
        dispatch(signUpFailure(error.response.data.message));
    } finally {
        axios.post(`${API_BASE}/auth/send-verification-email`, {
        }, { withCredentials: true });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      dispatch(signUpStart());
      const res = await axios.post(`${API_BASE}/auth/google`, {
        credential: credentialResponse.credential
      }, { withCredentials: true });

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

      dispatch(signUpSuccess(res.data));
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      dispatch(signUpFailure(error.response.data.message));
    }
  };
  const handleGoogleError = (error) => {
    dispatch(signUpFailure(error.response.data.message));
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.message,
    });
  };

  return (
    <div>
      <div className="relative flex min-h-screen items-center justify-center bg-starfield px-6 py-10 sm:px-16">
        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
        
        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px] mx-auto">            <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
              <Link to="/" className="w-8 block lg:hidden">
                <img src="/public/favicon.ico" alt="Logo" className="mx-auto w-10" />
              </Link>
            </div>
            <div className="w-full max-w-[440px] lg:mt-16">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign up</h1>
                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
              </div>
              <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div>
                                    <label htmlFor="Name">Name</label>
                                    <div className="relative text-white-dark">
                                        <input onChange={handleChange} id="name" type="text" placeholder="Enter Name" className="form-input ps-10 placeholder:text-white-dark" />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                </div>
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
                <div>
                  <label className="flex cursor-pointer items-center">
                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                    <span className="text-white-dark">Subscribe to weekly newsletter</span>
                  </label>
                </div>
                <button disabled={loading} type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-200">
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>
              </form>

              <div className="relative my-7 text-center md:mb-9">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
              </div>
              <div className="mb-10 md:mb-[60px]">
                {/* <ul className="flex justify-center gap-3.5 text-white">
                  <li>
                    <Link
                      to="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconFacebookCircle />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconTwitter fill={true} />
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleGoogleClick}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconGoogle />
                    </button>
                  </li>
                </ul> */}
                <div className="flex justify-center">
                 <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={true}
                  scope="profile email"
                />
                </div>
              </div>
              <div className="text-center dark:text-white">
              Already have an account ?&nbsp;
                <Link to="/login" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                  SIGN IN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCover;
