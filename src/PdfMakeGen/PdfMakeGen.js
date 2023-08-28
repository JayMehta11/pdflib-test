import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const PdfMakeGen = async (setPdf) => {
  pdfMake.fonts = {
    gujarati: {
      normal:
        'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf',
    },
    hindi: {
      normal: 'https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf',
    },
    telugu: {
      normal:
        'https://fonts.gstatic.com/s/notosanstelugu/v25/0FlxVOGZlE2Rrtr-HmgkMWJNjJ5_RyT8o8c7fHkeg-esVC5dzHkHIJQqrEntezbqQQ.ttf',
    },
    bengali: {
      normal:
        'https://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAHnqn.ttf',
    },
    Roboto: {
      normal:
        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      italics:
        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      bolditalics:
        'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
    },
  };
  // const docDefinition = {
  //   content: import.meta.env.VITE_GUJARATI_STRING,
  //   defaultStyle: { font: 'gujarati' },
  // };
  const pdfDocGenerator = pdfMake.createPdf({
    content: [
      { text: import.meta.env.VITE_ENGLISH_STRING, style: { font: 'hindi', margin: [5, 2] } },
      { text: import.meta.env.VITE_HINDI_STRING, style: { font: 'hindi', margin: [5, 2] } },
      { text: import.meta.env.VITE_GUJARATI_STRING, style: { font: 'gujarati', margin: [5, 2] } },
      { text: import.meta.env.VITE_BENGALI_STRING, style: { font: 'bengali', margin: [5, 2] } },
      { text: import.meta.env.VITE_TELUGU_STRING, style: { font: 'telugu', margin: [5, 2] } },
    ],
  });
  pdfDocGenerator.getDataUrl((dataUrl) => {
    // const targetElement = document.querySelector('#iframeContainer');
    // const iframe = document.createElement('iframe');
    // iframe.src = dataUrl;
    setPdf(dataUrl);
    // targetElement.appendChild(iframe);
  });
};
