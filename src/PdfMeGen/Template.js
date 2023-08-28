import { BLANK_PDF } from '@pdfme/generator';
// import { Template, BLANK_PDF } from '@pdfme/ui'; <- Template types and BLANK_PDF can also be imported from @pdfme/ui.

export const Template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      a: {
        type: 'text',
        position: { x: 10, y: 10 },
        width: 200,
        height: 10,
        fontName: 'hindi',
      },
      b: {
        type: 'text',
        position: { x: 10, y: 35 },
        width: 250,
        height: 100,
        fontName: 'hindi',
      },
      c: {
        type: 'text',
        position: { x: 10, y: 55 },
        width: 250,
        height: 100,
        fontName: 'gujarati',
      },
      d: {
        type: 'text',
        position: { x: 10, y: 75 },
        width: 250,
        height: 100,
        fontName: 'bengali',
      },
      e: {
        type: 'text',
        position: { x: 10, y: 90 },
        width: 230,
        height: 100,
        fontName: 'telugu',
      },
      f: {
        type: 'text',
        position: { x: 10, y: 110 },
        width: 180,
        height: 100,
        fontName: 'chinese',
      },
    },
  ],
};
