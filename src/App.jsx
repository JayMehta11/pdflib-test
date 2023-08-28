import './App.css';

import PdfKitView from './PdfKit/PdfKitView';
import PdfLibView from './PdfLibGen/PdfLibView';
import PdfMakeViewer from './PdfMakeGen/PdfMakeViewer';
import PdfMeViewer from './PdfMeGen/PdfMeViewer';
import Viewer from './ReactPdfRenderer/Viewer';

function App() {
  return (
    <div>
      <Viewer />
      <PdfLibView />
      <PdfMakeViewer />
      <PdfMeViewer />
      <PdfKitView />
    </div>
  );
}

export default App;
