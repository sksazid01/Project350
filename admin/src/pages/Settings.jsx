import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../redux/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconHome from '../components/Icon/IconHome';
import IconUser from '../components/Icon/IconUser';
import IconLinkedin from '../components/Icon/IconLinkedin';
import IconTwitter from '../components/Icon/IconTwitter';
import IconFacebook from '../components/Icon/IconFacebook';
import IconGithub from '../components/Icon/IconGithub';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import api from '../utils/axiosInstance';
import ImageUploading from 'react-images-uploading';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AccountSetting = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Account Setting'));
    dispatch(updateUserFailure(null));
  }, [dispatch]);

  const [tabs, setTabs] = useState('home');

  const toggleTabs = (name) => {
    setTabs(name);
  };
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        avatar: currentUser.avatar || '',
        department: currentUser.department || '',
        semester: currentUser.semester || '',
        studentId: currentUser.studentId || '',
        bio: currentUser.bio || '',
        profession: currentUser.profession || '',
        skills: currentUser.skills || [],
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        website: currentUser.website || '',
        linkedin: currentUser.linkedin || '',
        twitter: currentUser.twitter || '',
        facebook: currentUser.facebook || '',
        github: currentUser.github || '',
      });
    }
  }, [currentUser]);
  const handleChange = (e) => {
    if (e.target.id === 'skills') {
      // Split the input by commas and trim each skill
      const skillsArray = e.target.value.split(',').map((skill) => skill.trim());
      setFormData({
        ...formData,
        [e.target.id]: skillsArray,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const [avatar, setAvatar] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  const onChangeAvatar = (imageList) => {
    setAvatar(imageList);
    setFormData((prev) => ({ ...prev, avatar: imageList[0]?.dataURL || currentUser.avatar }));
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }
    if (!formData.studentId || formData.studentId.trim() === '') {
      newErrors.studentId = 'Student ID is required';
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear any existing errors
    setErrors({});

    const hasAvatarChanged = avatar.length > 0;
    if (!hasChanges(formData, currentUser) && !hasAvatarChanged) {
      Swal.fire({
        icon: 'info',
        title: 'No changes to save',
        showConfirmButton: false,
        toast: true,
        timer: 1500,
        position: 'top-right',
      });
      return;
    }
    try {
      dispatch(updateUserStart());
      let avatarUrl = currentUser.avatar;

      if (hasAvatarChanged) {
        const formData = new FormData();
        formData.append('file', avatar[0].file);
        formData.append('folder', 'avatars');
        formData.append('filename', `avatar_${currentUser.id}`);

        const response = await api.post('/uploads/upload-single', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response.data);
        if (response.data.url) {
          avatarUrl = response.data.url;
          //console.log(avatarUrl);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to upload avatar',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-right',
          });
          return; // Exit the function if avatar upload fails
        }
      }

      const updatedData = { ...formData, avatar: avatarUrl };
      const res = await api.patch(`/users/${currentUser.id}`, updatedData);
      dispatch(updateUserSuccess(res.data));
      setAvatar([]); // Reset avatar state after successful update

      Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-right',
      });
    } catch (err) {
      dispatch(updateUserFailure(err));
      Swal.fire({
        icon: 'error',
        title: 'Failed to update profile',
        //text: err.message,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-right',
      });
    }
  };
  const handleSocialSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges(formData, currentUser, ['linkedin', 'twitter', 'facebook', 'github'])) {
      Swal.fire({
        icon: 'info',
        title: 'No changes to save',
        // text: 'Please make changes to save.',
        showConfirmButton: false,
        toast: true,
        timer: 1500,
        position: 'top-right',
      });
      return;
    }
    try {
      dispatch(updateUserStart());
      const socialData = {
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        facebook: formData.facebook,
        github: formData.github,
      };
      const res = await api.patch(`/users/${currentUser.id}`, socialData);
      dispatch(updateUserSuccess(res.data));
      Swal.fire({
        icon: 'success',
        title: 'Social links updated successfully',
        showConfirmButton: false,
        toast: true,
        timer: 1500,
        position: 'top-right',
      });
    } catch (err) {
      dispatch(updateUserFailure(err));
    }
  };
  // Helper function to check if there are changes
  const hasChanges = (formData, currentUser, fields = null) => {
    const relevantFields = fields || Object.keys(formData);
    return relevantFields.some((field) => {
      if (field === 'skills') {
        return JSON.stringify(formData[field]) !== JSON.stringify(currentUser[field]);
      }
      return formData[field] !== currentUser[field];
    });
  };

  const departments = ['CSE', 'EEE', 'CE', 'ME', 'BBA', 'TE', 'IPE'];
  const semesters = ['1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2'];

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <ol className="flex font-semibold text-gray-300">
        <li className="bg-gray-800 ltr:rounded-l-md rtl:rounded-r-md">
          <Link
            to="/"
            className="p-1.5 ltr:pl-3 rtl:pr-3 ltr:pr-2 rtl:pl-2 relative h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-gray-800 before:z-[1] hover:text-primary/70"
          >
            Home
          </Link>
        </li>
        <li className="bg-gray-800">
          <button
            className="bg-primary text-white p-1.5 ltr:pl-6 rtl:pr-6 ltr:pr-2 rtl:pl-2 relative h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-primary before:z-[1]"
          >
            Settings
          </button>
        </li>
      </ol>
      <div className="pt-5">
        <div>
          <ul className="sm:flex font-semibold border-b border-gray-700 mb-5 whitespace-nowrap overflow-y-auto">
            <li className="inline-block">
              <button
                onClick={() => toggleTabs('home')}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
              >
                <IconHome />
                Edit Profile
              </button>
            </li>
          </ul>
        </div>

        {tabs === 'home' && (
          <div>
            <form onSubmit={handleGeneralSubmit} className="border border-gray-700 rounded-md p-4 mb-5 bg-gray-800">
              <h6 className="text-lg font-bold mb-5">General Information</h6>
              <div className="flex flex-col sm:flex-row">
                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                  <ImageUploading value={avatar} onChange={onChangeAvatar} maxNumber={1} acceptType={['jpg', 'png', 'jpeg']}>
                    {({ imageList, onImageUpload, onImageRemove }) => (
                      <div className="upload__image-wrapper">
                        <div className="relative w-32 h-32 mx-auto" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                          <img src={imageList[0]?.dataURL || formData.avatar} alt="avatar" className="w-full h-full rounded-full object-cover cursor-pointer" />
                          {isHovering && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer" onClick={onImageUpload}>
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                            </div>
                          )}
                        </div>
                        {imageList.length > 0 && (
                          <button onClick={() => onImageRemove(0)} className="mt-2 text-sm text-red-400 hover:text-red-300">
                            Remove Image
                          </button>
                        )}
                      </div>
                    )}
                  </ImageUploading>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-gray-300">Full Name</label>
                    <input
                      onChange={handleChange}
                      id="name"
                      type="text"
                      placeholder="Enter Full Name"
                      className={`form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.name ? 'border-red-500' : ''}`}
                      value={formData.name || ''}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="department" className="text-gray-300">Department</label>
                    <select onChange={handleChange} id="department" className="form-select bg-gray-700 border-gray-600 text-white" value={formData.department || ''}>
                      <option value="" disabled>
                        Select Department
                      </option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="semester" className="text-gray-300">Semester</label>
                    <select onChange={handleChange} id="semester" className="form-select bg-gray-700 border-gray-600 text-white" value={formData.semester || ''}>
                      <option value="" disabled>
                        Select Semester
                      </option>
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="studentId" className="text-gray-300">Student ID</label>
                    <input
                      onChange={handleChange}
                      id="studentId"
                      type="text"
                      placeholder="Enter Student ID"
                      className={`form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.studentId ? 'border-red-500' : ''}`}
                      value={formData.studentId || ''}
                    />
                    {errors.studentId && <p className="text-red-400 text-sm mt-1">{errors.studentId}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="text-gray-300">Email</label>
                    <input
                      onChange={handleChange}
                      id="email"
                      type="email"
                      placeholder="Enter Email"
                      className={`form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : ''}`}
                      value={formData.email || ''}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="bio" className="text-gray-300">Bio</label>
                    <textarea onChange={handleChange} id="bio" rows="3" placeholder="Enter your bio" className="form-textarea bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.bio || ''}></textarea>
                  </div>
                  <div>
                    <label htmlFor="profession" className="text-gray-300">Profession</label>
                    <input onChange={handleChange} id="profession" type="text" placeholder="Enter your profession" className="form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.profession || ''} />
                  </div>
                  <div>
                    <label htmlFor="skills" className="text-gray-300">Skills</label>
                    <input
                      onChange={handleChange}
                      id="skills"
                      type="text"
                      placeholder="Enter your skills (comma-separated)"
                      className="form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      value={formData.skills ? formData.skills.join(', ') : ''}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-gray-300">Phone</label>
                    <input onChange={handleChange} id="phone" type="tel" placeholder="Enter your phone number" className="form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.phone || ''} />
                  </div>
                  <div>
                    <label htmlFor="address" className="text-gray-300">Address</label>
                    <input onChange={handleChange} id="address" type="text" placeholder="Enter your address" className="form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.address || ''} />
                  </div>
                  <div>
                    <label htmlFor="website" className="text-gray-300">Website</label>
                    <input onChange={handleChange} id="website" type="url" placeholder="Enter your website URL" className="form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.website || ''} />
                  </div>
                  <div>
                    <label htmlFor="cv" className="text-gray-300">CV</label>
                    <input onChange={handleChange} id="cv" type="file" accept=".pdf,.doc,.docx" className="form-input bg-gray-700 border-gray-600 text-white" value={formData.cv || ''} />
                  </div>
                  <div className="sm:col-span-2 mt-3">
                    <button disabled={loading} type="submit" className="btn btn-primary">
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <form onSubmit={handleSocialSubmit} className="border border-gray-700 rounded-md p-4 bg-gray-800">
              <h6 className="text-lg font-bold mb-5">Social</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex">
                  <div className="bg-gray-700 flex justify-center items-center rounded px-3 font-semibold ltr:mr-2 rtl:ml-2">
                    <IconLinkedin className="w-5 h-5" />
                  </div>
                  <input type="text" id="linkedin" placeholder="LinkedIn profile" className="form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.linkedin || ''} onChange={handleChange} />
                </div>
                <div className="flex">
                  <div className="bg-gray-700 flex justify-center items-center rounded px-3 font-semibold ltr:mr-2 rtl:ml-2">
                    <IconTwitter className="w-5 h-5" />
                  </div>
                  <input type="text" id="twitter" placeholder="Twitter profile" className="form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.twitter || ''} onChange={handleChange} />
                </div>
                <div className="flex">
                  <div className="bg-gray-700 flex justify-center items-center rounded px-3 font-semibold ltr:mr-2 rtl:ml-2">
                    <IconFacebook className="w-5 h-5" />
                  </div>
                  <input type="text" id="facebook" placeholder="Facebook profile" className="form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.facebook || ''} onChange={handleChange} />
                </div>
                <div className="flex">
                  <div className="bg-gray-700 flex justify-center items-center rounded px-3 font-semibold ltr:mr-2 rtl:ml-2">
                    <IconGithub />
                  </div>
                  <input type="text" id="github" placeholder="GitHub profile" className="form-input bg-gray-700 border-gray-600 text-white placeholder-gray-400" value={formData.github || ''} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-6">
                Save Social Links
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSetting;