import React from 'react';

const Home = () => {
  return (
    <div className='gif-container' style={{ marginTop: '120px', position: 'relative' }}>
      <img
        src="https://cdn.dribbble.com/users/214929/screenshots/4967879/media/cfc4a40efd67ae4810a0975a738d2145.gif"
        className='home-background'
        style={{ width: "100vw", height: "calc(100vh - 150px)" }}
        alt="background"
      />
      <div className="text-overlay" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '0 0 10px white, 0 0 20px white, 0 0 30px white',
      }}>
        GDSC JU Frontend + Backend Route Hitting with Gemini API used
      </div>
    </div>
  );
}

export default Home;
