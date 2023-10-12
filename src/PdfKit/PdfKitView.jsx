import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { PdfKitGenOMR } from './PdfKitGenOMR';

const PdfKitView = () => {
  const [pdf, setPdf] = useState('');

  useEffect(() => {
    onCreate();
  }, []);

  const onCreate = async () => {
    const value = await PdfKitGenOMR(setPdf);
    // console.log('value', value);
    // setPdf(value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <object
        type='application/pdf'
        style={{ width: '80vw', minHeight: '90vh' }}
        id='pdfDoc'
        data={pdf}
      >
        <p>unable to display file</p>
      </object>
      <button onClick={onCreate}>Create a pdfkit</button>
      {/* <img id='image64' src='/SmartPaperLogo.jpeg' style={{display:'none'}} alt='test' ></img> */}
    </div>
  );
};

export default PdfKitView;
