import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const PdfMakeGen = async (setPdf) => {
  pdfMake.fonts = {
    gujarati: {
      normal:
        'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf',
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
  const docDefinition = {
    content:
      'એક સરકારી સંસ્થા, એજન્સી કે વિભાગ અન્ય સરકારી સંસ્થા, એજન્સી કે વિભાગ સાથે વાણિજયરહિત (non-commercial) સંદેશાવ્યવહાર કરે, તો તેને સરકારથી સરકાર (026) તરીકે ઓળખવામાં આવે છે. 1૧ ખર્ચાને ઘટાડવા, પ્રક્રિયાઓને સુનિયોજિત બનાવવા અને કાર્યાલયોને વધુ અસરકારક બનાવવા આ માહિતીનું વિવરણ મદદરૂપ બને છે. ઉપર વિવેચિત તમામ ઇ-કોમર્સ પ્રતિકૃતિઓમાં 820 અને 828 વિપુલ પ્રમાણમાં ઉપયોગમાં લેવામાં આવતી પ્રતિકૃતિઓ છે. આ બંને પ્રતિકૃતિમાં મુખ્ય તફાવત ગ્રાહક અંગે છે. B2B પ્રતિકૂતિમાં ગ્રાહક એક સંસ્થા છે, જ્યારે 20 પ્રતિકૃતિમાં ગ્રાહક એક સ્વતંત્ર વ્યક્તિ છે.',
    defaultStyle: { font: 'gujarati' },
  };
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getDataUrl((dataUrl) => {
    // const targetElement = document.querySelector('#iframeContainer');
    // const iframe = document.createElement('iframe');
    // iframe.src = dataUrl;
    setPdf(dataUrl);
    // targetElement.appendChild(iframe);
  });
};
