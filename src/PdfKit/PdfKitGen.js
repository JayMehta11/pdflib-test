// import PDFDocument from '@react-pdf/pdfkit';
import BlobStream from 'blob-stream';
import PDFDocument from 'pdfkit/js/pdfkit.standalone';
// import PDFDocument from 'pdfkit';

// import fs from 'fs';

export const PdfKitGen = async (setPdf) => {
  const doc = new PDFDocument();
  const stream = doc.pipe(BlobStream());
  // console.log('hindi font', HindiFont);
  const [hindiFont, gujaratiFont, bengaliFont, teluguFont] = await Promise.all([
    fetch('https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf'),
    fetch(
      'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf'
    ),
    fetch(
      'https://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAHnqn.ttf'
    ),
    fetch(
      'https://fonts.gstatic.com/s/notosanstelugu/v25/0FlxVOGZlE2Rrtr-HmgkMWJNjJ5_RyT8o8c7fHkeg-esVC5dzHkHIJQqrEntezbqQQ.ttf'
    ),
  ]);
  const hindiArrayBuffer = await hindiFont.arrayBuffer();
  const gujaratiArrayBuffer = await gujaratiFont.arrayBuffer();
  const bengaliArrayBuffer = await bengaliFont.arrayBuffer();
  const teluguArrayBuffer = await teluguFont.arrayBuffer();
  // console.log('font array buffer', { font, arrayBuffer });
  doc.registerFont('NotoSansDevanagari-Regular', hindiArrayBuffer);
  doc.registerFont('NotoSansGujarati-Regular', gujaratiArrayBuffer);
  doc.registerFont('NotoSerifBengali-Regular', bengaliArrayBuffer);
  doc.registerFont('NotoSansTelugu-Regular', teluguArrayBuffer);

  doc.font('NotoSansDevanagari-Regular');
  doc.text(import.meta.env.VITE_ENGLISH_STRING);
  doc.moveDown();
  doc.text(import.meta.env.VITE_HINDI_STRING);
  doc.moveDown();
  // doc.pipe(fs.createWriteStream('output.pdf'));

  doc.font('NotoSansGujarati-Regular');
  doc.text(import.meta.env.VITE_GUJARATI_STRING);
  doc.moveDown();

  doc.font('NotoSerifBengali-Regular');
  doc.text(import.meta.env.VITE_BENGALI_STRING);
  doc.moveDown();

  doc.font('NotoSansTelugu-Regular');
  doc.text(import.meta.env.VITE_TELUGU_STRING);
  doc.moveDown();

  // doc.image(getBase64Image('tux'), 0, 15, { width: 300 }).text('Proportional to width', 0, 0);
  // const val3 = await readAsDataUri(doc);
  // setPdf(val3);
  // let buffers = [];
  doc.on('data', function () {
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

// function getBase64Image(img_id) {
//   // Create an empty canvas element
//   const img = document.getElementById(img_id);
//   var canvas = document.createElement('canvas');
//   canvas.width = img.width;
//   canvas.height = img.height;
//   // Copy the image contents to the canvas
//   var ctx = canvas.getContext('2d');
//   ctx.globalAlpha = 0.4;
//   ctx.drawImage(img, 0, 0);
//   // Get the data-URL formatted image
//   var dataURL = canvas.toDataURL('image/png');
//   return dataURL;
// }
