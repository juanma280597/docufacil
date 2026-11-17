import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { formatearMoneda, MonedaCodigo, numeroALetras } from "./numeroALetras";

export function formatearFechaLarga(fechaIso: string): string {
  if (!fechaIso) return "____ de __________ de 20__";
  const partes = fechaIso.split("-");
  if (partes.length !== 3) return fechaIso;
  const [anio, mes, dia] = partes;
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const mesNombre = meses[parseInt(mes, 10) - 1] || mes;
  return `${parseInt(dia, 10)} de ${mesNombre} de ${anio}`;
}

/* ============================================================================
 * 1. CARTA PODER SIMPLE
 * ========================================================================== */
export interface CartaPoderData {
  pais: string;
  ciudadEstado: string;
  fecha: string;
  dirigidoA: string;
  otorganteNombre: string;
  otorganteIdentificacion: string;
  otorganteDomicilio: string;
  apoderadoNombre: string;
  apoderadoIdentificacion: string;
  apoderadoDomicilio: string;
  tramiteDescripcion: string;
  facultadesAdicionales: string;
  incluirTestigos: boolean;
  testigo1Nombre: string;
  testigo2Nombre: string;
}

export function buildCartaPoderPdf(d: CartaPoderData): TDocumentDefinitions {
  const fechaTexto = formatearFechaLarga(d.fecha);
  const ciudad = d.ciudadEstado.trim();
  const pais = d.pais.trim();
  const lugarBase = ciudad || "[Ciudad, Estado/Departamento]";
  const lugar = pais ? `${lugarBase}, ${pais}` : lugarBase;
  const otorgante = d.otorganteNombre || "[NOMBRE COMPLETO DEL OTORGANTE]";
  const apoderado = d.apoderadoNombre || "[NOMBRE COMPLETO DEL APODERADO]";
  const dirigido = d.dirigidoA || "A QUIEN CORRESPONDA";

  const firmasRow = [
    {
      stack: [
        { text: "OTORGANTE (PODERDANTE)", style: "signLabel", bold: true },
        { text: "\n\n______________________________________", alignment: "center" as const },
        { text: otorgante, alignment: "center" as const, fontSize: 10, bold: true, margin: [0, 4, 0, 0] as [number, number, number, number] },
        d.otorganteIdentificacion
          ? { text: `ID: ${d.otorganteIdentificacion}`, alignment: "center" as const, fontSize: 8.5, color: "#475569" }
          : { text: "", fontSize: 8 },
      ],
    },
    {
      stack: [
        { text: "ACEPTO EL PODER (APODERADO)", style: "signLabel", bold: true },
        { text: "\n\n______________________________________", alignment: "center" as const },
        { text: apoderado, alignment: "center" as const, fontSize: 10, bold: true, margin: [0, 4, 0, 0] as [number, number, number, number] },
        d.apoderadoIdentificacion
          ? { text: `ID: ${d.apoderadoIdentificacion}`, alignment: "center" as const, fontSize: 8.5, color: "#475569" }
          : { text: "", fontSize: 8 },
      ],
    },
  ];

  const testigosBlock = d.incluirTestigos
    ? [
        {
          columns: [
            {
              stack: [
                { text: "TESTIGO 1", style: "signLabel", bold: true },
                { text: "\n\n______________________________________", alignment: "center" as const },
                {
                  text: d.testigo1Nombre || "[Nombre y firma del Testigo 1]",
                  alignment: "center" as const,
                  fontSize: 9.5,
                  margin: [0, 4, 0, 0] as [number, number, number, number],
                },
              ],
            },
            {
              stack: [
                { text: "TESTIGO 2", style: "signLabel", bold: true },
                { text: "\n\n______________________________________", alignment: "center" as const },
                {
                  text: d.testigo2Nombre || "[Nombre y firma del Testigo 2]",
                  alignment: "center" as const,
                  fontSize: 9.5,
                  margin: [0, 4, 0, 0] as [number, number, number, number],
                },
              ],
            },
          ],
          columnGap: 24,
          margin: [0, 28, 0, 0] as [number, number, number, number],
        },
      ]
    : [];

  return {
    pageSize: "LETTER",
    pageMargins: [55, 55, 55, 55],
    content: [
      {
        text: "CARTA PODER SIMPLE",
        fontSize: 16,
        bold: true,
        alignment: "center",
        color: "#0f172a",
        margin: [0, 0, 0, 6],
      },
      {
        canvas: [
          { type: "line", x1: 120, y1: 0, x2: 380, y2: 0, lineWidth: 1.5, lineColor: "#0f766e" },
        ],
        margin: [0, 0, 0, 20],
      },
      {
        text: `${lugar}, a ${fechaTexto}.`,
        alignment: "right",
        fontSize: 10.5,
        margin: [0, 0, 0, 22],
      },
      {
        text: dirigido.toUpperCase(),
        bold: true,
        fontSize: 11,
        margin: [0, 0, 0, 4],
      },
      {
        text: "PRESENTE.",
        bold: true,
        fontSize: 11,
        margin: [0, 0, 0, 18],
      },
      {
        text: [
          "Por medio de la presente, el(la) suscrito(a) ",
          { text: otorgante, bold: true },
          d.otorganteIdentificacion ? `, identificado(a) con ${d.otorganteIdentificacion}` : "",
          d.otorganteDomicilio ? ` y con domicilio en ${d.otorganteDomicilio}` : "",
          ", otorgo ",
          { text: "PODER AMPLIO, CUMPLIDO Y BASTANTE", bold: true },
          " a favor del(de la) C. ",
          { text: apoderado, bold: true },
          d.apoderadoIdentificacion ? `, identificado(a) con ${d.apoderadoIdentificacion}` : "",
          d.apoderadoDomicilio ? ` y con domicilio en ${d.apoderadoDomicilio}` : "",
          ", para que en mi nombre y representación realice el siguiente trámite o gestión:",
        ],
        fontSize: 11,
        lineHeight: 1.45,
        alignment: "justify",
        margin: [0, 0, 0, 14],
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                text:
                  d.tramiteDescripcion ||
                  "[Describa aquí el trámite específico: recoger documentos, realizar gestión administrativa, recibir paquetería, etc.]",
                fontSize: 10.5,
                lineHeight: 1.4,
                margin: [10, 10, 10, 10],
              },
            ],
          ],
        },
        layout: {
          hLineColor: () => "#cbd5e1",
          vLineColor: () => "#cbd5e1",
          fillColor: () => "#f8fafc",
        },
        margin: [0, 0, 0, 14],
      },
      ...(d.facultadesAdicionales
        ? [
            {
              text: [
                { text: "Facultades y alcances adicionales: ", bold: true },
                d.facultadesAdicionales,
              ],
              fontSize: 10.5,
              lineHeight: 1.4,
              alignment: "justify" as const,
              margin: [0, 0, 0, 14] as [number, number, number, number],
            },
          ]
        : []),
      {
        text: "Asimismo, faculto a mi apoderado(a) para presentar y recibir documentación, firmar acuses de recibo y realizar las gestiones necesarias exclusivamente relacionadas con el asunto arriba señalado, ratificando desde ahora todo lo que haga en cumplimiento del presente mandato.",
        fontSize: 10.5,
        lineHeight: 1.45,
        alignment: "justify",
        margin: [0, 0, 0, 14],
      },
      {
        text: "Se extiende la presente Carta Poder para los fines legales y administrativos a que haya lugar, anexando copia simple de las identificaciones oficiales vigentes de las partes.",
        fontSize: 10.5,
        lineHeight: 1.45,
        alignment: "justify",
        margin: [0, 0, 0, 34],
      },
      {
        columns: firmasRow,
        columnGap: 24,
      },
      ...testigosBlock,
    ],
    styles: {
      signLabel: { fontSize: 9, alignment: "center", color: "#334155" },
    },
    defaultStyle: { font: "Roboto", color: "#1e293b" },
  };
}

