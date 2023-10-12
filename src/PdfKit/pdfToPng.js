import * as pdfjs from 'pdfjs-dist';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const readFileData = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(e.target.result);
      };
      reader.onerror = err => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  };
//   export const PDFtoPNG = async (files, scaleFactor = 1) => {
//     let finalImages = [];
//     await Promise.all(
//       files.map(async file => {
//         const data = await readFileData(file);
  
//         let newImages = [];
//         const pdf = await pdfjs.getDocument(data).promise;
//         const numPages = pdf.numPages;
//         for (let i = 1; i <= numPages; i++) {
//           const page = await pdf.getPage(i);
//           const viewport = page.getViewport({ scale: scaleFactor });
//           const canvas = document.createElement('canvas');
//           canvas.width = Math.round(viewport.width);
//           canvas.height = Math.round(viewport.height);
//           const canvasContext = canvas.getContext('2d');
//           const renderContext = {
//             canvasContext,
//             viewport
//           };
//           await page.render(renderContext).promise;
//           const imageData = dataURLtoFile(canvas.toDataURL('image/png'));
//           newImages.push(imageData);
//         }
//         finalImages.push(...newImages);
//         return newImages;
//       })
//     );
//     return finalImages;
//   };
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
  