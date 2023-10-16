import * as pdfjs from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
  await Promise.all(
    files.map(async (file) => {
      const data = await readFileData(file);

      let newImages = [];
      const pdf = await pdfjs.getDocument(data).promise;
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

// generateImage(pageImg, base64Image => {
//   const img = new Image();
//   img.crossOrigin = 'anonymous';
//   img.onload = function () {
//     console.log(
//       'changed ht, wt',
//       img.naturalHeight,
//       img.naturalWidth
//       // Math.ceil(this.naturalHeight / factor),
//       // Math.ceil(this.naturalWidth / factor)
//     );
//     if (this.naturalHeight > FIXED_HT || this.naturalWidth > FIXED_HT) {
//       let factor;
//       if (this.naturalHeight > this.naturalWidth) {
//         factor = this.naturalHeight / FIXED_HT;
//       } else factor = this.naturalWidth / FIXED_HT;

//       setState(prevState => ({
//         ...prevState,
//         gridHeight: Math.ceil(this.naturalHeight / factor),
//         gridWidth: Math.ceil(this.naturalWidth / factor)
//       }));
//     } else {
//       // console.log(
//       //   'default ht and wt',
//       //   Math.ceil(this.naturalHeight),
//       //   Math.ceil(this.naturalWidth)
//       // );
//       setState(prevState => ({
//         ...prevState,
//         gridHeight: Math.ceil(this.naturalHeight),
//         gridWidth: Math.ceil(this.naturalWidth)
//       }));
//     }
//   };
//   img.src = base64Image;
//   // setState(prevState => ({ ...prevState, base64Image }));
//   // console.log('img', img);
//   setState(prevState => ({
//     ...prevState,
//     book: book,
//     bookType: book?.bookType ?? 'undefined',
//     author: user,
//     bookId: splitPage.bookId, //can be obtained from book
//     pageNumber: splitPage.pageNumber, //can be obtained from api
//     pageId: splitPage.pageId, // can be obtained from api
//     // src: pageImg,
//     file: img
//   }));
// });

// if (this.naturalHeight > FIXED_HT || this.naturalWidth > FIXED_HT) {
//   let factor;
//   if (this.naturalHeight > this.naturalWidth) {
//     factor = this.naturalHeight / FIXED_HT;
//   } else 
//   factor = this.naturalWidth / FIXED_HT;
//   console.log(factor,"factor");
//   resolve(
//     factorizeCoordinates({
//       data: metaData,
//       imageHeight: imgNew.height/factor,
//       imageWidth: imgNew.width/factor,
//       tileHeight: tileHeight,
//       tileWidth: tileWidth,
//     })
//     );

//   // setState(prevState => ({
//   //   ...prevState,
//   //   gridHeight: Math.ceil(this.naturalHeight / factor),
//   //   gridWidth: Math.ceil(this.naturalWidth / factor)
//   // }));
// } else {
//   resolve(
//     factorizeCoordinates({
//       data: metaData,
//       imageHeight: imgNew.height,
//       imageWidth: imgNew.width,
//       tileHeight: tileHeight,
//       tileWidth: tileWidth,
//     })
//     );
//   // console.log(
//   //   'default ht and wt',
//   //   Math.ceil(this.naturalHeight),
//   //   Math.ceil(this.naturalWidth)
//   // );
//   // setState(prevState => ({
//   //   ...prevState,
//   //   gridHeight: Math.ceil(this.naturalHeight),
//   //   gridWidth: Math.ceil(this.naturalWidth)
//   // }));
// }