/* ============================================================================
 * 2. CONTRATO DE ARRENDAMIENTO BÁSICO
 * ========================================================================== */
export interface ArrendamientoData {
  pais: string;
  ciudadEstado: string;
  fechaFirma: string;
  arrendadorNombre: string;
  arrendadorId: string;
  arrendadorDomicilio: string;
  arrendatarioNombre: string;
  arrendatarioId: string;
  inmuebleDireccion: string;
  tipoInmueble: string;
  usoInmueble: string;
  moneda: MonedaCodigo;
  rentaMensual: string;
  depositoGarantia: string;
  diaPago: string;
  fechaInicio: string;
  duracionMeses: string;
  serviciosIncluidos: string;
  permiteMascotas: boolean;
}

export function buildArrendamientoPdf(d: ArrendamientoData): TDocumentDefinitions {
  const moneda = d.moneda || "MXN";
  const rentaNum = parseFloat(d.rentaMensual) || 0;
  const depositoNum = parseFloat(d.depositoGarantia) || 0;

  const rentaFmt = rentaNum > 0 ? formatearMoneda(rentaNum, moneda) : "$________";
  const rentaLetras = rentaNum > 0 ? ` (${numeroALetras(rentaNum, moneda)})` : "";
  const depositoFmt = depositoNum > 0 ? formatearMoneda(depositoNum, moneda) : "$________";

  const arrendador = d.arrendadorNombre || "[NOMBRE DEL ARRENDADOR]";
  const arrendatario = d.arrendatarioNombre || "[NOMBRE DEL ARRENDATARIO]";
  const inmueble = d.inmuebleDireccion || "[DIRECCIÓN COMPLETA DEL INMUEBLE]";
  const duracion = d.duracionMeses || "12";
  const diaPago = d.diaPago || "5";

  return {
    pageSize: "LETTER",
    pageMargins: [50, 50, 50, 55],
    content: [
      {
        text: "CONTRATO DE ARRENDAMIENTO",
        fontSize: 15,
        bold: true,
        alignment: "center",
        color: "#0f172a",
        margin: [0, 0, 0, 4],
      },
      {
        text: `(${d.tipoInmueble || "Casa Habitación"})`,
        fontSize: 10.5,
        alignment: "center",
        color: "#475569",
        margin: [0, 0, 0, 16],
      },
      {
        text: [
          "Contrato de Arrendamiento que celebran, por una parte, ",
          { text: arrendador, bold: true },
          d.arrendadorId ? ` (ID: ${d.arrendadorId})` : "",
          d.arrendadorDomicilio ? `, con domicilio en ${d.arrendadorDomicilio}` : "",
          ", a quien en lo sucesivo se le denominará ",
          { text: '"EL ARRENDADOR"', bold: true },
          ", y por la otra parte, ",
          { text: arrendatario, bold: true },
          d.arrendatarioId ? ` (ID: ${d.arrendatarioId})` : "",
          ", a quien en lo sucesivo se le denominará ",
          { text: '"EL ARRENDATARIO"', bold: true },
          ", al tenor de las siguientes declaraciones y cláusulas:",
        ],
        fontSize: 10,
        lineHeight: 1.4,
        alignment: "justify",
        margin: [0, 0, 0, 12],
      },
      { text: "C L Á U S U L A S", bold: true, fontSize: 11, alignment: "center", margin: [0, 6, 0, 10] },
      {
        text: [
          { text: "PRIMERA (OBJETO). ", bold: true },
          "EL ARRENDADOR da en arrendamiento a EL ARRENDATARIO el inmueble ubicado en: ",
          { text: inmueble, bold: true },
          ", para ser destinado única y exclusivamente a ",
          {
            text:
              d.tipoInmueble === "Local Comercial"
                ? d.usoInmueble && !d.usoInmueble.includes("habitacional")
                  ? d.usoInmueble
                  : "uso comercial"
                : d.usoInmueble
                ? d.usoInmueble.replace(/^uso\s+exclusivamente\s+/i, "uso ")
                : "uso habitacional",
            bold: true,
          },
          ". Queda prohibido subarrendar o ceder los derechos del presente contrato sin autorización previa y por escrito de EL ARRENDADOR.",
        ],
        fontSize: 10,
        lineHeight: 1.38,
        alignment: "justify",
        margin: [0, 0, 0, 8],
      },
      {
        text: [
          { text: "SEGUNDA (RENTA Y FORMA DE PAGO). ", bold: true },
          "EL ARRENDATARIO se obliga a pagar a EL ARRENDADOR por concepto de renta mensual la cantidad de ",
          { text: `${rentaFmt}${rentaLetras}`, bold: true },
          `, pagaderos dentro de los primeros `,
          { text: `${diaPago} días`, bold: true },
          " naturales de cada mes. EL ARRENDADOR entregará el recibo o comprobante correspondiente por cada pago recibido.",
        ],
        fontSize: 10,
        lineHeight: 1.38,
        alignment: "justify",
        margin: [0, 0, 0, 8],
      },
      {
        text: [
          { text: "TERCERA (DEPÓSITO EN GARANTÍA). ", bold: true },
          "A la firma del presente contrato, EL ARRENDATARIO entrega la cantidad de ",
          { text: depositoFmt, bold: true },
          " como depósito en garantía para responder por posibles daños al inmueble o adeudos de servicios al término del contrato. Dicho depósito no podrá aplicarse al pago de la última mensualidad de renta y será devuelto al desocupar y entregar el inmueble en buenas condiciones.",
        ],
        fontSize: 10,
        lineHeight: 1.38,
        alignment: "justify",
        margin: [0, 0, 0, 8],
      },
      {
        text: [
          { text: "CUARTA (VIGENCIA). ", bold: true },
          "La duración del presente contrato será de ",
          { text: `${duracion} meses`, bold: true },
          " forzosos para ambas partes, iniciando el día ",
          { text: formatearFechaLarga(d.fechaInicio), bold: true },
          ". En caso de que EL ARRENDATARIO desee desocupar antes del vencimiento, deberá dar aviso por escrito con al menos 30 días de anticipación.",
        ],
        fontSize: 10,
        lineHeight: 1.38,
        alignment: "justify",
        margin: [0, 0, 0, 8],
      },
      {
        text: [
          { text: "QUINTA (SERVICIOS Y CONSERVACIÓN). ", bold: true },
          d.serviciosIncluidos
            ? `Los servicios incluidos en la renta son: ${d.serviciosIncluidos}. El resto de los servicios (agua, luz, gas, internet, etc.) correrán por cuenta exclusiva de EL ARRENDATARIO. `
            : "Los servicios de energía eléctrica, agua, gas, telefonía e internet correrán por cuenta exclusiva de EL ARRENDATARIO durante la vigencia del contrato. ",
          "EL ARRENDATARIO recibe el inmueble en buen estado de uso y se obliga a devolverlo en las mismas condiciones, salvo el desgaste normal por el uso.",
        ],
        fontSize: 10,
        lineHeight: 1.38,
        alignment: "justify",
        margin: [0, 0, 0, 8],
      },
      {
        text: [
          { text: "SEXTA (MASCOTAS Y CONVIVENCIA). ", bold: true },
          d.permiteMascotas
            ? "Se permite la tenencia de mascotas domésticas dentro del inmueble, siendo EL ARRENDATARIO responsable de mantener la higiene y reparar cualquier daño causado por las mismas."
            : "No se permite la tenencia de mascotas dentro del inmueble arrendado, salvo autorización expresa y por escrito de EL ARRENDADOR.",
        ],
        fontSize: 10,
        lineHeight: 1.38,
        alignment: "justify",
        margin: [0, 0, 0, 8],
      },
      {
        text: [
          { text: "SÉPTIMA (JURISDICCIÓN). ", bold: true },
          `Para la interpretación y cumplimiento del presente contrato, las partes se someten a las leyes y tribunales competentes de `,
          { text: `${d.ciudadEstado || "[Ciudad/Estado]"}${d.pais ? `, ${d.pais}` : ""}`, bold: true },
          ".",
        ],
        fontSize: 10,
        lineHeight: 1.38,
        alignment: "justify",
        margin: [0, 0, 0, 14],
      },
      {
        text: `Leído que fue el presente contrato y enteradas las partes de su contenido y alcance legal, lo firman por duplicado en ${d.ciudadEstado || "[Ciudad]"}, a ${formatearFechaLarga(d.fechaFirma)}.`,
        fontSize: 10,
        alignment: "justify",
        margin: [0, 0, 0, 32],
      },
      {
        columns: [
          {
            stack: [
              { text: "EL ARRENDADOR", bold: true, fontSize: 9.5, alignment: "center" },
              { text: "\n\n___________________________________", alignment: "center" },
              { text: arrendador, bold: true, fontSize: 9.5, alignment: "center", margin: [0, 4, 0, 0] },
            ],
          },
          {
            stack: [
              { text: "EL ARRENDATARIO", bold: true, fontSize: 9.5, alignment: "center" },
              { text: "\n\n___________________________________", alignment: "center" },
              { text: arrendatario, bold: true, fontSize: 9.5, alignment: "center", margin: [0, 4, 0, 0] },
            ],
          },
        ],
        columnGap: 24,
      },
    ],
    defaultStyle: { font: "Roboto", color: "#1e293b" },
  };
}

