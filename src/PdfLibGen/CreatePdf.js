import fontkit from '@pdf-lib/fontkit';
// import fs from 'fs';
import { PDFDocument, rgb } from 'pdf-lib';

export const CreatePdf = async () => {
  const pdfDoc = await PDFDocument.create();
  //   const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await fetch(
    'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf'
  ).then((res) => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.addPage();
  const { height } = page.getSize();
  const fontSize = 30;
  // console.log('first', customFont);
  page.drawText('test પરીક્ષા', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: customFont,
    color: rgb(0, 0.53, 0.71),
    // maxWidth: 300,
  });

  const pdfBytes = await pdfDoc.saveAsBase64();
  //   console.log('pdfBytes', pdfBytes);
  return `data:application/pdf;base64,${pdfBytes}`;
};
