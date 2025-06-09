import axios from 'axios';
import { signInSuccess, signInFailure } from './userSlice';
import * as jwt_decode from 'jwt-decode';

export const loadUserFromLocalStorage = () => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }

    // Try to decode the JWT token to get the user ID
    try {
      const decodedToken = jwt_decode.jwtDecode(accessToken);
      console.log('Decoded token:', decodedToken);
      // The user ID is in the 'sub' field of the JWT token
      const userId = decodedToken.sub;
      
      if (!userId) {
        console.error('Could not extract user ID from token');
        return;
      }
      
      const API_BASE = import.meta.env.VITE_API_BASE || "https://backend350.vercel.app/v1";
      
      // Make a request to get the user data by ID
      const res = await axios.get(`${API_BASE}/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      // If successful, dispatch signInSuccess with the user data
      if (res.data) {
        dispatch(signInSuccess({
          user: res.data,
          tokens: {
            access: { token: accessToken },
            refresh: { token: localStorage.getItem('refreshToken') }
          }
        }));
      }
    } catch (decodeError) {
      console.error('Error decoding JWT token:', decodeError);
      dispatch(signInFailure('Invalid token format'));
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    dispatch(signInFailure(error.message));
  }
};