/* ============================================================================
 * 3. PAGARÉ
 * ========================================================================== */
export interface PagareData {
  numeroPagare: string;
  moneda: MonedaCodigo;
  monto: string;
  lugarSuscripcion: string;
  fechaSuscripcion: string;
  lugarPago: string;
  fechaVencimiento: string;
  beneficiarioNombre: string;
  deudorNombre: string;
  deudorDomicilio: string;
  deudorTelefono: string;
  interesMoratorio: string;
  incluirAval: boolean;
  avalNombre: string;
  avalDomicilio: string;
}

export function buildPagarePdf(d: PagareData): TDocumentDefinitions {
  const moneda = d.moneda || "MXN";
  const montoNum = parseFloat(d.monto) || 0;
  const montoFmt = montoNum > 0 ? formatearMoneda(montoNum, moneda) : "$0.00";
  const montoLetras = montoNum > 0 ? numeroALetras(montoNum, moneda) : "[CANTIDAD CON LETRA]";
  const interes = d.interesMoratorio || "5";

  return {
    pageSize: "LETTER",
    pageMargins: [50, 50, 50, 50],
    content: [
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  {
                    columns: [
                      { text: "P A G A R É", fontSize: 20, bold: true, color: "#0f172a" },
                      {
                        stack: [
                          { text: `No. ${d.numeroPagare || "1 / 1"}`, alignment: "right", bold: true, fontSize: 10 },
                          { text: `BUENO POR: ${montoFmt}`, alignment: "right", bold: true, fontSize: 13, color: "#0f766e", margin: [0, 4, 0, 0] },
                        ],
                      },
                    ],
                    margin: [0, 0, 0, 12],
                  },
                  {
                    text: [
                      "En ",
                      { text: d.lugarSuscripcion || "[Lugar de suscripción]", bold: true },
                      ", a ",
                      { text: formatearFechaLarga(d.fechaSuscripcion), bold: true },
                      ".",
                    ],
                    fontSize: 10,
                    alignment: "right",
                    margin: [0, 0, 0, 14],
                  },
                  {
                    text: [
                      "Debo y pagaré incondicionalmente por este Pagaré a la orden de ",
                      { text: (d.beneficiarioNombre || "[NOMBRE DEL BENEFICIARIO]").toUpperCase(), bold: true },
                      ", en ",
                      { text: d.lugarPago || d.lugarSuscripcion || "[Lugar de pago]", bold: true },
                      ", el día ",
                      { text: formatearFechaLarga(d.fechaVencimiento), bold: true },
                      ", la cantidad de:",
                    ],
                    fontSize: 10.5,
                    lineHeight: 1.45,
                    alignment: "justify",
                    margin: [0, 0, 0, 10],
                  },
                  {
                    table: {
                      widths: ["*"],
                      body: [
                        [
                          {
                            text: `${montoFmt}  (${montoLetras})`,
                            bold: true,
                            fontSize: 11,
                            alignment: "center",
                            color: "#0f172a",
                            margin: [8, 8, 8, 8],
                          },
                        ],
                      ],
                    },
                    layout: {
                      fillColor: () => "#f1f5f9",
                      hLineColor: () => "#94a3b8",
                      vLineColor: () => "#94a3b8",
                    },
                    margin: [0, 0, 0, 14],
                  },
                  {
                    text: [
                      "Valor recibido a mi entera satisfacción. Este pagaré forma parte de una serie numerada del 1 al ",
                      d.numeroPagare?.split("/")[1]?.trim() || "1",
                      " y todos están sujetos a la condición de que, al no pagarse cualquiera de ellos a su vencimiento, serán exigibles todos los que le sigan en número, además de los ya vencidos. Desde la fecha de vencimiento de este documento hasta el día de su liquidación, causará intereses moratorios al tipo de ",
                      { text: `${interes}% mensual`, bold: true },
                      ", pagadero en esta ciudad juntamente con el principal.",
                    ],
                    fontSize: 9.8,
                    lineHeight: 1.4,
                    alignment: "justify",
                    margin: [0, 0, 0, 20],
                  },
                  {
                    columns: [
                      {
                        width: "55%",
                        stack: [
                          { text: "DATOS DEL DEUDOR (SUSCRIPTOR):", bold: true, fontSize: 9, color: "#475569", margin: [0, 0, 0, 4] },
                          { text: `Nombre: ${d.deudorNombre || "________________________"}`, fontSize: 9.5, margin: [0, 0, 0, 2] },
                          { text: `Domicilio: ${d.deudorDomicilio || "________________________"}`, fontSize: 9.5, margin: [0, 0, 0, 2] },
                          { text: `Teléfono: ${d.deudorTelefono || "________________________"}`, fontSize: 9.5 },
                        ],
                      },
                      {
                        width: "45%",
                        stack: [
                          { text: "ACEPTO Y PAGARÉ", bold: true, fontSize: 9, alignment: "center", color: "#334155" },
                          { text: "\n\n_______________________________", alignment: "center" },
                          { text: "Firma del Deudor", fontSize: 9, alignment: "center", margin: [0, 4, 0, 0] },
                        ],
                      },
                    ],
                  },
                  ...((d.incluirAval
                    ? [
                        {
                          canvas: [{ type: "line" as const, x1: 0, y1: 0, x2: 470, y2: 0, lineWidth: 0.5, lineColor: "#cbd5e1" }],
                          margin: [0, 16, 0, 12],
                        },
                        {
                          columns: [
                            {
                              width: "55%",
                              stack: [
                                { text: "AVAL (OBLIGADO SOLIDARIO):", bold: true, fontSize: 9, color: "#475569", margin: [0, 0, 0, 4] },
                                { text: `Nombre: ${d.avalNombre || "________________________"}`, fontSize: 9.5, margin: [0, 0, 0, 2] },
                                { text: `Domicilio: ${d.avalDomicilio || "________________________"}`, fontSize: 9.5 },
                              ],
                            },
                            {
                              width: "45%",
                              stack: [
                                { text: "FIRMA DEL AVAL", bold: true, fontSize: 9, alignment: "center", color: "#334155" },
                                { text: "\n\n_______________________________", alignment: "center" },
                              ],
                            },
                          ],
                        },
                      ]
                    : []) as Content[]),
                ],
                margin: [14, 14, 14, 14],
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1.5,
          vLineWidth: () => 1.5,
          hLineColor: () => "#0f172a",
          vLineColor: () => "#0f172a",
        },
      },
    ],
    defaultStyle: { font: "Roboto", color: "#1e293b" },
  };
}

