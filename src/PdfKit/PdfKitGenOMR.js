// // import PDFDocument from '@react-pdf/pdfkit';
// import BlobStream from "blob-stream";
// // import pdfjs from 'pdfjs-dist/build/pdf';
// // import doc from 'pdfkit';
// // import fs from 'fs';
// import PDFDocument from "pdfkit/js/pdfkit.standalone";

// import { PDFtoPNG } from "./pdfToPng";

// // import PDFDocument from 'pdfkit';

// const header = async (doc) => {
//   doc.fontSize(16);

//   doc.font("Helvetica-Bold");
//   // Add the test name and standard in the heading portion
//   doc.text("Grade 12 Biology (English medium)", 30, 20, { align: "center" });
//   doc.text(`Mark the correct circle`, 30, 40, { align: "center" });

//   doc.font("Helvetica").fontSize(14);

//   doc.text("Question", 55, 20, { align: "left" });
//   doc.text("90", 55, 40, { align: "left" });

//   doc.fontSize(16);
//   // Name
//   doc.text("Name:", 50, 80);
//   doc.rect(110, 75, 180, 25).lineWidth(2).stroke(); // Draw a box for Name

//   // ID
//   doc.text("ID:", 330, 80);
//   doc.rect(390, 75, 150, 25).lineWidth(2).stroke(); // Draw a box for ID
// };
// // const questionsTotal = csvDataLength
// const circles = [];
// // const rectangles =[]

// const body = async (doc, questionsTotal) => {
//   const metadata = [];
//   // console.log(questionsTotal)
//   // const width = 1.3892621959414058;
//   // const hgt = 1.3897302497951038;

//   // switch (true) {
//   //   case questionsTotal>60:{

//   //   }
      
//   //     break;
  
//   //   default:
//   //     break;
//   // }
//   if (questionsTotal > 60) {
//     doc
//       .moveTo(185, 125)
//       .lineTo(185, 785)
//       .lineWidth(2)
//       .dash(3, { space: 5 })
//       .stroke();
//     doc
//       .moveTo(377, 125)
//       .lineTo(377, 785)
//       .lineWidth(2)
//       .dash(3, { space: 5 })
//       .stroke();

//     doc.undash();

//     const startX1 = 30;
//     const startX2 = 220;
//     const startX3 = 410;

//     let startY = 140;
//     let currentY = startY + 20;

//     for (let qNum = 1; qNum <= questionsTotal; qNum++) {
//       let currentX = startX1;
//       if (qNum < 61 && qNum > 30) {
//         currentX = startX2;
//       } else if (qNum > 60) {
//         currentX = startX3;
//       }

//       if (qNum === 1 || qNum === 31 || qNum === 61) {
//         doc.font("Helvetica-Bold");
//         currentY = startY + 20;
//         doc.text("A", currentX + 35, currentY - 30).stroke();
//         doc.text("B", currentX + 60, currentY - 30).stroke();
//         doc.text("C", currentX + 85, currentY - 30).stroke();
//         doc.text("D", currentX + 110, currentY - 30).stroke();
//         doc.font("Helvetica");
//       }

//       doc.font("Helvetica-Bold").text(`${qNum}`, currentX, currentY - 3);
//       doc.lineWidth(1);
//       circles.push({ x: currentX + 40, y: currentY + 3, r: 6 });
//       circles.push({ x: currentX + 65, y: currentY + 3, r: 6 });
//       circles.push({ x: currentX + 90, y: currentY + 3, r: 6 });
//       circles.push({ x: currentX + 115, y: currentY + 3, r: 6 });

//       const cryptID = crypto.randomUUID();
//       const object = {
//         item: `${qNum}`,
//         ans: "D",
//         modelType: "mathpix",
//         contentType: "question",
//         contentSubType: "OMR",
//         maxScore: 1,
//         difficulty: 50,
//         skills: [],
//         qBox: [],
//         ansBox: [
//           {
//             x: currentX + 33,
//             y: currentY - 4,
//             h: 17,
//             w: 17,
//             boxType: "answer",
//             id: "3ebeaf02-7ad6-4cc1-a69d-df7b3e1b3ec5",
//           },
//           {
//             x: currentX + 58,
//             y: currentY - 4,
//             h: 17,
//             w: 17,
//             boxType: "answer",
//             id: "83fb375d-eba7-4027-b897-33577b143724",
//           },
//           {
//             x: currentX + 83,
//             y: currentY - 4,
//             h: 17,
//             w: 17,
//             boxType: "answer",
//             id: "0d978f88-3f8a-4e32-a066-a6567022abd1",
//           },
//           {
//             x: currentX + 108,
//             y: currentY - 4,
//             h: 17,
//             w: 17,
//             boxType: "answer",
//             id: "846811b1-ed46-468e-acac-845647b719ab",
//           },
//         ],
//         id: cryptID,
//         orientation: "ltr",
//         rubric: "",
//         question: "",
//         language: "english",
//       };
//       // console.log(object);
//       metadata.push(object);

//       // console.log(metadata, "METADATA");
//       currentY += 21;
//     }
//     for (const circle of circles) {
//       doc.circle(circle.x, circle.y, circle.r).stroke();
//     }
//   } else if (questionsTotal < 61 && questionsTotal > 40) {
//     doc
//       .moveTo(185, 125)
//       .lineTo(185, 785)
//       .lineWidth(2)
//       .dash(3, { space: 5 })
//       .stroke();
//     doc
//       .moveTo(377, 125)
//       .lineTo(377, 785)
//       .lineWidth(2)
//       .dash(3, { space: 5 })
//       .stroke();

