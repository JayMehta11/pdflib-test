// import PDFDocument from '@react-pdf/pdfkit';
import BlobStream from "blob-stream";
import * as pdfjs from "pdfjs-dist";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
// import pdfjs from 'pdfjs-dist/build/pdf';
// import doc from 'pdfkit';
// import fs from 'fs';
import QRCode from "qrcode";

import { randomSequence } from "./randomSequence";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import PDFDocument from 'pdfkit';
export const OmrPdfGenerator = async (questions, textAreaValue) => {
  const s2 = randomSequence(textAreaValue);
  const metadata = [];
  const questionsPerPage = 90;
  let questionsTotal = questions.length;
  let pageNum = 0;
  const totalPage = Math.ceil(questions.length / questionsPerPage);
  //metadata[0].push(obj)
  
  const addId = async (doc) => {
    const studentData = [
      { questionId: 6789, answerBoxId: 1234 },
      { questionId: 1357, answerBoxId: 2468 },
    ];
    doc.undash();
    doc.text("ID:", 230, 60);
    doc.rect(270, 53, 120, 27).lineWidth(2).stroke(); 
    
    metadata[pageNum].push({
      ansBox: [
        {
          x: 270,
          y: 53,
          w: 120,
          h: 27,
          id: studentData[1].answerBoxId,
          boxType: "studentInfo",
        },
      ],
      ans: [],
      qBox: [],
      item: metadata[pageNum].length + 1,
      modelType: "mathpix",
      contentType: "studentInfo",
      contentSubType: "number",
      maxScore: 1,
      difficulty: 50,
      orientation: "ltr",
      id: studentData[1].questionId,
      rubric: "",
      question: "",
      language: "english",
    });
  }
  const addName = async (doc) => {     
    doc.text("Name:", 10, 60);
    doc.rect(70, 53, 140, 27).lineWidth(2).stroke(); 
    
    const studentData = [
      { questionId: 6789, answerBoxId: 1234 },
      { questionId: 1357, answerBoxId: 2468 },
    ];

    metadata[pageNum].push({
      ansBox: [
        {
          x: 70,
          y: 53,
          w: 140,
          h: 27,
          id: studentData[0].answerBoxId,
          boxType: "studentInfo",
        },
      ],
      ans: [],
      qBox: [],
      item: metadata[pageNum].length + 1,
      modelType: "mathpix",
      contentType: "studentInfo",
      contentSubType: "name",
      maxScore: 1,
      difficulty: 50,
      orientation: "ltr",
      id: studentData[0].questionId,
      rubric: "",
      question: "",
      language: "english",
    });
  };
  const header = async (doc) => {
    doc.undash();
    doc.fontSize(16);

    doc.font("Helvetica-Bold");
    doc.text(textAreaValue, 30, 15, { align: "center" });
    
    doc.font("Helvetica").fontSize(14);

    doc.fontSize(16);

    // await addName(doc);
    // await await addId(doc);
    // addNameId();
    doc.fontSize(14);
    
    doc.text(`Maximum marks: ${questionsTotal}`, 410, 60);
  };
  console.log("questions", questions);

  const addPageNumber = async (doc, currentPage) => {
    doc.fontSize(12).font('Helvetica').text(`Page ${currentPage} of ${totalPage}`, 480, 805);
    doc
      .moveTo(0, 110)
      .lineTo(615, 110)
      .lineWidth(2)
      .dash(3, { space: 5 })
      .stroke();
    pageNum += 1;
  };
  const body = async (doc, questionsTotal, questions) => {
    console.log(questions);
    doc.undash(); // Remove any existing dash style

    const columns = 3;
    const startX = [30, 220, 410].slice(0, columns); // X positions for columns
    const columnSpacing = 38; // Horizontal spacing between columns

    const rows = 30;
    const startY = 155;
    const rowSpacing = 21;
    const dashedLineY = startY + 25 + (rows - 1) * rowSpacing; // Y position of the dashed horizontal line

    // Create an array to store answer box positions for each question
    const ansBoxes = Array(questionsTotal)
      .fill(null)
      .map(() => []);

      
      if (questionsTotal > 0) {
      let currentPage = 1; // Track the current page number
      let currentQuestion = 0; // Track the current question index
      doc.fontSize(12).text(`Page 1 of ${totalPage}`, 480, 805);
      while (currentQuestion < questionsTotal) {
        if (currentPage > 1) {
          doc.addPage();
          await addPageNumber(doc, currentPage);
          // await addId(doc);
          await qrCode(doc);
          footer(doc);
        }
        
        const pageData = [];
        // Iterate through columns and rows as before
        for (let column = 0; column < columns; column++) {
          if (column > 0) {
            doc
              .moveTo(startX[column] - 10, startY - 35)
              .lineTo(startX[column] - 10, dashedLineY)
              .lineWidth(2)
              .dash(3, { space: 5 })
              .stroke();
          }

          for (let row = 0; row < rows; row++) {
            // const qNum = currentQuestion + 1;
            const qNum = column * rows + row + 1 + pageNum * questionsPerPage;
            // Check if qNum exceeds questionsTotal
            if (qNum > questionsTotal) {
              break; // Exit the loop if we've reached the desired number of questions
            }

            const currentX = startX[column];
            const currentY = startY + row * rowSpacing;

            doc
              .font("Helvetica-Bold")
              .text(
                `${qNum < 10 ? " " + qNum : qNum}`,
                currentX + 3,
                currentY + 3
              ); // Adjusted the X position for numbers

            if (row === 0) {
              // Add options "A, B, C, D" above each circle in the first row
              doc.font("Helvetica-Bold");
              doc.text("A", currentX + 37, currentY - 25).stroke();
              doc
                .text("B", currentX + 37 + columnSpacing, currentY - 25)
                .stroke();
              doc
                .text("C", currentX + 37 + 2 * columnSpacing, currentY - 25)
                .stroke();
              doc
                .text("D", currentX + 37 + 3 * columnSpacing, currentY - 25)
                .stroke();
            }

            doc.rect(currentX+35,currentY+2,14,14)
            // Store the coordinates of the answer boxes for this question
            ansBoxes[qNum - 1] = [
              {
                x: currentX + 35, // Adjusted X position for the answer box
                y: currentY - 4,
                h: 14,
                w: 14,
                boxType: "answer",
                id: crypto.randomUUID(),
              },
              {
                x: currentX + 35 + columnSpacing,
                y: currentY - 4,
                h: 14,
                w: 14,
                boxType: "answer",
                id: crypto.randomUUID(),
              },
              {
                x: currentX + 35 + 2 * columnSpacing,
                y: currentY - 4,
                h: 14,
                w: 14,
                boxType: "answer",
                id: crypto.randomUUID(),
              },
              {
                x: currentX + 35 + 3 * columnSpacing,
                y: currentY - 4,
                h: 14,
                w: 14,
                boxType: "answer",
                id: crypto.randomUUID(),
              },
            ];

            for (let i = 0; i < 4; i++) {
              doc.undash();
              const circleY = currentY + 3 + 6; // Adjust Y position for circles
              doc
                .lineWidth(1)
                .circle(currentX + 42 + i * columnSpacing, circleY, 6)
                .stroke();
            }

            const cryptID = crypto.randomUUID();
            const object = {
              item: `${qNum}`,
              ans: [`${questions[qNum - 1].answer}`],
              modelType: "mathpix",
              contentType: "question",
              contentSubType: "OMR",
              maxScore: 1,
              difficulty: 50,
              skills: [],
              qBox: [],
              ansBox: ansBoxes[qNum - 1], // Use the answer box positions for this question
              id: cryptID,
              orientation: "ltr",
              rubric: "",
              question: "",
              language: "english",
              questionId: [`${questions[qNum - 1].questionId}`],
            };
            pageData.push(object);
            currentQuestion++;
          }
        }
        metadata.push(pageData);
        if(currentPage===1){
          await addName(doc);
          await addId(doc);
        }
        else{
          await addId(doc);
        }
        currentPage++;
        // addNameId();
      }
    }

    console.log(metadata, "META");
    return metadata;
  };

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
      console.error("Error fetching or converting the image:", error);
      return null;
    }
  }

  const footer = (doc) => {
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

  const qrCode = async (doc) => {
    const opts = {
      maskPattern: 1,
      // scale: 2,
      size: "small",
      margin: 3,
      type: "image/jpeg",
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
    doc.image(img, 5, 5, { scale: 0.3 });
    doc.image(img, 545, 5, { scale: 0.3 });
    doc.image(img, 5, 795, { scale: 0.3 });
    doc.image(img, 545, 795, { scale: 0.3 });
  };

  const PdfKitGenOMR = async () => {
    const doc = new PDFDocument({
      bufferPages: true,
      size: "A4",
      margins: { top: 10, bottom: 10, left: 10, right: 10 },
    });

    const stream = doc.pipe(BlobStream());

    await qrCode(doc);

    await header(doc);

    doc
      .moveTo(0, 110)
      .lineTo(615, 110)
      .lineWidth(2)
      .dash(3, { space: 5 })
      .stroke();
    footer(doc);
    const metaData = await body(doc, questionsTotal, questions);
    // console.log(metaData, "metaData");

    const blobUrl = new Promise((resolve, reject) => {
      stream.on("finish", async function () {
        const blobUrl = stream.toBlob("application/pdf");
        const val4 = await readAsDataUri(blobUrl);
        resolve(val4);
      });
      stream.on("error", async function (error) {
        reject(error);
      });
    });

    doc.end();
    console.log("blob:", blobUrl);
    return {
      blobUrl: await blobUrl,
      questionMedata: metaData,
      tileHeight: doc.page.height,
      tileWidth: doc.page.width,
      characterCountArray: 400,
    };
  };

  return { PdfKitGenOMR };
};
export async function readAsDataUri(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", (_e) => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(reader.error);
      }
    });
    reader.readAsDataURL(file);
  });
}
export const dataURLtoFile = (dataurl) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${crypto.randomUUID()}.png`, { type: mime });
};
