import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '/src/redux/themeConfigSlice.js';
import axios from 'axios';
import '../assets/css/global.css';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(null);
  const { loading } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_BASE = "https://backend350.vercel.app/v1";

  useEffect(() => {
    dispatch(setPageTitle('Verify Email'));
  }, [dispatch]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpCode = otp.join('');
      // Mock API call for OTP verification with the entered code
      const res = await axios.post(`${API_BASE}/auth/verify-otp`, { otp: otpCode }, { withCredentials: true });
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const resendOTP = async () => {
    // Resend OTP logic here
    await axios.post(`${API_BASE}/auth/resend-otp`, {}, { withCredentials: true });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-starfield px-6 py-10 sm:px-16">
      <div className="relative flex w-full max-w-[440px] flex-col items-center justify-center gap-6 mx-auto">
        <h1 className="text-3xl font-extrabold uppercase text-primary">Verify Your Account</h1>
        <p className="text-base font-bold text-white-dark">Enter the OTP sent to your email</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-between">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                className="form-input w-10 text-center"
              />
            ))}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-gradient w-full mt-6 border-0 uppercase shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-200"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        <button onClick={resendOTP} className="mt-4 text-primary underline">
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;