//     doc.undash();

//     const startX1 = 30;
//     const startX2 = 220;
//     const startX3 = 410;

//     let startY = 200;
//     let currentY = startY + 20;

//     const circles = [];
//     // const rectangles = [];

//     for (let qNum = 1; qNum <= questionsTotal; qNum++) {
//       let currentX = startX1;
//       if (qNum < 41 && qNum > 20) {
//         currentX = startX2;
//       } else if (qNum > 40) {
//         currentX = startX3;
//       }

//       if (qNum === 1 || qNum === 21 || qNum === 41) {
//         doc.font("Helvetica-Bold");
//         currentY = startY + 20;
//         doc.text("A", currentX + 35, currentY - 30).stroke();
//         doc.text("B", currentX + 60, currentY - 30).stroke();
//         doc.text("C", currentX + 85, currentY - 30).stroke();
//         doc.text("D", currentX + 110, currentY - 30).stroke();
//         doc.font("Helvetica");
//       }

//       doc.font("Helvetica-Bold").text(`${qNum}`, currentX, currentY);
//       doc.lineWidth(1);
//       circles.push({ x: currentX + 40, y: currentY + 7, r: 6 });
//       circles.push({ x: currentX + 65, y: currentY + 7, r: 6 });
//       circles.push({ x: currentX + 90, y: currentY + 7, r: 6 });
//       circles.push({ x: currentX + 115, y: currentY + 7, r: 6 });

//       const cryptID = crypto.randomUUID();
//       const object = {
//         item: `${qNum}`,
//         ans: ["D"],
//         modelType: "mathpix",
//         contentType: "question",
//         contentSubType: "OMR",
//         maxScore: 1,
//         difficulty: 50,
//         skills: [],
//         qBox: [],
//         ansBox: [
//           {
//             x: currentX + 33,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "3ebeaf02-7ad6-4cc1-a69d-df7b3e1b3ec5",
//           },
//           {
//             x: currentX + 58,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "83fb375d-eba7-4027-b897-33577b143724",
//           },
//           {
//             x: currentX + 83,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "0d978f88-3f8a-4e32-a066-a6567022abd1",
//           },
//           {
//             x: currentX + 108,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "846811b1-ed46-468e-acac-845647b719ab",
//           },
//         ],
//         id: cryptID,
//         orientation: "ltr",
//         rubric: "",
//         question: "",
//         language: "english",
//       };

//       metadata.push(object);
//       currentY += 27;
//     }
//     for (const circle of circles) {
//       doc.circle(circle.x, circle.y, circle.r).stroke();
//     }
//     // console.log(metadata,"METADATA")
//   } else if (questionsTotal < 41 && questionsTotal > 20) {
//     doc
//       .moveTo(300, 175)
//       .lineTo(300, 770)
//       .lineWidth(2)
//       .dash(3, { space: 5 })
//       .stroke();
//     doc.undash();
//     const startX1 = 60;
//     const startX2 = 350;

//     let startY = 200;
//     let currentY = startY + 20;

//     const circles = [];

//     for (let qNum = 1; qNum <= questionsTotal; qNum++) {
//       let currentX = startX1;
//       if (qNum < 41 && qNum > 20) {
//         currentX = startX2;
//       }

//       if (qNum === 1 || qNum === 21 || qNum === 41) {
//         doc.font("Helvetica-Bold");
//         currentY = startY + 20;
//         doc.text("A", currentX + 35, currentY - 30).stroke();
//         doc.text("B", currentX + 60, currentY - 30).stroke();
//         doc.text("C", currentX + 85, currentY - 30).stroke();
//         doc.text("D", currentX + 110, currentY - 30).stroke();
//         doc.font("Helvetica");
//       }

//       doc.font("Helvetica-Bold").text(`${qNum}`, currentX, currentY);
//       doc.lineWidth(1);
//       circles.push({ x: currentX + 40, y: currentY + 7, r: 6 });
//       circles.push({ x: currentX + 65, y: currentY + 7, r: 6 });
//       circles.push({ x: currentX + 90, y: currentY + 7, r: 6 });
//       circles.push({ x: currentX + 115, y: currentY + 7, r: 6 });

//       const cryptID = crypto.randomUUID();
//       const object = {
//         item: `${qNum}`,
//         ans: "D",
//         modelType: "mathpix",
//         contentType: "question",
//         contentSubType: "OMR",
//         maxScore: 1,
//         difficulty: 50,
//         skills: [],
//         qBox: [],
//         ansBox: [
//           {
//             x: currentX + 33,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "3ebeaf02-7ad6-4cc1-a69d-df7b3e1b3ec5",
//           },
//           {
//             x: currentX + 58,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "83fb375d-eba7-4027-b897-33577b143724",
//           },
//           {
//             x: currentX + 83,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "0d978f88-3f8a-4e32-a066-a6567022abd1",
//           },
//           {
//             x: currentX + 108,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "846811b1-ed46-468e-acac-845647b719ab",
//           },
//         ],
//         id: cryptID,
//         orientation: "ltr",
//         rubric: "",
//         question: "",
//         language: "english",
//       };

//       metadata.push(object);
//       currentY += 27;
//     }

