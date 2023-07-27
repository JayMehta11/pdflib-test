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
  doc.image(getBase64Image('tux'), 0, 15, { width: 300 }).text('Proportional to width', 0, 0);
  // const val3 = await readAsDataUri(doc);
  // setPdf(val3);
  let buffers = [];
  doc.on('data', function (result) {
    // console.log('result', result);
    // buffers.push.bind(result.buffer);
    // const blob = new Blob([result], { type: 'application/pdf' });
    // const url = URL.createObjectURL(blob);
    // setPdf(url);
  });

  doc.on('end', async () => {
    // console.log('buffers', buffers);
    // const blob = new Blob([new Uint8Array(buffers)], { type: 'application/pdf' });
    // console.log('blob', blob);
    // const res = await readAsArrayBuffer(blob);
    // const arrayBuffer = new ArrayBuffer(buffers);
    // console.log('pdf buffer', res);
  });
  doc.end();

  stream.on('finish', async function () {
    const val = stream.toBlob('application/pdf');
    const val3 = await readAsDataUri(val);
    // console.log('val3', val3);
    setPdf(val3);
  });
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

export async function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (_e) => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(reader.error);
      }
    });
    reader.readAsArrayBuffer(file);
  });
}

function getBase64Image(img_id) {
  // Create an empty canvas element
  const img = document.getElementById(img_id);
  var canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  // Copy the image contents to the canvas
  var ctx = canvas.getContext('2d');
  ctx.globalAlpha = 0.4;
  ctx.drawImage(img, 0, 0);
  // Get the data-URL formatted image
  var dataURL = canvas.toDataURL('image/png');
  return dataURL;
}