/* ============================================================================
 * 4. RECIBO DE PAGO / HONORARIOS / ARRENDAMIENTO INFORMAL
 * ========================================================================== */
export interface ReciboData {
  tipoRecibo: string;
  folio: string;
  fecha: string;
  ciudad: string;
  moneda: MonedaCodigo;
  monto: string;
  recibiDe: string;
  concepto: string;
  formaPago: string;
  quienRecibeNombre: string;
  quienRecibeId: string;
}

export function buildReciboPdf(d: ReciboData): TDocumentDefinitions {
  const moneda = d.moneda || "MXN";
  const montoNum = parseFloat(d.monto) || 0;
  const montoFmt = montoNum > 0 ? formatearMoneda(montoNum, moneda) : "$0.00";
  const montoLetras = montoNum > 0 ? numeroALetras(montoNum, moneda) : "[CANTIDAD EN LETRAS]";

  return {
    pageSize: "LETTER",
    pageMargins: [50, 50, 50, 50],
    content: [
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  {
                    columns: [
                      {
                        stack: [
                          { text: (d.tipoRecibo || "RECIBO DE PAGO").toUpperCase(), fontSize: 16, bold: true, color: "#0f172a" },
                          { text: "Comprobante simple de recepción de pago", fontSize: 9, color: "#64748b", margin: [0, 2, 0, 0] },
                        ],
                      },
                      {
                        stack: [
                          { text: `FOLIO: ${d.folio || "001"}`, alignment: "right", bold: true, fontSize: 11, color: "#dc2626" },
                          { text: `BUENO POR: ${montoFmt}`, alignment: "right", bold: true, fontSize: 13, color: "#0f766e", margin: [0, 4, 0, 0] },
                        ],
                      },
                    ],
                    margin: [0, 0, 0, 14],
                  },
                  {
                    canvas: [{ type: "line", x1: 0, y1: 0, x2: 470, y2: 0, lineWidth: 1, lineColor: "#cbd5e1" }],
                    margin: [0, 0, 0, 14],
                  },
                  {
                    text: [
                      { text: "Recibí de: ", bold: true },
                      d.recibiDe || "[Nombre de la persona o empresa que realiza el pago]",
                    ],
                    fontSize: 11,
                    margin: [0, 0, 0, 10],
                  },
                  {
                    text: [
                      { text: "La cantidad de: ", bold: true },
                      `${montoFmt} (${montoLetras})`,
                    ],
                    fontSize: 11,
                    margin: [0, 0, 0, 10],
                  },
                  {
                    text: [
                      { text: "Por concepto de: ", bold: true },
                      d.concepto || "[Descripción del pago: renta del mes, honorarios por servicios, abono a deuda, etc.]",
                    ],
                    fontSize: 11,
                    lineHeight: 1.4,
                    margin: [0, 0, 0, 10],
                  },
                  {
                    text: [
                      { text: "Forma de pago: ", bold: true },
                      d.formaPago || "Efectivo",
                    ],
                    fontSize: 10.5,
                    margin: [0, 0, 0, 16],
                  },
                  {
                    text: `En ${d.ciudad || "[Ciudad]"}, a ${formatearFechaLarga(d.fecha)}.`,
                    alignment: "right",
                    fontSize: 10,
                    color: "#334155",
                    margin: [0, 0, 0, 26],
                  },
                  {
                    columns: [
                      {
                        stack: [
                          { text: "RECIBÍ CONFORME", bold: true, fontSize: 9, alignment: "center", color: "#475569" },
                          { text: "\n\n___________________________________", alignment: "center" },
                          { text: d.quienRecibeNombre || "[Nombre de quien recibe]", bold: true, fontSize: 10, alignment: "center", margin: [0, 4, 0, 0] },
                          d.quienRecibeId
                            ? { text: `ID / RFC: ${d.quienRecibeId}`, fontSize: 8.5, alignment: "center", color: "#64748b" }
                            : { text: "", fontSize: 8 },
                        ],
                      },
                      {
                        stack: [
                          { text: "ENTREGUÉ (OPCIONAL)", bold: true, fontSize: 9, alignment: "center", color: "#475569" },
                          { text: "\n\n___________________________________", alignment: "center" },
                          { text: d.recibiDe || "[Nombre de quien paga]", fontSize: 9.5, alignment: "center", margin: [0, 4, 0, 0] },
                        ],
                      },
                    ],
                    columnGap: 20,
                  },
                ],
                margin: [16, 16, 16, 16],
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1.2,
          vLineWidth: () => 1.2,
          hLineColor: () => "#334155",
          vLineColor: () => "#334155",
        },
      },
      {
        text: "Nota: Este recibo es un comprobante simple entre particulares y no sustituye a una factura fiscal electrónica (CFDI).",
        fontSize: 8.5,
        color: "#64748b",
        italics: true,
        margin: [0, 10, 0, 0],
      },
    ],
    defaultStyle: { font: "Roboto", color: "#1e293b" },
  };
}

