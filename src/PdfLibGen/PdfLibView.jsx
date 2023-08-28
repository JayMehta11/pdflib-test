import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { CreatePdf } from './CreatePdf';

const PdfLibView = () => {
  const [pdf, setPdf] = useState('');

  useEffect(() => {
    onCreate();
  }, []);
  const onCreate = async () => {
    const value = await CreatePdf();
    // console.log('value', value);
    setPdf(value);
  };

  return (
    <div style={{ display: 'flex', margin: 'auto', flexDirection: 'column', minWidth: '80vw' }}>
      <button onClick={onCreate}>pdflib</button>
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

export default PdfLibView;
