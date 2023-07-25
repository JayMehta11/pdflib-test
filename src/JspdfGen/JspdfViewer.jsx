import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { JspdfGen } from './JspdfGen';

const JspdfViewer = () => {
  const [pdf, setPdf] = useState('');

  useEffect(() => {
    onCreate();
  }, []);
  const onCreate = async () => {
    await JspdfGen(setPdf);
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

export default JspdfViewer;
