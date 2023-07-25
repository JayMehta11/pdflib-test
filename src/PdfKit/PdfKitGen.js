// import PDFDocument from '@react-pdf/pdfkit';
import BlobStream from 'blob-stream';
import PDFDocument from 'pdfkit/js/pdfkit.standalone';
// import PDFDocument from 'pdfkit';

// import fs from 'fs';

export const PdfKitGen = async (setPdf) => {
  const doc = new PDFDocument();
  const stream = doc.pipe(BlobStream());
  // console.log('hindi font', HindiFont);
  const [hindiFont, gujaratiFont] = await Promise.all([
    fetch('https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf'),
    fetch(
      'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf'
    ),
  ]);
  const hindiArrayBuffer = await hindiFont.arrayBuffer();
  const gujaratirrayBuffer = await gujaratiFont.arrayBuffer();
  // console.log('font array buffer', { font, arrayBuffer });
  doc.registerFont('NotoSansDevanagari-Regular', hindiArrayBuffer);
  doc.registerFont('NotoSansGujarati-Regular', gujaratirrayBuffer);

  doc.font('NotoSansDevanagari-Regular');
  doc.text('some text परीक्षा');
  doc.moveDown();
  // doc.pipe(fs.createWriteStream('output.pdf'));

  doc.font('NotoSansGujarati-Regular');
  doc.text(
    ' એક સરકારી સંસ્થા, એજન્સી કે વિભાગ અન્ય સરકારી સંસ્થા, એજન્સી કે વિભાગ સાથે વાણિજયરહિત (non-commercial) સંદેશાવ્યવહાર કરે, તો તેને સરકારથી સરકાર (026) તરીકે ઓળખવામાં આવે છે. 1૧ ખર્ચાને ઘટાડવા, પ્રક્રિયાઓને સુનિયોજિત બનાવવા અને કાર્યાલયોને વધુ અસરકાર '
  );
  doc.end();
  // const val3 = await readAsDataUri(doc);
  // setPdf(val3);

  // console.log('data', doc._store.chunks);
  doc.on('data', function (result) {
    console.log('result', result);
    console.count('data from pdfkit: ');
    // Get the data from the PDFDocument
    // const data = Buffer.concat(doc._store.chunks);

    // Create a Blob using the data
    const blob = new Blob([result], { type: 'application/pdf' });

    // Create a Blob URL for display in the browser
    const url = URL.createObjectURL(blob);

    // Now you can use the blob or blob URL as needed
    // For example, you can display the PDF in an iframe:
    // const iframe = document.getElementById('pdfFrame');
    // iframe.src = url;
    setPdf(url);
  });

  // stream.on('finish', async function () {
  //   const val = stream.toBlob('application/pdf');
  //   const val3 = await readAsDataUri(val);
  //   setPdf(val3);
  // });
};

export async function readAsDataUri(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (_e) => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(reader.error);
      }
    });
    reader.readAsDataURL(file);
  });
}
