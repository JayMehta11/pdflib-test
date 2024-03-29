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
export const OmrPdfGenerator50 = async (questions, textAreaValue) => {

  const s2 = randomSequence(textAreaValue);
  const metadata = [];
  const questionsPerPage = 90;
  let questionsTotal = questions.length;
  let pageNum = 0;
  const totalPage = Math.ceil(questions.length / questionsPerPage);
  //metadata[0].push(obj)

  const addId = async (doc, y, upperLayout) => {
    const studentData = [
      { questionId: 6789, answerBoxId: 1234 },
      { questionId: 1357, answerBoxId: 2468 },
    ];
    doc.undash();
    doc.fontSize(10);
    // doc.text("Roll No:", 10, 105);
    // doc.rect(70, 95, 440, 27).lineWidth(2).stroke(); 
    doc.text("Roll No:", 9, 115 + y);
    // doc.rect(50, 110, 490, 20).lineWidth(1).stroke(); // Draw a box for ID
    const currentY = 110 + y;
    const currentX = 30;
    
    const parts = [
      { start: 0, end: 3 },
      { start: 0, end: 9 },
      { start: 0, end: 9 }
    ];
  
    let circleIndex = 0;
    
    for (const part of parts) {
        for (let i = part.start; i <= part.end; i++) {
            doc.undash();
            const circleX = currentX + 42 + circleIndex * 19 - 4; // Adjust X position for circles
            const circleY = currentY + 9; // Adjust Y position for circles
            doc
                .lineWidth(1)
                .circle(circleX, circleY, 6) // Increase circle size to accommodate numbers
                .stroke();
    
            // Add numbers inside each circle
            const number = i.toString(); // Adjusted to display numbers 0-9 horizontally
            const numberX = circleX - 3; // Adjust X position for numbers
            const numberY = circleY - 4; // Adjust Y position for numbers
            doc
                .fontSize(10)
                .text(number, numberX, numberY); 
            circleIndex++;
        }
        circleIndex++;
    }
    // doc.rect(currentX+36+4*19-4,currentY+3,12,12);
    const ansBoxId = [];

    for (let i = 0; i < 26; i++) {
        if (i !== 4 && i !== 15) {
            ansBoxId.push({
                x: currentX + 36 + i * 19 - 4,
                y: currentY + 3,
                w: 12,
                h: 12,
                id: studentData[1].answerBoxId,
                boxType: "studentInfo"
            });
        }
    }

    if(upperLayout){
      metadata[pageNum].push({
        ansBox: ansBoxId,
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
    
  }
  const addName = async (doc, y, upperLayout) => {
    // doc.text("Name:", 10, 60);
    // doc.rect(70, 53, 440, 27).lineWidth(2).stroke(); 
    doc.fontSize(10);
    doc.text("Name:", 10, 80 + y);
    doc.rect(50, 75 + y, 490, 20).lineWidth(1).stroke();

    const studentData = [
      { questionId: 6789, answerBoxId: 1234 },
      { questionId: 1357, answerBoxId: 2468 },
    ];
    if(upperLayout){
      metadata[pageNum].push({
        ansBox: [
          {
            x: 50,
            y: 75+y,
            w: 490,
            h: 20,
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
    }
    
  };
  const header = async (doc, y) => {
    doc.undash();
    doc.fontSize(14);

    doc.font("Helvetica-Bold");
    // Add the test name and standard in the heading portion
    doc.text(textAreaValue, 30, 55 + y, { align: "center" });
    doc.fontSize(12);

    doc.text("Loyola School", 30, 15 + y, { align: "center" });
    // Draw a box for Date
    doc.text("Date:", 420, 17 + y);
    doc.rect(450, 12 + y, 90, 22).lineWidth(1).stroke(); // Draw a box for Name

    doc.text("Std:11", 30, 35 + y, { align: "center" });

    // doc.text(Mark the correct circle, 30, 30, { align: "center" });

    doc.font("Helvetica").fontSize(14);

    doc.fontSize(10);

    doc.fontSize(14);
    //marks
    // doc.text(Maximum marks: ${questionsTotal}, 410, 60);
  };
  // console.log("questions", questions);

  // const addPageNumber = async (doc, currentPage) => {
  //   doc.fontSize(12).font('Helvetica').text(`Page ${currentPage} of ${totalPage}`, 480, 805);
  //   doc
  //     .moveTo(0, 110)
  //     .lineTo(615, 110)
  //     .lineWidth(2)
  //     .dash(3, { space: 5 })
  //     .stroke();
  //   pageNum += 1;
  // };
  const body = async (doc, questionsTotal, questions, startY,upperLayout) => {
    // console.log(questions);
    doc.undash(); // Remove any existing dash style

    const columns = 5; // Changed to 5 columns
    const startX = [10, 120, 230, 340, 450].slice(0, columns); // Adjusted X positions for 5 columns
    const columnSpacing = 20; // Horizontal spacing between columns

    const rows = 10; // Changed to 10 rows
    // const startY = 165;
    const rowSpacing = 21;
    const dashedLineY = startY + 25 + (rows - 1) * rowSpacing; // Y position of the dashed horizontal line

    // Create an array to store answer box positions for each question
    const ansBoxes = Array(questionsTotal)
      .fill(null)
      .map(() => []);


    if (questionsTotal > 0) {
      let currentPage = 1; // Track the current page number
      let currentQuestion = 0; // Track the current question index
      const totalPage = Math.ceil(questionsTotal / (columns * rows));
      // doc.fontSize(12).text(`Page 1 of ${totalPage}`, 480, 805);
      while (currentQuestion < questionsTotal) {
        if (currentPage > 1) {
          doc.addPage();
          // await addPageNumber(doc, currentPage);
          // await addId(doc);
          await qrCode(doc);
          // footer(doc);
        }

        const pageData = [];
        // Iterate through columns and rows as before
        for (let column = 0; column < columns; column++) {
          if (column > 0) {
            doc
              .moveTo(startX[column] + 4, startY - 15)
              .lineTo(startX[column] + 4, dashedLineY)
              .lineWidth(1)
              .dash(3, { space: 5 })
              .stroke();
          }

          for (let row = 0; row < rows; row++) {
            // const qNum = currentQuestion + 1;
            const qNum = column * rows + row + 1 + (currentPage - 1) * columns * rows;
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
                currentX + 10,
                currentY + 3
              ); // Adjusted the X position for numbers

            if (row === 0) {
              // Add options "A, B, C, D" above each circle in the first row
              doc.font("Helvetica-Bold");
              doc.text("A", currentX + 37, currentY - 15).stroke();
              doc
                .text("B", currentX + 37 + columnSpacing, currentY - 15)
                .stroke();
              doc
                .text("C", currentX + 37 + 2 * columnSpacing, currentY - 15)
                .stroke();
              doc
                .text("D", currentX + 37 + 3 * columnSpacing, currentY - 15)
                .stroke();
            }
            for (let i = 0; i < 4; i++) {
              doc.undash();
              const circleY = currentY + 3 + 6; // Adjust Y position for circles
              doc
                .lineWidth(1)
                .circle(currentX + 42 + i * columnSpacing, circleY, 6)
                .stroke();
            }

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
            currentQuestion++};

        }
        if(upperLayout){
        metadata.push(pageData)};

        if (currentPage === 1) {
          doc.undash();
          await addName(doc, 0,true);
          await addName(doc, 421,false);
          await addId(doc, 0,true);
          await addId(doc, 421,false);
        }
        else {
          // await addId(doc);
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

  const qrCode = async (doc, y) => {
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
    doc.image(img, 5, 5 + y, { scale: 0.3 });
    doc.image(img, 545, 5 + y, { scale: 0.3 });
    doc.image(img, 5, 385 + y, { scale: 0.3 });
    doc.image(img, 545, 385 + y, { scale: 0.3 });
  };

  const PdfKitGenOMR = async () => {

    const doc = new PDFDocument({
      bufferPages: true,
      size: "A4",
      margins: { top: 10, bottom: 10, left: 10, right: 10 },
    });

    const stream = doc.pipe(BlobStream());

    await qrCode(doc, 0);

    await header(doc, 0);

    const metaData = await body(doc, questionsTotal, questions, 165,true);
    // console.log(metaData, "metaData");
    doc.dash(5, { space: 5 })
      .moveTo(0, 421)
      .lineTo(doc.page.width, 421)
      .stroke();
    await qrCode(doc, 421);
    await header(doc, 421);


    await body(doc, questionsTotal, questions, 585,false);

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
