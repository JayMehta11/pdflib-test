import { PDFViewer } from '@react-pdf/renderer';
import { usePDF } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';

import { MyDocument } from './MyDocument';

const Viewer = () => {
  const [instance, updateInstance] = usePDF({ document: MyDocument });

  return (
    <>
      <PDFViewer style={{ minWidth: '80vw', minHeight: '80vw' }}>
        <MyDocument />
      </PDFViewer>
      <div>
        <PDFDownloadLink document={<MyDocument />} fileName='somename.pdf'>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download now react-renderer!'
          }
        </PDFDownloadLink>
      </div>
    </>
  );
};

export default Viewer;
