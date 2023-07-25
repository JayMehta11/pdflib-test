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
    <>
      <object data={pdf ?? ''} type='application/pdf' style={{ width: '80vw', minHeight: '90vh' }}>
        <p>unable to display file</p>
      </object>
      <button onClick={onCreate}>pdflib create</button>
    </>
  );
};

export default PdfLibView;