/* ============================================================================
 * 5. POLÍTICA DE PRIVACIDAD PARA SITIOS WEB
 * ========================================================================== */
export interface PoliticaPrivacidadData {
  nombreSitio: string;
  urlSitio: string;
  responsableNombre: string;
  correoContacto: string;
  pais: string;
  fechaActualizacion: string;
  recopilaNombreCorreo: boolean;
  usaCookies: boolean;
  usaAdsenseAnalytics: boolean;
}

export function buildPoliticaPrivacidadText(d: PoliticaPrivacidadData): string {
  const sitio = d.nombreSitio || "[Nombre del Sitio Web]";
  const url = d.urlSitio || "https://ejemplo.com";
  const responsable = d.responsableNombre || "[Nombre del Titular o Empresa]";
  const correo = d.correoContacto || "contacto@ejemplo.com";
  const fecha = formatearFechaLarga(d.fechaActualizacion);

  const ley =
    d.pais === "México"
      ? "la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)"
      : `la normativa vigente de protección de datos personales en ${d.pais || "su jurisdicción"}`;

  const secciones: string[] = [
    `AVISO Y POLÍTICA DE PRIVACIDAD DE ${sitio.toUpperCase()}`,
    `Última actualización: ${fecha}`,
    "",
    `1. RESPONSABLE DEL TRATAMIENTO DE DATOS`,
    `${responsable}, titular del sitio web ${sitio} (${url}), es responsable del uso y protección de los datos personales recabados a través de esta plataforma, en cumplimiento con ${ley}. Para cualquier duda o solicitud, puedes escribirnos a: ${correo}.`,
    "",
    `2. DATOS PERSONALES QUE RECABAMOS`,
    d.recopilaNombreCorreo
      ? `Podemos recabar los datos que nos proporciones voluntariamente mediante formularios de contacto, suscripción o registro, tales como: nombre, dirección de correo electrónico y mensajes enviados.`
      : `Este sitio web es de carácter informativo y no solicita registro obligatorio de datos personales sensibles, salvo la información técnica básica de navegación o los correos que envíes voluntariamente a ${correo}.`,
    "",
    `3. FINALIDAD DEL TRATAMIENTO`,
    `La información recopilada se utiliza exclusivamente para: (a) responder consultas o solicitudes de soporte, (b) mejorar el contenido, velocidad y experiencia del usuario en ${sitio}, y (c) cumplir con obligaciones legales aplicables.`,
    "",
    `4. USO DE COOKIES Y TECNOLOGÍAS DE RASTREO`,
    d.usaCookies
      ? `${sitio} utiliza cookies propias y de terceros para recordar tus preferencias de navegación y ofrecer una mejor experiencia. Puedes desactivar las cookies en cualquier momento desde la configuración de tu navegador.`
      : `${sitio} minimiza el uso de cookies, limitándose únicamente a las estrictamente necesarias para el funcionamiento técnico de la página.`,
    "",
  ];

  if (d.usaAdsenseAnalytics) {
    secciones.push(
      `5. PUBLICIDAD (GOOGLE ADSENSE) Y ANALÍTICA WEB`,
      `Este sitio puede utilizar servicios de analítica (como Google Analytics) y redes publicitarias de terceros (como Google AdSense). Google, como proveedor asociado, utiliza cookies para mostrar anuncios relevantes basados en tus visitas anteriores a este u otros sitios web. Puedes inhabilitar la publicidad personalizada visitando la Configuración de Anuncios de Google.`,
      ""
    );
  }

  secciones.push(
    `${d.usaAdsenseAnalytics ? "6" : "5"}. DERECHOS DEL USUARIO (ARCO)`,
    `Tienes derecho a conocer qué datos personales tenemos sobre ti, solicitar su rectificación, cancelación u oponerte a su tratamiento (Derechos ARCO). Para ejercer estos derechos, envía un correo electrónico a ${correo} indicando tu solicitud.`,
    "",
    `${d.usaAdsenseAnalytics ? "7" : "6"}. CAMBIOS A ESTA POLÍTICA`,
    `Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Cualquier modificación será publicada en esta misma página.`
  );

  return secciones.join("\n");
}

