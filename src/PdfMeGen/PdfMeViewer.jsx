import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { PdfMeGen } from './PdfMeGen';

const PdfMeViewer = () => {
  const [pdf, setPdf] = useState('');

  useEffect(() => {
    onCreate();
  }, []);
  const onCreate = async () => {
    const value = await PdfMeGen(setPdf);
    // console.log('value', value);
    // setPdf(value);
  };

  return (
    <div style={{ display: 'flex', margin: 'auto', flexDirection: 'column', maxWidth: '80vw' }}>
      <button onClick={onCreate}>pdfme</button>
      <object
        data={pdf ?? ''}
        type='application/pdf'
        style={{ minWidth: '80vw', minHeight: '90vh' }}
      >
        <p>unable to display file</p>
      </object>
    </div>
  );
};

export default PdfMeViewer;
