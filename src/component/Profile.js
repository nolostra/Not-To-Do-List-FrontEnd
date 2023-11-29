// Profile.js
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { toast } from 'react-toastify';
import AuthService from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await localStorage.getItem('token');
        const response = await AuthService.getProfile(token);
        setProfile(response);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        toast('Error fetching profile', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-md shadow-md text-white-800">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {profile ? (
        <div>
          <div className="mb-2">
            <strong className="font-semibold">Username:</strong> {profile.username}
          </div>
          <div className="mb-2">
            <strong className="font-semibold">Role:</strong> {profile.role == "HRAdmin" ? "HR Admin" : "Employee" }
          </div>
          {/* Add other profile details as needed */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
