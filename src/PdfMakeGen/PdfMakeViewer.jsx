import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { PdfMakeGen } from './PdfMakeGen';

const PdfMakeViewer = () => {
  const [pdf, setPdf] = useState('');

  useEffect(() => {
    onCreate();
  }, []);
  const onCreate = async () => {
    const value = await PdfMakeGen(setPdf);
    // console.log('value', value);
    // setPdf(value);
  };

  return (
    <div style={{ display: 'flex', margin: 'auto', flexDirection: 'column', maxWidth: '80vw' }}>
      <button onClick={onCreate}>pdfmake</button>
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

export default PdfMakeViewer;
