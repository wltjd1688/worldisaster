"use client"

import React from 'react';
import axios from 'axios';
function DonateButton() {
  const handleDonateClick = async () => {
    try {
      const response = await axios.get('/donate', {
        withCredentials: true, // 쿠키와 인증 정보를 포함
      });
      console.log(response.data); // 응답 처리
    } catch (error) {
      console.error('Donate request failed:', error);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={handleDonateClick}>Donate</button>
    </div>
  );
}
export default DonateButton;