export function buildPoliticaPrivacidadPdf(d: PoliticaPrivacidadData): TDocumentDefinitions {
  const textoCompleto = buildPoliticaPrivacidadText(d);
  const lineas = textoCompleto.split("\n");
  const titulo = lineas[0];
  const subtitulo = lineas[1];
  const cuerpo = lineas.slice(3);

  return {
    pageSize: "LETTER",
    pageMargins: [55, 55, 55, 55],
    content: [
      { text: titulo, fontSize: 15, bold: true, color: "#0f172a", margin: [0, 0, 0, 4] },
      { text: subtitulo, fontSize: 9.5, color: "#64748b", margin: [0, 0, 0, 16] },
      ...cuerpo.map((linea) => {
        const esEncabezado = /^\d+\.\s/.test(linea);
        if (linea === "") {
          return { text: " ", fontSize: 6 };
        }
        if (esEncabezado) {
          return { text: linea, fontSize: 11, bold: true, color: "#0f766e", margin: [0, 6, 0, 3] as [number, number, number, number] };
        }
        return { text: linea, fontSize: 10, lineHeight: 1.4, alignment: "justify" as const };
      }),
    ],
    defaultStyle: { font: "Roboto", color: "#1e293b" },
  };
}

/* ============================================================================
 * 6. CALCULADORA Y FICHA FORMAL DE RFC (MÉXICO)
 * ========================================================================== */
