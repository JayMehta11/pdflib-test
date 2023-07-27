import * as pdfjs from 'pdfjs-dist';
// import pdfjs from 'pdfjs';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/* const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
}; */

const readFileData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};
export const PDFtoPNG = async (files, scaleFactor = 1) => {
  let finalImages = [];
  //   console.log('file', files);
  await Promise.all(
    files.map(async (file) => {
      // console.log('file', file);
      //   const data = await readFileData(file);

      let newImages = [];
      const pdf = await pdfjs.getDocument(file).promise;
      const numPages = pdf.numPages;
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: scaleFactor });
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        const canvasContext = canvas.getContext('2d');
        const renderContext = {
          canvasContext,
          viewport,
        };
        await page.render(renderContext).promise;
        const imageData = dataURLtoFile(canvas.toDataURL('image/png'));
        newImages.push(imageData);
      }
      finalImages.push(...newImages);
      return newImages;
    })
  );
  return finalImages;
};
/* const PDFtoPNG = async (files) => {
  let finalImages = [];
  files.map(async (file) => {
    const data = await readFileData(file);

    let newImages = [];
    const pdf = await PDFJS.getDocument(data).promise;
    const numPages = pdf.numPages;
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const canvasContext = canvas.getContext("2d");
      const renderContext = {
        canvasContext,
        viewport,
      };
      await page.render(renderContext).promise;
      const imageData = canvas.toDataURL("image/png");
      newImages.push(imageData);
    }
    finalImages.push(newImages);
    return newImages;
  });
  return finalImages;
}; */

export const dataURLtoFile = (dataurl) => {
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

// const MultiPdf = () => {
//   const [files, setFiles] = useState();
//   const [images, setImages] = useState([]);
//   const handleFileChange = (files) => {
//     setFiles(files);
//   };
//   const handleReject = (e) => {
//     console.log('handleReject', e);
//   };
//   const handleDropError = (e) => {
//     console.log('handleDropError', e);
//   };

//   //param: file -> the input file (e.g. event.target.files[0])
//   //return: images -> an array of images encoded in base64
//   const handlePDF = async (files) => {
//     //note: Change this line to handle Multiple pages
//     const file = files[0];
//     const pngs = await PDFtoPNG(file);
//     console.log(pngs, pngs.length);
//     setImages(pngs);
//   };
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <FileUploader
//         disabled={false}
//         fileTypes='pdf'
//         multiple={false}
//         onDrop={handleFileChange}
//         onDropAccept={handlePDF}
//         onDropReject={handleReject}
//         onDropError={handleDropError}
//         progressBar={false}
//         label='Browse or Drag & Drop Book PDF File here'
//         style={{ maxWidth: '500px' }}
//       />
//       {files && (
//         <>
//           <span>{files.name}</span>
//           <p>{(files[0].size / 1000 / 1000).toFixed(2)} Mbytes</p>
//         </>
//       )}
//       {images &&
//         images.map((image, index) => (
//           <img
//             src={image}
//             alt='user-test'
//             key={index}
//             style={{ border: '1px solid black', zIndex: 10 }}
//           />
//         ))}
//     </div>
//   );
// };

// export default MultiPdf;