//     for (const circle of circles) {
//       doc.circle(circle.x, circle.y, circle.r).stroke();
//     }
//     // console.log(metadata,"METADATA")
//   } else {
//     doc.undash();
//     const startX1 = 220;

//     let startY = 200;
//     let currentY = startY + 20;

//     const circles = [];

//     for (let qNum = 1; qNum <= questionsTotal; qNum++) {
//       let currentX = startX1;

//       if (qNum === 1 || qNum === 21 || qNum === 41) {
//         doc.font("Helvetica-Bold");
//         currentY = startY + 20;
//         doc.text("A", currentX + 35, currentY - 30).stroke();
//         doc.text("B", currentX + 60, currentY - 30).stroke();
//         doc.text("C", currentX + 85, currentY - 30).stroke();
//         doc.text("D", currentX + 110, currentY - 30).stroke();
//         doc.font("Helvetica");
//       }

//       doc.font("Helvetica-Bold").text(`${qNum}`, currentX, currentY);
//       doc.lineWidth(1);
//       circles.push({ x: currentX + 40, y: currentY + 7, r: 6 });
//       circles.push({ x: currentX + 65, y: currentY + 7, r: 6 });
//       circles.push({ x: currentX + 90, y: currentY + 7, r: 6 });
//       circles.push({ x: currentX + 115, y: currentY + 7, r: 6 });

//       const cryptID = crypto.randomUUID();
//       const object = {
//         item: `${qNum}`,
//         ans: "D",
//         modelType: "mathpix",
//         contentType: "question",
//         contentSubType: "OMR",
//         maxScore: 1,
//         difficulty: 50,
//         skills: [],
//         qBox: [],
//         ansBox: [
//           {
//             x: currentX + 33,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "3ebeaf02-7ad6-4cc1-a69d-df7b3e1b3ec5",
//           },
//           {
//             x: currentX + 58,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "83fb375d-eba7-4027-b897-33577b143724",
//           },
//           {
//             x: currentX + 83,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "0d978f88-3f8a-4e32-a066-a6567022abd1",
//           },
//           {
//             x: currentX + 108,
//             y: currentY - 4,
//             h: 14,
//             w: 14,
//             boxType: "answer",
//             id: "846811b1-ed46-468e-acac-845647b719ab",
//           },
//         ],
//         id: cryptID,
//         orientation: "ltr",
//         rubric: "",
//         question: "",
//         language: "english",
//       };

//       metadata.push(object);
//       currentY += 27;
//     }
//     for (const circle of circles) {
//       doc.circle(circle.x, circle.y, circle.r).stroke();
//     }
//   }
//   // console.log(metadata,"METADATA")
//   return metadata;
// };

// async function imageToBase64(url) {
//   try {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         resolve(reader.result);
//       };
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error("Error fetching or converting the image:", error);
//     return null;
//   }
// }

// const footer = async (doc) => {
//   doc
//     .moveTo(0, 790)
//     .lineTo(615, 790)
//     .lineWidth(2)
//     .dash(3, { space: 5 })
//     .stroke();

//   // const imagePath = 'https://images.pexels.com/lib/api/pexels.png';
//   // const base64url = await imageToBase64(imagePath);

//   const imagePath = "/SmartPaperLogo.jpeg";

//   const base64url = await imageToBase64(imagePath);
//   doc.image(`${base64url}`, 270, 800, { scale: 0.3 });
//   // console.log(base64url, 'base64url  ');

//   // doc.quadraticCurveTo(130, 200, 150, 120).stroke();
// };

// const qrCode = async (doc) => {
//   const qr1 = "/top_left.jpg";
//   const qr2 = "/top_right.jpg";
//   const qr3 = "/bottom_left.jpg";
//   const qr4 = "/bottom_right.jpg";
//   const qr1base64 = await imageToBase64(qr1);
//   const qr2base64 = await imageToBase64(qr2);
//   const qr3base64 = await imageToBase64(qr3);
//   const qr4base64 = await imageToBase64(qr4);
//   doc.image(`${qr1base64}`, 10, 10, { scale: 0.07 });
//   doc.image(`${qr2base64}`, 550, 10, { scale: 0.07 });
//   doc.image(`${qr3base64}`, 10, 795, { scale: 0.07 });
//   doc.image(`${qr4base64}`, 550, 795, { scale: 0.07 });
// };

// export const PdfKitGenOMR = async (setPdf, csvDataLength) => {
//   const doc = new PDFDocument({
//     size: "A4",
//     margins: { top: 10, bottom: 10, left: 10, right: 10 },
//   });
//   const stream = doc.pipe(BlobStream());

//   await qrCode(doc);

//   await header(doc);

//   doc
//     .moveTo(0, 120)
//     .lineTo(615, 120)
//     .lineWidth(2)
//     .dash(3, { space: 5 })
//     .stroke();
//   const metaData = await body(doc, csvDataLength);
//   await footer(doc);

