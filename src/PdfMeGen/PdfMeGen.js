import { generate } from '@pdfme/generator';

import { Template } from './Template';

export const PdfMeGen = async (setPdf) => {
  const font = {
    hindi: {
      data: await fetch('https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf').then(
        (res) => res.arrayBuffer()
      ),
      fallback: true,
    },
    gujarati: {
      data: await fetch(
        'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf'
      ).then((res) => res.arrayBuffer()),
    },
    chinese: {
      data: await fetch(
        'https://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cy_Co.ttf'
      ).then((res) => res.arrayBuffer()),
    },
    bengali: {
      data: await fetch(
        'https://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAHnqn.ttf'
      ).then((res) => res.arrayBuffer()),
    },
    telugu: {
      data: await fetch(
        'https://fonts.gstatic.com/s/notoseriftelugu/v25/tDbl2pCbnkEKmXNVmt2M1q6f4HWbbj6MRbYEeav7Fe9D9TCwuQ.ttf'
      ).then((res) => res.arrayBuffer()),
      subset: false,
    },
    tamil: {
      data: await fetch(
        'https://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGo70R.ttf'
      ).then((res) => res.arrayBuffer()),
    },
  };
  // console.log('telugu', import.meta.env.VITE_TELUGU_STRING, font);

  const template = {
    ...Template,
  };
  const inputs = [
    {
      a: import.meta.env.VITE_ENGLISH_STRING,
      b: import.meta.env.VITE_HINDI_STRING,
      c: import.meta.env.VITE_GUJARATI_STRING,
      d: import.meta.env.VITE_BENGALI_STRING,
      // e: import.meta.env.VITE_TELUGU_STRING,
      // f: import.meta.env.VITE_CHINESE_STRING,
    },
  ];

  generate({ template, inputs, options: { font } }).then((pdf) => {
    // console.log(pdf);

    // Browser
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    //   window.open(URL.createObjectURL(blob));
    setPdf(URL.createObjectURL(blob));

    // Node.js
    // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
  });
};
