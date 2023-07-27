import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { PdfKitGen } from './PdfKitGen';

const PdfKitView = () => {
  const [pdf, setPdf] = useState('');

  useEffect(() => {
    onCreate();
    const getPdf = async () => {
      const res = await fetch('http://localhost:3000/pdf');
      const response = await res.json();
      // console.log('response', response.body);
      // const val3 = await readAsDataUri(response.data.body);
      setPdf('data:application/pdf;base64,' + response.body);
    };
    // getPdf();
  }, []);

  // useEffect(() => {
  //   if (!pdf.length) return;
  //   const convert = async () => {
  //     const res = await PDFtoPNG([pdf]);
  //     console.log('res', res);
  //   };
  //   convert();
  // }, [pdf]);
  const onCreate = () => {
    PdfKitGen(setPdf);
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
      <img
        id='tux'
        crossOrigin='anonymous'
        src='https://images.pexels.com/lib/api/pexels.png'
        style={{ display: 'none' }}
        alt='tux'
      />
    </div>
  );
};

export default PdfKitView;