//   stream.on("finish", async function () {
//     const blobUrl = stream.toBlob("application/pdf");
//     const val3 = await readAsDataUri(blobUrl);
//     setPdf(val3);
//     const file = await base64ToFile(val3, "randomname.pdf", "application/pdf");
//     const imageObj = await PDFtoPNG([file], 200 / 96);
//     // console.log('image obj', imageObj);
//     const blob = URL.createObjectURL(imageObj[0]);
//     const imgNew = new Image();
//     imgNew.src = blob;
//     const tileHeight = doc.page.height;
//     const tileWidth = doc.page.width;
//     const FIXED_HT = 1280;
//     // console.log(tileHeight,tileWidth,'blob');
//     // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
//     const coords = new Promise((resolve, reject) => {
//       imgNew.onload = (prop) => {
//         console.log("test", imgNew.height, prop.naturalHeight);
//         if (imgNew.height > FIXED_HT || imgNew.width > FIXED_HT) {
//           let factor;
//           if (imgNew.height > imgNew.width) {
//             factor = imgNew.height / FIXED_HT;
//           } else {
//             factor = imgNew.width / FIXED_HT;
//           }

//           console.log(
//             factor,
//             "factor",
//             imgNew.height / factor,
//             imgNew.width / factor
//           );
//           resolve(
//             factorizeCoordinates({
//               data: metaData,
//               //image dimensions will be constant
//               imageHeight: 1170,
//               imageWidth: 827,
//               tileHeight: tileHeight,
//               tileWidth: tileWidth,
//             })
//           );

//           // setState(prevState => ({
//           //   ...prevState,
//           //   gridHeight: Math.ceil(this.naturalHeight / factor),
//           //   gridWidth: Math.ceil(this.naturalWidth / factor)
//           // }));
//         } else {
//           resolve(
//             factorizeCoordinates({
//               data: metaData,
//               imageHeight: imgNew.height,
//               imageWidth: imgNew.width,
//               tileHeight: tileHeight,
//               tileWidth: tileWidth,
//             })
//           );
//           // console.log(
//           //   'default ht and wt',
//           //   Math.ceil(this.naturalHeight),
//           //   Math.ceil(this.naturalWidth)
//           // );
//           // setState(prevState => ({
//           //   ...prevState,
//           //   gridHeight: Math.ceil(this.naturalHeight),
//           //   gridWidth: Math.ceil(this.naturalWidth)
//           // }));
//         }
//         console.log(imgNew.height, imgNew.width, "image");
//       };

//       imgNew.onerror = (error) => {
//         reject(error);
//       };
//     });
//     // console.log('facorized coords', coords);
//   });

//   doc.end();
//   return { metaData };
// };

// const factorizeCoordinates = ({
//   data,
//   imageHeight,
//   imageWidth,
//   tileHeight,
//   tileWidth,
// }) => {
//   // console.log('data', data);

//   if (!Array.isArray(data)) {
//     console.error("Data is not an array");
//     return [];
//   }

//   const widthFactor = imageWidth / tileWidth;
//   const heightFactor = imageHeight / tileHeight;
//   const result = [];
//   console.log(widthFactor, heightFactor);
//   for (const subItem of data) {
//     if (typeof subItem === "object") {
//       // console.log('Processing subItem', subItem);
//       const processedItem = { ...subItem };
//       for (const fact of processedItem.ansBox) {
//         fact.x = Math.round(fact.x * widthFactor);
//         fact.y = Math.round(fact.y * heightFactor);
//         fact.w = Math.round(fact.w);
//         fact.h = Math.round(fact.h);
//       }
//       result.push(processedItem);
//     } else {
//       console.error("Invalid subItem:", subItem);
//     }
//   }
//   console.log(result, "result");
//   return result;
// };

// async function base64ToFile(base64String, fileName, mimeType) {
//   const response = await fetch(base64String);
//   const blob = await response.blob();
//   return new File([blob], fileName, { type: mimeType });
// }

// export async function readAsDataUri(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.addEventListener("loadend", (_e) => {
//       if (typeof reader.result === "string") {
//         resolve(reader.result);
//       } else {
//         reject(reader.error);
//       }
//     });
//     reader.readAsDataURL(file);
//   });
// }
// export const dataURLtoFile = (dataurl) => {
//   var arr = dataurl.split(","),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = window.atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], `${crypto.randomUUID()}.png`, { type: mime });
// };

// import PDFDocument from '@react-pdf/pdfkit';
import BlobStream from 'blob-stream';
import PDFDocument from 'pdfkit/js/pdfkit.standalone';
// import pdfjs from 'pdfjs-dist/build/pdf';
// import doc from 'pdfkit';
// import fs from 'fs';
import QRCode from 'qrcode';

