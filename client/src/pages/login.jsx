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
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GoogleLogin } from '@react-oauth/google';
import '../assets/css/global.css';
import Swal from 'sweetalert2';

const LoginCover = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE = "https://backend350.vercel.app/v1";
  console.log(API_BASE)
  useEffect(() => {
    dispatch(setPageTitle('Login'));
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
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        }
      );
      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      dispatch(signInStart());
      const res = await axios.post(`${API_BASE}/auth/google`, {
        credential: credentialResponse.credential
      }, { withCredentials: true });

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
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        }
      );

      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      dispatch(signInFailure(error.response.data.message));
    }
  };
  const handleGoogleError = (error) => {
    dispatch(signInFailure(error.response.data.message));
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
          <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px] mx-auto">
            <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
              <Link to="/" className="w-8 block lg:hidden">
                
              </Link>
            </div>
            <div className="w-full max-w-[440px] lg:mt-16">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
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
                <div>
                  <label className="flex cursor-pointer items-center">
                    <Link to="/reset-password" className="text-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </label>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-200"
                >
                  {loading ? 'Loading...' : 'Sign In'}
                </button>

              </form>

              <div className="relative my-7 text-center md:mb-9">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                <span className="inline-block bg-white px-2 align-middle text-base text-white-dark dark:bg-[#101626]">OR</span>
              </div>
              <div className="text-center dark:text-white">
                Don't have an account ?&nbsp;
                <Link to="/signup" className="uppercase text-primary underline transition hover:no-underline">
                  SIGN UP
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
