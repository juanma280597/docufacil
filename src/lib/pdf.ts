import type { TDocumentDefinitions } from "pdfmake/interfaces";

type PdfMakeInstance = {
  vfs?: Record<string, string>;
  createPdf: (docDefinition: TDocumentDefinitions) => {
    getBlob: (cb: (blob: Blob) => void) => void;
    download: (filename?: string) => void;
    print: () => void;
  };
};

let pdfMakePromise: Promise<PdfMakeInstance> | null = null;

export async function getPdfMake(): Promise<PdfMakeInstance> {
  if (typeof window === "undefined") {
    throw new Error("pdfmake solo puede ejecutarse en el navegador.");
  }

  if (!pdfMakePromise) {
    pdfMakePromise = (async () => {
      const pdfMakeModule = await import("pdfmake/build/pdfmake");
      const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

      const pdfMake = (pdfMakeModule.default ?? pdfMakeModule) as unknown as PdfMakeInstance;
      const fontsAny = pdfFontsModule as unknown as {
        default?: { pdfMake?: { vfs?: Record<string, string> }; vfs?: Record<string, string> };
        pdfMake?: { vfs?: Record<string, string> };
        vfs?: Record<string, string>;
      };

      const vfs =
        fontsAny.default?.pdfMake?.vfs ??
        fontsAny.default?.vfs ??
        fontsAny.pdfMake?.vfs ??
        fontsAny.vfs;

      if (vfs) {
        pdfMake.vfs = vfs;
      }

      return pdfMake;
    })();
  }

  return pdfMakePromise;
}

export async function generatePdfBlobUrl(
  docDefinition: TDocumentDefinitions
): Promise<string> {
  const pdfMake = await getPdfMake();
  return new Promise((resolve, reject) => {
    try {
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBlob((blob: Blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function downloadPdf(
  docDefinition: TDocumentDefinitions,
  filename: string
): Promise<void> {
  const pdfMake = await getPdfMake();
  pdfMake.createPdf(docDefinition).download(filename);
}

export async function printPdf(
  docDefinition: TDocumentDefinitions
): Promise<void> {
  const pdfMake = await getPdfMake();
  pdfMake.createPdf(docDefinition).print();
}
