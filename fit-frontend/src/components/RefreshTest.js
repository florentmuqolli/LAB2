import React from 'react';
import axios from 'axios';

const RefreshTest = () => {
  const testRefreshToken = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    console.log('Stored refreshToken:', storedRefreshToken);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {
        refreshToken: storedRefreshToken,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);
      console.log('New accessToken:', response.data.accessToken);

      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (error) {
      console.error('Refresh token test failed:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <button onClick={testRefreshToken}>Test Refresh Token</button>
    </div>
  );
};

export default RefreshTest;
