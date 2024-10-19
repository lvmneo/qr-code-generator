
import './App.css';
import React, { useState,useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import btndel from './image/del-btn.png';

const App = () =>{
  const [url, setUrl] = useState('');
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const storedGenerated = localStorage.getItem('generated');
    if (storedGenerated === 'true') {
      setGenerated(true);
    }
  }, []);

  const handleInputChange = (e) =>{
    setUrl(e.target.value);
  } 

  const handleGeneratedQR =() => {
    if(url){
      setGenerated(true);
      localStorage.setItem('generated', 'true');
    } else {
      alert('Пожалуйста,введите URL!')
    }
  };


  const handleReset = () => {
    setGenerated(false); 
    setUrl(''); 
    localStorage.removeItem('generated'); 
  };
  return(
<div>
<h1>Генератор QR-кодов</h1>

  <div className={`QR-code-card ${generated ? 'visible' : ''}`}>
  <button className='reset-btn' onClick={handleReset} style={{ cursor: 'pointer',border: 'none', background: 'transparent' }}>
  <img src={btndel} alt="Сбросить" style={{ width: '20px', height: '20px' }} /> 
        </button>
  <input 
  type='text'
  value={url}
  onChange={handleInputChange}
  placeholder='Введите URL сайта'
  style={{ width: '235px', padding: '10px', fontSize: '16px' }}
/>

<br />
      {generated && (
        <div className='qr-code'>
          <QRCodeSVG value={url} size={256} style={{ borderRadius: '8px' }}  />
          <p className='text-under-qr'>Сканируйте QR-код или скопируйте URL: {url}</p>
        </div>
      )}

<button className='qr-btn' onClick={handleGeneratedQR} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}>
        Сгенерировать QR-код
      </button>
      </div>
     
</div>
  );


};

export default App;
