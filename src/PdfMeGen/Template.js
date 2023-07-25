import { BLANK_PDF } from '@pdfme/generator';
// import { Template, BLANK_PDF } from '@pdfme/ui'; <- Template types and BLANK_PDF can also be imported from @pdfme/ui.

export const Template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      a: {
        type: 'text',
        position: { x: 10, y: 10 },
        width: 250,
        height: 10,
        fontName: 'gujarati',
      },
      b: {
        type: 'text',
        position: { x: 10, y: 50 },
        width: 250,
        height: 100,
        fontName: 'hindi',
      },
      c: {
        type: 'text',
        position: { x: 10, y: 100 },
        width: 180,
        height: 100,
      },
    },
  ],
};
