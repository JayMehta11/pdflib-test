import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { PdfKitGen } from './PdfKitGen';

const PdfKitView = () => {
  const [pdf, setPdf] = useState('');

  useEffect(() => {
    onCreate();
  }, []);

  const onCreate = async () => {
    const value = await PdfKitGen(setPdf);
    console.log('value', value);
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
    </div>
  );
};

export default PdfKitView;
