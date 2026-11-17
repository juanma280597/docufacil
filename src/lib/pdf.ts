import type { TDocumentDefinitions } from "pdfmake/interfaces";

type PdfMakeInstance = {
  vfs?: Record<string, string>;
  addVirtualFileSystem?: (vfs: Record<string, string>) => void;
  createPdf: (docDefinition: TDocumentDefinitions) => {
    getBlob: () => Promise<Blob>;
    download: (filename?: string) => Promise<void>;
    print: () => Promise<void>;
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
        default?: {
          pdfMake?: { vfs?: Record<string, string> };
          vfs?: Record<string, string>;
        } & Record<string, unknown>;
        pdfMake?: { vfs?: Record<string, string> };
        vfs?: Record<string, string>;
      } & Record<string, unknown>;

      const vfs =
        fontsAny.default?.pdfMake?.vfs ??
        fontsAny.default?.vfs ??
        fontsAny.pdfMake?.vfs ??
        fontsAny.vfs ??
        (fontsAny.default && "Roboto-Regular.ttf" in fontsAny.default
          ? (fontsAny.default as Record<string, string>)
          : "Roboto-Regular.ttf" in fontsAny
            ? (fontsAny as unknown as Record<string, string>)
            : undefined);

      if (vfs) {
        if (typeof pdfMake.addVirtualFileSystem === "function") {
          pdfMake.addVirtualFileSystem(vfs);
        } else {
          pdfMake.vfs = vfs;
        }
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
  const blob = await pdfMake.createPdf(docDefinition).getBlob();
  return URL.createObjectURL(blob);
}

export async function downloadPdf(
  docDefinition: TDocumentDefinitions,
  filename: string
): Promise<void> {
  const pdfMake = await getPdfMake();
  await pdfMake.createPdf(docDefinition).download(filename);
}

export async function printPdf(
  docDefinition: TDocumentDefinitions
): Promise<void> {
  const pdfMake = await getPdfMake();
  await pdfMake.createPdf(docDefinition).print();
}
