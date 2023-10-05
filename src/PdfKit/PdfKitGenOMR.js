// import PDFDocument from '@react-pdf/pdfkit';
import BlobStream from 'blob-stream';
// import doc from 'pdfkit';
// import fs from 'fs';
import PDFDocument from 'pdfkit/js/pdfkit.standalone';
// import PDFDocument from 'pdfkit';

const header = async (doc) => {
  doc.fontSize(16);

  doc.font('Helvetica-Bold');
  // Add the test name and standard in the heading portion
  doc.text('Grade 12 Biology (English medium)', 30, 20, { align: 'center' });
  doc.text(`Mark the correct circle`, 30, 40, { align: 'center' });

  doc.font('Helvetica').fontSize(14);

  doc.text('Question', 55, 20, { align: 'left' });
  doc.text('50', 55, 40, { align: 'left' });

  doc.fontSize(16);
  // Name
  doc.text('Name:', 50, 110);
  doc.rect(110, 105, 180, 25).lineWidth(2).stroke(); // Draw a box for Name

  // ID
  doc.text('ID:', 330, 110);
  doc.rect(390, 105, 150, 25).lineWidth(2).stroke(); // Draw a box for ID

};


const body = async(doc) => {
  doc.moveTo(185, 175).lineTo(185, 770).lineWidth(2).dash(3,{space:5}).stroke();
  doc.moveTo(377, 175).lineTo(377, 770).lineWidth(2).dash(3,{space:5}).stroke();

  doc.undash();
  
    const startX1 = 30;
    const startX2 = 220;
    const startX3 = 410;

    let startY = 200;    
    let currentY = startY + 20;

    let questionsPerColumn=50;

    const circles = [];

    for (let qNum = 1; qNum <= questionsPerColumn; qNum++) {
      
      let currentX = startX1;
      if(qNum<41 && qNum>20){
        currentX = startX2;
      }
      else if(qNum>40){
        currentX = startX3;
      }
     
      if(qNum===1 || qNum===21 || qNum===41){
        doc.font('Helvetica-Bold');
        currentY = startY+20;
        doc.text('A',currentX+35,currentY-30).stroke();
        doc.text('B',currentX+60,currentY-30).stroke();
        doc.text('C',currentX+85,currentY-30).stroke();
        doc.text('D',currentX+110,currentY-30).stroke();
        doc.font('Helvetica');
      }

      doc.font('Helvetica-Bold').text(`${qNum}`, currentX, currentY);
      doc.font('Helvetica');
      circles.push({ x: currentX + 40, y: currentY+7, r: 6 });
      circles.push({ x: currentX + 65, y: currentY+7, r: 6 });
      circles.push({ x: currentX + 90, y: currentY+7, r: 6 });
      circles.push({ x: currentX + 115, y: currentY+7, r: 6 });
      
      currentY += 27;
    }
    for (const circle of circles) {
      doc.circle(circle.x, circle.y, circle.r).stroke();
    }
    // }

    // jsonData.forEach((item, index) => {
    //   const { question, answer } = item;
    //   let currentX;
    //   if (index % 2 === 0) {
    //     currentY += 50;
    //     currentX = startX1;
    //   } else {
    //     currentX = startX2;
    //   }
    //   doc.fillColor("grey");
    //   doc.text(`प्रश्न ${index + 1}:`, currentX, currentY);
    //   doc.fillColor("black");
    //   doc.text(question, currentX + 50, currentY).stroke();
  
    //   const answerX = currentX + 130;
    //   doc.rect(answerX, currentY, 100, 32).lineWidth(1).stroke();
    //   doc.text(answer, answerX + 2, currentY);
  
    //   startY += 50;
    // });
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
  doc.moveTo(0, 780).lineTo(615, 780).lineWidth(2).dash(3,{space:5}).stroke();

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

export const PdfKitGenOMR = async (setPdf) => {
  const doc = new PDFDocument({size:"A4", margins: {top: 10, bottom: 10, left: 10, right: 10} });
  const stream = doc.pipe(BlobStream());
  
  await qrCode(doc);

  await header(doc); 

  // doc.moveDown();
  doc.moveTo(0, 165).lineTo(615, 165).lineWidth(2).dash(3,{space:5}).stroke();
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