import { randomSequence } from './randomSequence';
//add textfield for test name
//fonts
//header,QRCode format same as jsPDF
//Refactoring metadata


 
// import PDFDocument from 'pdfkit';
export const OmrPdfGenerator = async (questions,textAreaValue) => {
  const s2 = randomSequence(textAreaValue)
  const header = async doc => {
    doc.fontSize(16);
 
    doc.font('Helvetica-Bold');
    // Add the test name and standard in the heading portion
    // doc.text('Grade 12 Biology (English medium)', 30, 20, { align: 'center' });
    doc.text(textAreaValue, 30, 20, { align: 'center' });

    doc.text(`Mark the correct circle`, 30, 40, { align: 'center' });
 
    doc.font('Helvetica').fontSize(14);
 
    doc.text(`Questions ${questions.length}`, 50, 20, { align: 'left' });
    // doc.text('90', 55, 40, { align: 'left' });
 
    doc.fontSize(16);
    // Name
    doc.text('Name:', 15, 80);
    doc.rect(110, 75, 180, 25).lineWidth(2).stroke(); // Draw a box for Name
 
    // ID
    doc.text('ID:', 330, 80);
    doc.rect(390, 75, 150, 25).lineWidth(2).stroke(); // Draw a box for ID
  };
 
  console.log('questions', questions);
  console.log(textAreaValue)
  const questionsTotal = questions.length;
  const circles = [];
  // const rectangles =[] 
  
  // const body = async doc => {
  //   const metadata = [];
 
  //   // const width = 1.3892621959414058;
  //   // const hgt = 1.3897302497951038;
 
  //   if (questionsTotal > 60) {
  //     doc
  //       .moveTo(185, 125)
  //       .lineTo(185, 785)
  //       .lineWidth(2)
  //       .dash(3, { space: 5 })
  //       .stroke();
  //     doc
  //       .moveTo(377, 125)
  //       .lineTo(377, 785)
  //       .lineWidth(2)
  //       .dash(3, { space: 5 })
  //       .stroke();
 
  //     doc.undash();
 
  //     const startX1 = 30;
  //     const startX2 = 220;
  //     const startX3 = 410;
 
  //     let startY = 140;
  //     let currentY = startY + 20;
 
  //     for (let qNum = 1; qNum <= questionsTotal; qNum++) {
  //       let currentX = startX1;
  //       if (qNum < 61 && qNum > 30) {
  //         currentX = startX2;
  //       } else if (qNum > 60) {
  //         currentX = startX3;
  //       }
 
  //       if (qNum === 1 || qNum === 31 || qNum === 61) {
  //         doc.font('Helvetica-Bold');
  //         currentY = startY + 20;
  //         doc.text('A', currentX + 35, currentY - 30).stroke();
  //         doc.text('B', currentX + 60, currentY - 30).stroke();
  //         doc.text('C', currentX + 85, currentY - 30).stroke();
  //         doc.text('D', currentX + 110, currentY - 30).stroke();
  //         doc.font('Helvetica');
  //       }
 
  //       doc.font('Helvetica-Bold').text(`${qNum}`, currentX, currentY - 3);
  //       doc.lineWidth(1);
  //       circles.push({ x: currentX + 40, y: currentY + 3, r: 6 });
  //       circles.push({ x: currentX + 65, y: currentY + 3, r: 6 });
  //       circles.push({ x: currentX + 90, y: currentY + 3, r: 6 });
  //       circles.push({ x: currentX + 115, y: currentY + 3, r: 6 });
 
  //       const cryptID = crypto.randomUUID();
  //       const object = {
  //         item: `${qNum}`,
  //         ans: ['D'],
  //         modelType: 'mathpix',
  //         contentType: 'question',
  //         contentSubType: 'OMR',
  //         maxScore: 1,
  //         difficulty: 50,
  //         skills: [],
  //         qBox: [],
  //         ansBox: [
  //           {
  //             x: currentX + 33,
  //             y: currentY - 4,
  //             h: 17,
  //             w: 17,
  //             boxType: 'answer',
  //             id: '3ebeaf02-7ad6-4cc1-a69d-df7b3e1b3ec5'
  //           },
  //           {
  //             x: currentX + 58,
  //             y: currentY - 4,
  //             h: 17,
  //             w: 17,
  //             boxType: 'answer',
  //             id: '83fb375d-eba7-4027-b897-33577b143724'
  //           },
  //           {
  //             x: currentX + 83,
  //             y: currentY - 4,
  //             h: 17,
  //             w: 17,
  //             boxType: 'answer',
  //             id: '0d978f88-3f8a-4e32-a066-a6567022abd1'
  //           },
  //           {
  //             x: currentX + 108,
  //             y: currentY - 4,
  //             h: 17,
  //             w: 17,
  //             boxType: 'answer',
  //             id: '846811b1-ed46-468e-acac-845647b719ab'
  //           }
  //         ],
  //         id: cryptID,
  //         orientation: 'ltr',
  //         rubric: '',
  //         question: '',
  //         language: 'english'
  //       };
 
  //       metadata.push(object);
  //       currentY += 21;
  //     }
  //     for (const circle of circles) {
  //       doc.circle(circle.x, circle.y, circle.r).stroke();
  //     }
  //   } else if (questionsTotal < 61 && questionsTotal > 40) {
  //     doc
  //       .moveTo(185, 125)
  //       .lineTo(185, 785)
  //       .lineWidth(2)
  //       .dash(3, { space: 5 })
  //       .stroke();
  //     doc
  //       .moveTo(377, 125)
  //       .lineTo(377, 785)
  //       .lineWidth(2)
  //       .dash(3, { space: 5 })
  //       .stroke();
 
  //     doc.undash();
 
  //     const startX1 = 30;
  //     const startX2 = 220;
  //     const startX3 = 410;
 
  //     let startY = 200;
  //     let currentY = startY + 20;
 
  //     const circles = [];
  //     // const rectangles = [];
 
  //     for (let qNum = 1; qNum <= questionsTotal; qNum++) {
  //       let currentX = startX1;
  //       if (qNum < 41 && qNum > 20) {
  //         currentX = startX2;
  //       } else if (qNum > 40) {
  //         currentX = startX3;
  //       }
 
  //       if (qNum === 1 || qNum === 21 || qNum === 41) {
  //         doc.font('Helvetica-Bold');
  //         currentY = startY + 20;
  //         doc.text('A', currentX + 35, currentY - 30).stroke();
  //         doc.text('B', currentX + 60, currentY - 30).stroke();
  //         doc.text('C', currentX + 85, currentY - 30).stroke();
  //         doc.text('D', currentX + 110, currentY - 30).stroke();
  //         doc.font('Helvetica');
  //       }
 
  //       doc.font('Helvetica-Bold').text(`${qNum}`, currentX, currentY);
  //       doc.lineWidth(1);
  //       circles.push({ x: currentX + 40, y: currentY + 7, r: 6 });
  //       circles.push({ x: currentX + 65, y: currentY + 7, r: 6 });
  //       circles.push({ x: currentX + 90, y: currentY + 7, r: 6 });
  //       circles.push({ x: currentX + 115, y: currentY + 7, r: 6 });
 
  //       const cryptID = crypto.randomUUID();
  //       const object = {
  //         item: `${qNum}`,
  //         ans: ['D'],
  //         modelType: 'mathpix',
  //         contentType: 'question',
  //         contentSubType: 'OMR',
  //         maxScore: 1,
  //         difficulty: 50,
  //         skills: [],
  //         qBox: [],
  //         ansBox: [
  //           {
  //             x: currentX + 33,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '3ebeaf02-7ad6-4cc1-a69d-df7b3e1b3ec5'
  //           },
  //           {
  //             x: currentX + 58,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '83fb375d-eba7-4027-b897-33577b143724'
  //           },
  //           {
  //             x: currentX + 83,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '0d978f88-3f8a-4e32-a066-a6567022abd1'
  //           },
  //           {
  //             x: currentX + 108,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '846811b1-ed46-468e-acac-845647b719ab'
  //           }
  //         ],
  //         id: cryptID,
  //         orientation: 'ltr',
  //         rubric: '',
  //         question: '',
  //         language: 'english'
  //       };
 
  //       metadata.push(object);
  //       currentY += 27;
  //     }
  //     for (const circle of circles) {
  //       doc.circle(circle.x, circle.y, circle.r).stroke();
  //     }
  //   } else if (questionsTotal < 41 && questionsTotal > 20) {
  //     doc
  //       .moveTo(300, 175)
  //       .lineTo(300, 770)
  //       .lineWidth(2)
  //       .dash(3, { space: 5 })
  //       .stroke();
  //     doc.undash();
  //     const startX1 = 60;
  //     const startX2 = 350;
 
  //     let startY = 200;
  //     let currentY = startY + 20;
 
  //     const circles = [];
 
  //     for (let qNum = 1; qNum <= questionsTotal; qNum++) {
  //       let currentX = startX1;
  //       if (qNum < 41 && qNum > 20) {
  //         currentX = startX2;
  //       }
 
  //       if (qNum === 1 || qNum === 21 || qNum === 41) {
  //         doc.font('Helvetica-Bold');
  //         currentY = startY + 20;
  //         doc.text('A', currentX + 35, currentY - 30).stroke();
  //         doc.text('B', currentX + 60, currentY - 30).stroke();
  //         doc.text('C', currentX + 85, currentY - 30).stroke();
  //         doc.text('D', currentX + 110, currentY - 30).stroke();
  //         doc.font('Helvetica');
  //       }
 
  //       doc.font('Helvetica-Bold').text(`${qNum}`, currentX, currentY);
  //       doc.lineWidth(1);
  //       circles.push({ x: currentX + 40, y: currentY + 7, r: 6 });
  //       circles.push({ x: currentX + 65, y: currentY + 7, r: 6 });
  //       circles.push({ x: currentX + 90, y: currentY + 7, r: 6 });
  //       circles.push({ x: currentX + 115, y: currentY + 7, r: 6 });
 
  //       const cryptID = crypto.randomUUID();
  //       const object = {
  //         item: `${qNum}`,
  //         ans: ['D'],
  //         modelType: 'mathpix',
  //         contentType: 'question',
  //         contentSubType: 'OMR',
  //         maxScore: 1,
  //         difficulty: 50,
  //         skills: [],
  //         qBox: [],
  //         ansBox: [
  //           {
  //             x: currentX + 33,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '3ebeaf02-7ad6-4cc1-a69d-df7b3e1b3ec5'
  //           },
  //           {
  //             x: currentX + 58,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '83fb375d-eba7-4027-b897-33577b143724'
  //           },
  //           {
  //             x: currentX + 83,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '0d978f88-3f8a-4e32-a066-a6567022abd1'
  //           },
  //           {
  //             x: currentX + 108,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '846811b1-ed46-468e-acac-845647b719ab'
  //           }
  //         ],
  //         id: cryptID,
  //         orientation: 'ltr',
  //         rubric: '',
  //         question: '',
  //         language: 'english'
  //       };
 
  //       metadata.push(object);
  //       currentY += 27;
  //     }
  //     for (const circle of circles) {
  //       doc.circle(circle.x, circle.y, circle.r).stroke();
  //     }
  //   } else {
  //     doc.undash();
  //     const startX1 = 220;
 
  //     let startY = 200;
  //     let currentY = startY + 20;
 
  //     const circles = [];
 
  //     for (let qNum = 1; qNum <= questionsTotal; qNum++) {
  //       let currentX = startX1;
 
  //       if (qNum === 1 || qNum === 21 || qNum === 41) {
  //         doc.font('Helvetica-Bold');
  //         currentY = startY + 20;
  //         doc.text('A', currentX + 35, currentY - 30).stroke();
  //         doc.text('B', currentX + 60, currentY - 30).stroke();
  //         doc.text('C', currentX + 85, currentY - 30).stroke();
  //         doc.text('D', currentX + 110, currentY - 30).stroke();
  //         doc.font('Helvetica');
  //       }
 
  //       doc.font('Helvetica-Bold').text(`${qNum}`, currentX, currentY);
  //       doc.lineWidth(1);
  //       circles.push({ x: currentX + 40, y: currentY + 7, r: 6 });
  //       circles.push({ x: currentX + 65, y: currentY + 7, r: 6 });
  //       circles.push({ x: currentX + 90, y: currentY + 7, r: 6 });
  //       circles.push({ x: currentX + 115, y: currentY + 7, r: 6 });
 
  //       const cryptID = crypto.randomUUID();
  //       const object = {
  //         item: `${qNum}`,
  //         ans: ['D'],
  //         modelType: 'mathpix',
  //         contentType: 'question',
  //         contentSubType: 'OMR',
  //         maxScore: 1,
  //         difficulty: 50,
  //         skills: [],
  //         qBox: [],
  //         ansBox: [
  //           {
  //             x: currentX + 33,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '3ebeaf02-7ad6-4cc1-a69d-df7b3e1b3ec5'
  //           },
  //           {
  //             x: currentX + 58,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '83fb375d-eba7-4027-b897-33577b143724'
  //           },
  //           {
  //             x: currentX + 83,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '0d978f88-3f8a-4e32-a066-a6567022abd1'
  //           },
  //           {
  //             x: currentX + 108,
  //             y: currentY - 4,
  //             h: 14,
  //             w: 14,
  //             boxType: 'answer',
  //             id: '846811b1-ed46-468e-acac-845647b719ab'
  //           }
  //         ],
  //         id: cryptID,
  //         orientation: 'ltr',
  //         rubric: '',
  //         question: '',
  //         language: 'english'
  //       };
 
  //       metadata.push(object);
  //       currentY += 27;
  //     }
  //     for (const circle of circles) {
  //       doc.circle(circle.x, circle.y, circle.r).stroke();
  //     }
  //   }
  //   return metadata;
  // };
  // const generateLayout = (doc, questionsTotal) => {
  //   doc.undash(); // Remove any existing dash style
  
  //   const startX = [30, 220, 410]; // X positions for columns
  //   const startY = 140; // Initial Y position
  //   const rowSpacing = 21; // Vertical spacing between rows
  //   const columnSpacing = 38; // Horizontal spacing between columns
  
  //   // Determine the number of rows and columns based on questionsTotal
  //   let rows = Math.ceil(questionsTotal / startX.length);
  //   let columns = startX.length;
  
  //   for (let column = 0; column < columns; column++) {
  //     // Draw a dashed vertical line between columns
  //     if (column > 0) {
  //       doc
  //         .moveTo(startX[column]-10, startY-10)
  //         .lineTo(startX[column]-10, startY+40 + (rows - 1) * rowSpacing)
  //         .lineWidth(2)
  //         .dash(3, { space: 5 })
  //         .stroke();
  //     }
  
  //     for (let row = 0; row < rows; row++) {
  //       const qNum = column * rows + row + 1;
  //       const currentX = startX[column];
  //       const currentY = startY + row * rowSpacing;
  
  //       // Draw question number
  //       doc.font('Helvetica-Bold').text(`${qNum}`, currentX, currentY - 3).font('Helvetica');
  
  //       // Draw circles for options A, B, C, D
  //       for (let i = 0; i < 4; i++) {
  //         doc.undash()
  //         doc.circle(currentX + 35 + i * columnSpacing, currentY + 3, 6).stroke();
  //       }
  //     }
  //   }
  // };
  const generateLayout = (doc, questionsTotal) => {
    doc.undash(); // Remove any existing dash style
  
    const columns = questionsTotal >= 60 ? 3 : 2;
    const startX = [30, 220, 410].slice(0, columns); // X positions for columns
    const columnSpacing = 38; // Horizontal spacing between columns
  
    // Adjusted the condition here
    const rows = questionsTotal >= 60 ? 30 : 20;
    const startY = 140;
    const rowSpacing = 21;
  
    for (let column = 0; column < columns; column++) {
      if (column > 0) {
        doc
          .moveTo(startX[column] - 10, startY - 10)
          .lineTo(startX[column] - 10, startY + 40 + (rows - 1) * rowSpacing)
          .lineWidth(2)
          .dash(3, { space: 5 })
          .stroke();
      }
  
      for (let row = 0; row < rows; row++) {
        const qNum = column * rows + row + 1;
        const currentX = startX[column];
        const currentY = startY + row * rowSpacing;
  
        doc.font('Helvetica-Bold').text(`${qNum}`, currentX, currentY - 3).font('Helvetica');
  
        for (let i = 0; i < 4; i++) {
          doc.undash();
          doc.circle(currentX + 35 + i * columnSpacing, currentY + 3, 6).stroke();
        }
      }
    }
  };
  
  
  const body = (doc, questionsTotal) => {
    const metadata = [];
  
    if (questionsTotal > 0) {
      generateLayout(doc, questionsTotal);
  
      // Generate metadata based on questionsTotal
      for (let qNum = 1; qNum <= questionsTotal; qNum++) {
        const cryptID = crypto.randomUUID();
        const object = {
          item: `${qNum}`,
          ans: ['D'],
          modelType: 'mathpix',
          contentType: 'question',
          contentSubType: 'OMR',
          maxScore: 1,
          difficulty: 50,
          skills: [],
          qBox: [],
          ansBox: [
            {
              x: 33,
              y: -4,
              h: 14,
              w: 14,
              boxType: 'answer',
              id: crypto.randomUUID(),
            },
            {
              x: 58,
              y: -4,
              h: 14,
              w: 14,
              boxType: 'answer',
              id: crypto.randomUUID(),
            },
            {
              x: 83,
              y: -4,
              h: 14,
              w: 14,
              boxType: 'answer',
              id: crypto.randomUUID(),
            },
            {
              x: 108,
              y: -4,
              h: 14,
              w: 14,
              boxType: 'answer',
              id: crypto.randomUUID(),
            },
          ],
          id: cryptID,
          orientation: 'ltr',
          rubric: '',
          question: '',
          language: 'english',
        };
  
        metadata.push(object);
      }
    }
  
    return metadata;
  };
 

  
  async function imageToBase64(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise(resolve => {
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
 
  const footer = async doc => {
    doc
      .moveTo(0, 790)
      .lineTo(615, 790)
      .lineWidth(2)
      .dash(3, { space: 5 })
      .stroke();
 
    // const imagePath = 'https://images.pexels.com/lib/api/pexels.png';
    // const base64url = await imageToBase64(imagePath);
 
    //   const imagePath = '/SmartPaperLogo.jpeg';
 
    //   const base64url = await imageToBase64(imagePath);
    //   doc.image(`${base64url}`, 270, 800, { scale: 0.3 });
    // console.log(base64url, 'base64url  ');
 
    // doc.quadraticCurveTo(130, 200, 150, 120).stroke();
  };
 
  const qrCode = async doc => {
    const opts = {
      maskPattern: 1,
      // scale: 2,
      size: 'small',
      margin: 3,
      type: 'image/jpeg'
    };
    const id = Math.round(s2() * 10000000);
    // const img1 = await QRCode.toDataURL(`123`, opts);
    const img1 = await QRCode.toDataURL(`${textAreaValue}-${id}`, opts);

    const img = await imageToBase64(img1);
    //   console.log('image', img);
    //   const qr1 = '/top_left.jpg';
    //   const qr2 = '/top_right.jpg';
    //   const qr3 = '/bottom_left.jpg';
    //   const qr4 = '/bottom_right.jpg';
    //   const qr1base64 = await imageToBase64(qr1);
    //   const qr2base64 = await imageToBase64(qr2);
    //   const qr3base64 = await imageToBase64(qr3);
    //   const qr4base64 = await imageToBase64(qr4);
    doc.image(`${img}`, 5, 5, { scale: 0.3 });
    doc.image(`${img}`, 545, 5, { scale: 0.3 });
    doc.image(`${img}`, 5, 795, { scale: 0.3 });
    doc.image(`${img}`, 545, 795, { scale: 0.3 });
  };
 
  const PdfKitGenOMR = async () => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 10, bottom: 10, left: 10, right: 10 }
    });
    const stream = doc.pipe(BlobStream());
 
    await qrCode(doc);
 
    await header(doc);
 
    doc
      .moveTo(0, 120)
      .lineTo(615, 120)
      .lineWidth(2)
      .dash(3, { space: 5 })
      .stroke();
    const metaData = await body(doc,questionsTotal);
 
    await footer(doc);
 
    const blobUrl = new Promise((resolve, reject) => {
      stream.on('finish', async function () {
        const blobUrl = stream.toBlob('application/pdf');
        const val4 = await readAsDataUri(blobUrl);
        resolve(val4);
      });
      stream.on('error', async function (error) {
        reject(error);
      });
    });
 
    doc.end();
    console.log('blob:', blobUrl);
    return {
      blobUrl: await blobUrl,
      questionMedata: metaData,
      tileHeight: doc.page.height,
      tileWidth: doc.page.width,
      characterCountArray: 400
    };
  };
 
  const factorizeCoordinates = ({
    data,
    imageHeight,
    imageWidth,
    tileHeight,
    tileWidth
  }) => {
    // console.log('data', data);
 
    if (!Array.isArray(data)) {
      console.error('Data is not an array');
      return [];
    }
 
    const widthFactor = imageWidth / tileWidth;
    const heightFactor = imageHeight / tileHeight;
    const result = [];
    console.log(widthFactor, heightFactor);
    for (const subItem of data) {
      if (typeof subItem === 'object') {
        // console.log('Processing subItem', subItem);
        const processedItem = { ...subItem };
        for (const fact of processedItem.ansBox) {
          fact.x = Math.round(fact.x * widthFactor);
          fact.y = Math.round(fact.y * heightFactor);
          fact.w = Math.round(fact.w);
          fact.h = Math.round(fact.h);
        }
        result.push(processedItem);
      } else {
        console.error('Invalid subItem:', subItem);
      }
    }
    console.log(result, 'result');
    return result;
  };
 
  async function base64ToFile(base64String, fileName, mimeType) {
    const response = await fetch(base64String);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
  }
  return { PdfKitGenOMR };
};
export async function readAsDataUri(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', _e => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(reader.error);
      }
    });
    reader.readAsDataURL(file);
  });
}
export const dataURLtoFile = dataurl => {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${crypto.randomUUID()}.png`, { type: mime });
};