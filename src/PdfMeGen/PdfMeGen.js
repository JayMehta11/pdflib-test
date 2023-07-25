import { generate } from '@pdfme/generator';

import { Template } from './Template';

export const PdfMeGen = async (setPdf) => {
  const font = {
    gujarati: {
      data: await fetch(
        'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf'
      ).then((res) => res.arrayBuffer()),
      //   fallback: true,
    },
    hindi: {
      data: await fetch('https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf').then(
        (res) => res.arrayBuffer()
      ),
      fallback: true,
    },
  };
  const template = {
    // skip...Check the Template section.
    ...Template,
  };
  const inputs = [
    {
      a: 'એક સરકારી સંસ્થા, એજન્સી કે વિભાગ અન્ય સરકારી સંસ્થા, એજન્સી કે વિભાગ સાથે વાણિજયરહિત (non-commercial) સંદેશાવ્યવહાર કરે, તો તેને સરકારથી સરકાર (026) તરીકે ઓળખવામાં આવે છે. 1૧ ખર્ચાને ઘટાડવા, પ્રક્રિયાઓને સુનિયોજિત બનાવવા અને કાર્યાલયોને વધુ અસરકારક બનાવવા આ માહિતીનું વિવરણ મદદરૂપ બને છે.ઉપર વિવેચિત તમામ ઇ-કોમર્સ પ્રતિકૃતિઓમાં 820 અને 828 વિપુલ પ્રમાણમાં ઉપયોગમાં લેવામાં આવતી પ્રતિકૃતિઓ છે. આ બંને પ્રતિકૃતિમાં મુખ્ય તફાવત ગ્રાહક અંગે છે. B2B પ્રતિકૂતિમાં ગ્રાહક એક સંસ્થા છે, જ્યારે 20 પ્રતિકૃતિમાં ગ્રાહક એક સ્વતંત્ર વ્યક્તિ છે.',
      b: 'कीसे बलवान परिवहन विचारशिलता विकेन्द्रित एवम् करता। उपलब्ध प्रसारन सार्वजनिक मुख्य पडता हुआआदी ',
      c: 'जानकारी स्वतंत्र होसके उसके सभिसमज सम्पर्क Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets',
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
