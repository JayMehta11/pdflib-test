// import PDFDocument from '@react-pdf/pdfkit';
import BlobStream from 'blob-stream';
// import doc from 'pdfkit';
// import fs from 'fs';
import PDFDocument from 'pdfkit/js/pdfkit.standalone';
// import PDFDocument from 'pdfkit';

const jsonData = [
  { question: "3 X 70 =", answer: "" },
  { question: "30 X 7 =", answer: "" },
  { question: "40 X 6 =", answer: "" },
  { question: "30 X 6 =", answer: "" },
  { question: "70 X 7 =", answer: "" },
  { question: "4 X 70 =", answer: "" },
  { question: "2 X 70 =", answer: "" },
  { question: "80 X 7 =", answer: "" },
  { question: "40 X 8 =", answer: "" },
  { question: "2 X 60 =", answer: "" },
  { question: "90 X 4 =", answer: "" },
  { question: "4 X 50 =", answer: "" },
  { question: "40 X 6 =", answer: "" },
  { question: "30 X 6 =", answer: "" },
  { question: "70 X 7 =", answer: "" },
  { question: "4 X 70 =", answer: "" },
  { question: "2 X 70 =", answer: "" },
  { question: "80 X 7 =", answer: "" },
  { question: "40 X 8 =", answer: "" },
  { question: "2 X 60 =", answer: "" },

]; 

// Helper function to convert a number to its Hindi numeral representation
function numberToHindi(num) {
  const hindiNumerals = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return num.toString().replace(/\d/g, (digit) => hindiNumerals[digit]);
}

// Convert numerical values in jsonData to Hindi numerals
jsonData.forEach((item) => {
  item.question = item.question.replace(/\d+/g, (num) => numberToHindi(num));
  item.answer = item.answer.replace(/\d+/g, (num) => numberToHindi(num));
});

const header = async(doc) => {
  doc.fontSize(24).font('NotoSansDevanagari-Regular', 'bold');
  doc.text("द्विअंक गुणा", 230, 40);

  doc.fontSize(17).font('NotoSansDevanagari-Regular', 'normal');
  doc.text("नाम:", 20, 100);
  doc.rect(70, 100, 140, 30).stroke();
  doc.text("रोल नंबर:", 230, 100);
  doc.rect(295, 100, 80, 30).stroke();
  doc.text("तारीख:", 390, 100);
  doc.rect(440, 100, 100, 30).stroke();

  doc.fontSize(17).font('NotoSansDevanagari-Regular', 'bold');
  doc.text("गणित का उत्तर बताएँ!", 20, 160);
}

const body = async(doc) => {
    // Add your multiplication data here
    const startX1 = 30;
    const startX2 = 300;
    let startY = 190;    
    let currentY = startY + 20;
    jsonData.forEach((item, index) => {
      const { question, answer } = item;
      let currentX;
      if (index % 2 === 0) {
        currentY += 50;
        currentX = startX1;
      } else {
        currentX = startX2;
      }
      doc.fillColor("grey");
      doc.text(`प्रश्न ${index + 1}:`, currentX, currentY);
      doc.fillColor("black");
      doc.text(question, currentX + 50, currentY).stroke();
  
      const answerX = currentX + 130;
      doc.rect(answerX, currentY, 100, 32).lineWidth(1).stroke();
      doc.text(answer, answerX + 2, currentY);
  
      startY += 50;
    });
    // doc.moveTo(30, 600).lineTo(515, 600).lineWidth(2);
}


async function imageToBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching or converting the image:', error);
    return null;
  }
}

const footer = async(doc) => {
  doc.moveTo(0, 780).lineTo(615, 780).lineWidth(2).stroke();

  // const imagePath = 'https://images.pexels.com/lib/api/pexels.png';
  // const base64url = await imageToBase64(imagePath);
  
  const imagePath = '/SmartPaperLogo.jpeg'; 

  const base64url = await imageToBase64(imagePath);
  doc.image(`${base64url}`, 270, 800, { scale: 0.3 });
  // console.log(base64url);

  // doc.quadraticCurveTo(130, 200, 150, 120).stroke();
  
}


const qrCode = async(doc) => {
  const qr1 = '/top_left.jpg';
  const qr2 = '/top_right.jpg';
  const qr3 = '/bottom_left.jpg';
  const qr4 = '/bottom_right.jpg';
  const qr1base64 = await imageToBase64(qr1);
  const qr2base64 = await imageToBase64(qr2);
  const qr3base64 = await imageToBase64(qr3);
  const qr4base64 = await imageToBase64(qr4);
  doc.image(`${qr1base64}`, 10, 10, { scale: 0.07 });
  doc.image(`${qr2base64}`, 550, 10, { scale: 0.07 });
  doc.image(`${qr3base64}`, 10, 795, { scale: 0.07 });
  doc.image(`${qr4base64}`, 550, 795, { scale: 0.07 });
}

export const PdfKitGen = async (setPdf) => {
  const doc = new PDFDocument({size:"A4", margins: {top: 10, bottom: 10, left: 10, right: 10} });
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

  // await qrCode(doc);
  // doc.image('../assets/top_left.jpg',30,30,{width: 30, height: 30}).text("Test",30,20);

  await qrCode(doc);

  await header(doc); 

  // doc.moveDown();
  doc.moveTo(0, 220).lineTo(615, 220).lineWidth(2);
  // doc.pipe(fs.createWriteStream('output.pdf'));
  
  await body(doc);
  // doc.underline(0,700,615,700);
  // doc.moveTo(30, 600).lineTo(515, 600).lineWidth(2);

  await footer(doc);

  // doc.font('NotoSansGujarati-Regular');
  // doc.text(
  //   ' એક સરકારી સંસ્થા, એજન્સી કે વિભાગ અન્ય સરકારી સંસ્થા, એજન્સી કે વિભાગ સાથે વાણિજયરહિત (non-commercial) સંદેશાવ્યવહાર કરે, તો તેને સરકારથી સરકાર (026) તરીકે ઓળખવામાં આવે છે. 1૧ ખર્ચાને ઘટાડવા, પ્રક્રિયાઓને સુનિયોજિત બનાવવા અને કાર્યાલયોને વધુ અસરકાર '
  // );
  doc.end();

  stream.on('finish', async function () {
    const val = stream.toBlob('application/pdf');
    const val3 = await readAsDataUri(val);
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