export interface FichaRfcData {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  rfcCalculado: string;
  homoclaveManual: string;
  usarHomoclaveManual: boolean;
  curp: string;
  domicilio: string;
  telefono: string;
  correo: string;
  regimenSugerido: string;
  fechaEmision: string;
}

export function buildFichaRfcPdf(d: FichaRfcData): TDocumentDefinitions {
  const nombreCompleto = [d.nombre, d.apellidoPaterno, d.apellidoMaterno]
    .filter(Boolean)
    .join(" ")
    .toUpperCase() || "[NOMBRE COMPLETO DEL TRABAJADOR]";

  const homoclaveLimpia = d.homoclaveManual
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .trim();
  const baseRfc =
    d.rfcCalculado && d.rfcCalculado.length >= 10
      ? d.rfcCalculado.slice(0, 10)
      : "XXXX000000";
  const rfcFinal =
    d.usarHomoclaveManual && homoclaveLimpia.length > 0
      ? `${baseRfc}${homoclaveLimpia}`
      : d.rfcCalculado || "XXXX000000XXX";

  return {
    pageSize: "LETTER",
    pageMargins: [50, 50, 50, 50],
    content: [
      {
        columns: [
          {
            stack: [
              { text: "FICHA DE IDENTIFICACIÓN FISCAL", fontSize: 16, bold: true, color: "#0f172a" },
              { text: "Cálculo informativo de RFC para presentación laboral / Recursos Humanos", fontSize: 9.5, color: "#475569", margin: [0, 3, 0, 0] },
            ],
          },
          {
            text: `Fecha: ${formatearFechaLarga(d.fechaEmision)}`,
            alignment: "right",
            fontSize: 9.5,
            color: "#475569",
          },
        ],
        margin: [0, 0, 0, 14],
      },
      {
        canvas: [{ type: "line", x1: 0, y1: 0, x2: 512, y2: 0, lineWidth: 2, lineColor: "#0f766e" }],
        margin: [0, 0, 0, 18],
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  { text: "REGISTRO FEDERAL DE CONTRIBUYENTES (RFC)", fontSize: 9, bold: true, color: "#0f766e", alignment: "center" },
                  { text: rfcFinal, fontSize: 24, bold: true, color: "#0f172a", alignment: "center", margin: [0, 6, 0, 4], characterSpacing: 2 },
                  {
                    text:
                      d.usarHomoclaveManual && homoclaveLimpia.length > 0
                        ? "Homoclave ingresada por el titular"
                        : "Calculado conforme al algoritmo oficial vigente",
                    fontSize: 8.5,
                    color: "#64748b",
                    alignment: "center",
                  },
                ],
                margin: [12, 14, 12, 14],
              },
            ],
          ],
        },
        layout: {
          fillColor: () => "#f0fdfa",
          hLineColor: () => "#0f766e",
          vLineColor: () => "#0f766e",
          hLineWidth: () => 1.5,
          vLineWidth: () => 1.5,
        },
        margin: [0, 0, 0, 18],
      },
      {
        text: "DATOS DEL TITULAR",
        fontSize: 10.5,
        bold: true,
        color: "#0f172a",
        margin: [0, 0, 0, 8],
      },
      {
        table: {
          widths: ["35%", "65%"],
          body: [
            [
              { text: "Nombre completo:", bold: true, fillColor: "#f8fafc", margin: [8, 7, 8, 7] },
              { text: nombreCompleto, margin: [8, 7, 8, 7] },
            ],
            [
              { text: "Fecha de nacimiento:", bold: true, fillColor: "#f8fafc", margin: [8, 7, 8, 7] },
              { text: formatearFechaLarga(d.fechaNacimiento), margin: [8, 7, 8, 7] },
            ],
            [
              { text: "CURP:", bold: true, fillColor: "#f8fafc", margin: [8, 7, 8, 7] },
              { text: d.curp ? d.curp.toUpperCase() : "No proporcionada", margin: [8, 7, 8, 7] },
            ],
            [
              { text: "Régimen habitual:", bold: true, fillColor: "#f8fafc", margin: [8, 7, 8, 7] },
              { text: d.regimenSugerido || "Sueldos y Salarios e Ingresos Asimilados a Salarios", margin: [8, 7, 8, 7] },
            ],
            [
              { text: "Domicilio:", bold: true, fillColor: "#f8fafc", margin: [8, 7, 8, 7] },
              { text: d.domicilio || "No proporcionado", margin: [8, 7, 8, 7] },
            ],
            [
              { text: "Teléfono / Correo:", bold: true, fillColor: "#f8fafc", margin: [8, 7, 8, 7] },
              {
                text: [d.telefono, d.correo].filter(Boolean).join("  |  ") || "No proporcionado",
                margin: [8, 7, 8, 7],
              },
            ],
          ],
        },
        layout: {
          hLineColor: () => "#cbd5e1",
          vLineColor: () => "#cbd5e1",
        },
        fontSize: 10,
        margin: [0, 0, 0, 26],
      },
      {
        stack: [
          { text: "Manifiesto bajo protesta de decir verdad que los datos aquí asentados son correctos.", fontSize: 9.5, alignment: "center", color: "#475569", margin: [0, 0, 0, 28] },
          { text: "__________________________________________", alignment: "center" },
          { text: nombreCompleto, bold: true, fontSize: 10, alignment: "center", margin: [0, 4, 0, 0] },
          { text: "Firma del Titular", fontSize: 9, alignment: "center", color: "#64748b" },
        ],
        margin: [0, 0, 0, 26],
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: [
                  { text: "AVISO IMPORTANTE: ", bold: true },
                  "Esta ficha presenta el RFC calculado de forma informativa para agilizar trámites internos de contratación o registro. No sustituye a la Constancia de Situación Fiscal oficial emitida por el Servicio de Administración Tributaria (SAT). En casos excepcionales de homonimia, la homoclave definitiva debe verificarse directamente en el portal del SAT.",
                ],
                fontSize: 8.5,
                color: "#475569",
                lineHeight: 1.35,
                margin: [10, 8, 10, 8],
              },
            ],
          ],
        },
        layout: {
          fillColor: () => "#f8fafc",
          hLineColor: () => "#e2e8f0",
          vLineColor: () => "#e2e8f0",
        },
      },
    ],
    defaultStyle: { font: "Roboto", color: "#1e293b" },
  };
}
