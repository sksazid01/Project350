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
        background: '#1f2937',
        color: '#fff',
      });
    }
  };

  const handleGoogleClick = async () => {
    console.log('Google Clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Header */}
      <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-white font-bold text-xl hover:text-blue-400 transition-colors">
          <img src="/assets/images/logo-pink.png" alt="Logo" className="w-25 h-12 mr-3" />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SUSTclubs
          </span>
        </Link>
        
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconLockDots className="w-10 h-10 text-white" fill={true} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
              <p className="text-gray-400">Enter your email and password to login</p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 pl-12 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  <IconMail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill={true} />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    id="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pl-12 pr-12 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  <IconLockDots className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill={true} />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {isPasswordVisible ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-700/50 text-center py-4">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} SUSTclubs. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default LoginCover;