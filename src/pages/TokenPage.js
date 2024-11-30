import React, { useEffect } from 'react';
import axios from 'axios';

const TokenPage = () => {
  useEffect(() => {
    // Get the token from the URL query parameter (code)
    console.log('here')
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('code');

    if (token) {
      // Save the token in localStorage as authToken
      localStorage.setItem('authToken', token);

      // Perform a GET request to fetch the user profile
      axios
        .get('https://taskmanager-challenge.onrender.com/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Check if the response is successful
          if (response.data.status) {
            const { name, profilePicture } = response.data.user;

            // Save the name and profile picture URL to localStorage
            localStorage.setItem('userName', name);
            localStorage.setItem('imageUrl', profilePicture);

            // Redirect to localhost:3000
            window.location.href = ' http://localhost:3000';
          } else {
            console.error('Profile not found:', response.data.msg);
          }
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    } else {
      console.error('No token found in URL');
    }
  }, []);

  return (
    <div>
      <p>Processing...</p>
    </div>
  );
};

export default TokenPage;
