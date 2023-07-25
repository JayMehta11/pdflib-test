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
    <>
      <object data={pdf ?? ''} type='application/pdf' style={{ width: '80vw', minHeight: '90vh' }}>
        <p>unable to display file</p>
      </object>
      <button onClick={onCreate}>Create pdfme</button>
    </>
  );
};

export default PdfMeViewer;
