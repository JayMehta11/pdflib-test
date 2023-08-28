import { PDFViewer } from '@react-pdf/renderer';
import { usePDF } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';

import { MyDocument } from './MyDocument';

const Viewer = () => {
  const [instance, updateInstance] = usePDF({ document: MyDocument });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <PDFDownloadLink document={<MyDocument />} fileName='somename.pdf'>
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'React-renderer')}
      </PDFDownloadLink>
      <PDFViewer style={{ minWidth: '80vw', minHeight: '80vw' }}>
        <MyDocument />
      </PDFViewer>
      <div></div>
    </div>
  );
};

export default Viewer;
