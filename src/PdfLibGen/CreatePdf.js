import fontkit from '@pdf-lib/fontkit';
// import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import 'regenerator-runtime/runtime';

export const CreatePdf = async () => {
  const pdfDoc = await PDFDocument.create();
  //   const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  pdfDoc.registerFontkit(fontkit);
  const gujaratiFontBytes = await fetch(
    'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf'
  ).then((res) => res.arrayBuffer());
  const hindiFontBytes = await fetch(
    'https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf'
  ).then((res) => res.arrayBuffer());
  const bengaliFontBytes = await fetch(
    'https://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAHnqn.ttf'
  ).then((res) => res.arrayBuffer());
  const teluguFontBytes = await fetch(
    'https://fonts.gstatic.com/s/notosanstelugu/v25/0FlxVOGZlE2Rrtr-HmgkMWJNjJ5_RyT8o8c7fHkeg-esVC5dzHkHIJQqrEntezbqQQ.ttf'
  ).then((res) => res.arrayBuffer());
  const gujaratiFont = await pdfDoc.embedFont(gujaratiFontBytes);
  const hindiFont = await pdfDoc.embedFont(hindiFontBytes);
  const bengaliFont = await pdfDoc.embedFont(bengaliFontBytes);
  const teluguFont = await pdfDoc.embedFont(teluguFontBytes);

  const page = pdfDoc.addPage();
  const { height } = page.getSize();
  const fontSize = 12;
  // console.log('first', height - 4 * fontSize);
  let y = height - 4 * fontSize;
  let textHt = 100;
  page.drawText(import.meta.env.VITE_ENGLISH_STRING, {
    x: 50,
    y,
    size: fontSize,
    font: hindiFont,
    maxWidth: 450,
  });
  y -= textHt;
  page.drawText(import.meta.env.VITE_HINDI_STRING, {
    x: 50,
    y,
    size: fontSize,
    font: hindiFont,
    maxWidth: 300,
  });
  y = y - textHt - 20;
  page.drawText(import.meta.env.VITE_GUJARATI_STRING, {
    x: 50,
    y,
    size: fontSize,
    font: gujaratiFont,
    maxWidth: 400,
  });
  y -= 80;
  page.drawText(import.meta.env.VITE_BENGALI_STRING, {
    x: 50,
    y,
    size: fontSize,
    font: bengaliFont,
    maxWidth: 400,
  });
  y -= 80;
  page.drawText(import.meta.env.VITE_TELUGU_STRING, {
    x: 50,
    y,
    size: fontSize,
    font: teluguFont,
    maxWidth: 400,
  });

  const pdfBytes = await pdfDoc.saveAsBase64();
  //   console.log('pdfBytes', pdfBytes);
  return `data:application/pdf;base64,${pdfBytes}`;
};
