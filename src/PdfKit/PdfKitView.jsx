import Papa from "papaparse";
import React, { useEffect, useState } from "react";

import { OmrPdfGenerator } from "./PdfKitGenOMR";

const PdfKitView = () => {
  const [pdf, setPdf] = useState("");
  const [csvData, setCsvData] = useState([]);
  // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
  const [metadata, setMetadata] = useState([]); // Initialize metadata as an empty array
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          // Store the CSV data in state
          const newData = result.data.map((item) => ({
            questionId: crypto.randomUUID(),
            question: item.question,
            answer: item.answer,
          }));
          // console.log(newData);
          setCsvData(newData);
          console.log("CSV data:", result.data);

          // After loading the CSV data, update the metadata
          // updateMetadataWithCSVAnswers(result.data);
        },
        header: true,
        skipEmptyLines: true, // If the first row contains column headers
      });
    }
  };

  // const updateMetadataWithCSVAnswers = (csvData, questionMedata) => {
  //   //update metadata inside pdfkitGen
  //   const updatedMetadata = questionMedata.map((metadataItem) => {
  //     const question = metadataItem.item;
  //     const answer = csvData.find((csvRow) => csvRow["question"] === question); // Replace 'Question' with the header of the 2nd column in your CSV
  //     if (answer) {
  //       metadataItem.ans = [answer["answer"]]; 
  //       metadataItem.questionId =answer.questionId         // Replace 'Answers' with the header of the 3rd column in your CSV
  //     }

  //     return metadataItem;
  //   });

  //   setMetadata(updatedMetadata);
  //   // console.log(updatedMetadata,"UPDATED");
  // };

  useEffect(() => {
    // onCreate();
  }, []);

  const onCreate = async () => {
    // const csvDataLength = csvData.length;
    console.count("onCreate");
    const { PdfKitGenOMR } = await OmrPdfGenerator(csvData, textAreaValue);
    const {
      blobUrl,
      questionMedata,
      // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
      tileHeight,
      // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
      tileWidth,
      // eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
      characterCountArray,
    } = await PdfKitGenOMR();
    // console.log(blobUrl,questionMedata,"blob")
    setMetadata(questionMedata);
    setPdf(blobUrl);
    // const value = await PdfKitGenOMR(setPdf,csvDataLength);
    // console.log(value)
    // setMetadata(value)
    // setPdf(value);
    // updateMetadataWithCSVAnswers(csvData, questionMedata);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <object
        type="application/pdf"
        style={{ width: "80vw", minHeight: "90vh" }}
        id="pdfDoc"
        data={pdf}
      >
        <p>Unable to display file</p>
      </object>
      <button onClick={onCreate}>Create a pdfkit</button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ margin: "10px 0" }}
          />
          Upload CSV
        </button>
        <textarea
          style={{ width: "300px", height: "35px" }}
          placeholder="Test Name"
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PdfKitView;
