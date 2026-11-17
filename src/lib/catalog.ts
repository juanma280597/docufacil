export interface FAQItem {
  question: string;
  answer: string;
}

export interface GeneratorInfo {
  slug: string;
  titulo: string;
  tituloCorto: string;
  subtitulo: string;
  badge: string;
  tiempo: string;
  icono: "FileSignature" | "Home" | "Receipt" | "Banknote" | "ShieldCheck" | "IdCard";
  seoTitle: string;
  seoDescription: string;
  queEs: string;
  cuandoUsar: string[];
  faqs: FAQItem[];
}

export const GENERATORS: GeneratorInfo[] = [
  {
    slug: "carta-poder",
    titulo: "Generador de Carta Poder Simple",
    tituloCorto: "Carta Poder Simple",
    subtitulo: "Autoriza a alguien de confianza para hacer un trámite o recoger documentos por ti.",
    badge: "Más popular",
    tiempo: "2 min",
    icono: "FileSignature",
    seoTitle: "Formato Carta Poder Simple PDF Gratis | Llenar e Imprimir",
    seoDescription:
      "Crea e imprime una carta poder simple en PDF en 2 minutos. Con opción de 2 testigos, vista previa en vivo y lista para firmar en México y Latinoamérica.",
    queEs:
      "Una Carta Poder Simple es un documento privado mediante el cual una persona (otorgante) autoriza a otra (apoderado) para que realice un trámite específico en su nombre, como recoger documentos, hacer gestiones escolares, bancarias básicas o recibir paquetería.",
    cuandoUsar: [
      "Recoger documentos oficiales, certificados escolares o placas vehiculares.",
      "Realizar trámites administrativos ante escuelas, empresas o dependencias.",
      "Autorizar a un familiar o mensajero para recibir paquetes o notificaciones.",
    ],
    faqs: [
      {
        question: "¿La carta poder simple necesita notario público?",
        answer:
          "Para trámites sencillos (recoger papeles, gestiones escolares o administrativas menores) generalmente basta con una carta poder simple acompañada de copia de la identificación oficial de quien otorga, quien recibe y dos testigos. Para venta de inmuebles, juicios o trámites bancarios mayores sí se requiere poder notarial.",
      },
      {
        question: "¿Es obligatorio poner dos testigos?",
        answer:
          "Es muy recomendable incluir dos testigos con su nombre y firma, ya que la mayoría de las instituciones en México y Latinoamérica los solicitan para validar el documento.",
      },
      {
        question: "¿Mis datos se guardan en internet?",
        answer:
          "No. Todo el documento se genera directamente en tu computadora o celular. Nadie más puede ver tu información.",
      },
    ],
  },
  {
    slug: "calculadora-rfc",
    titulo: "Calculadora de RFC y Ficha para Trabajo",
    tituloCorto: "Calculadora y Ficha RFC",
    subtitulo: "Calcula tu RFC con homoclave e imprime una ficha formal lista para entregar en Recursos Humanos.",
    badge: "Para trabajo",
    tiempo: "1 min",
    icono: "IdCard",
    seoTitle: "Calcular RFC con Homoclave Gratis e Imprimir Ficha para Trabajo",
    seoDescription:
      "Calcula tu RFC en segundos con el algoritmo oficial del SAT y descarga una Ficha de Identificación Fiscal en PDF lista para presentar en tu empleo.",
    queEs:
      "Esta herramienta calcula tu Registro Federal de Contribuyentes (RFC) de persona física incluyendo la homoclave y el dígito verificador, y te permite generar una Ficha de Identificación Fiscal limpia y formal en PDF para entregar en entrevistas de trabajo o trámites internos.",
    cuandoUsar: [
      "Cuando una empresa o Recursos Humanos te pide tu RFC para iniciar tu alta o pre-registro.",
      "Si necesitas entregar una hoja ordenada con tu RFC, CURP y datos de contacto.",
      "Para verificar rápidamente cómo se compone tu RFC a partir de tu nombre y fecha de nacimiento.",
    ],
    faqs: [
      {
        question: "¿Esta ficha sustituye a la Constancia de Situación Fiscal del SAT?",
        answer:
          "No. La Constancia de Situación Fiscal oficial solo la emite el SAT. Sin embargo, esta Ficha de Identificación Fiscal es muy útil para entregar tus datos ordenados en Recursos Humanos o cuando te piden el RFC de manera informativa.",
      },
      {
        question: "¿Qué pasa si ya conozco mi homoclave oficial?",
        answer:
          "En el formulario puedes activar la opción 'Ya conozco mi homoclave' para escribir exactamente los últimos 3 caracteres de tu constancia oficial y que aparezcan en tu ficha impresa.",
      },
      {
        question: "¿Por qué a veces cambia la homoclave en el SAT?",
        answer:
          "El algoritmo público calcula la homoclave estándar. En casos muy raros de homonimia (otra persona con exactamente el mismo nombre y fecha de nacimiento), el SAT asigna una homoclave distinta para evitar duplicados.",
      },
    ],
  },
  {
    slug: "contrato-arrendamiento",
    titulo: "Contrato de Arrendamiento Básico",
    tituloCorto: "Contrato de Arrendamiento",
    subtitulo: "Contrato claro para rentar una casa, departamento o cuarto con depósito y reglas básicas.",
    badge: "MX y LatAm",
    tiempo: "3 min",
    icono: "Home",
    seoTitle: "Contrato de Arrendamiento Simple PDF Gratis | Renta de Casa o Departamento",
    seoDescription:
      "Genera un contrato de arrendamiento básico en PDF listo para firmar. Incluye cláusulas de renta, depósito en garantía, vigencia, servicios y mascotas.",
    queEs:
      "Un contrato de arrendamiento simple establece por escrito los derechos y obligaciones entre quien renta un inmueble (arrendador) y quien lo habita (arrendatario), evitando malentendidos sobre el monto de la renta, el depósito, la duración y el pago de servicios.",
    cuandoUsar: [
      "Al rentar una casa, departamento, cuarto o estudio por mes.",
      "Cuando deseas dejar por escrito el monto del depósito en garantía y las fechas de pago.",
      "Para establecer reglas claras sobre servicios incluidos y mascotas.",
    ],
    faqs: [
      {
        question: "¿Sirve este contrato para cualquier país de Latinoamérica?",
        answer:
          "Sí. Puedes elegir la moneda (pesos mexicanos, dólares, pesos colombianos, argentinos, soles o pesos chilenos) y la ciudad/país donde se firma el contrato.",
      },
      {
        question: "¿Qué debe incluir un buen contrato de renta?",
        answer:
          "Nombre completo de ambas partes, dirección exacta del inmueble, monto mensual de la renta, día límite de pago, depósito en garantía, duración del contrato y quién paga los servicios.",
      },
    ],
  },
  {
    slug: "pagare",
    titulo: "Generador de Pagaré PDF",
    tituloCorto: "Pagaré Legal",
    subtitulo: "Respalda un préstamo o deuda con fecha de vencimiento, monto en letra y aval opcional.",
    badge: "Con monto en letra",
    tiempo: "2 min",
    icono: "Banknote",
    seoTitle: "Formato de Pagaré PDF Gratis para Llenar e Imprimir",
    seoDescription:
      "Crea un pagaré profesional en PDF con conversión automática de cantidad a letra, fecha de vencimiento, interés moratorio y espacio opcional para aval.",
    queEs:
      "El pagaré es un título de crédito mediante el cual una persona (deudor o suscriptor) se compromete incondicionalmente a pagar una cantidad específica de dinero a otra persona (beneficiario) en una fecha determinada.",
    cuandoUsar: [
      "Al prestar dinero a un conocido, familiar o cliente y querer respaldo formal.",
      "En ventas a plazos o pagos diferidos de vehículos, mercancía o servicios.",
      "Cuando necesitas un documento con la cantidad escrita automáticamente en número y letra.",
    ],
    faqs: [
      {
        question: "¿Por qué es importante que la cantidad esté en número y en letra?",
        answer:
          "Escribir la cantidad tanto en número como en letra evita alteraciones o confusiones sobre el monto real de la deuda.",
      },
      {
        question: "¿Cuándo conviene incluir un aval?",
        answer:
          "Se recomienda incluir un aval (obligado solidario) cuando el monto es alto o quieres una garantía adicional de pago en caso de que el deudor principal no cumpla.",
      },
    ],
  },
  {
    slug: "recibo-pago",
    titulo: "Recibo de Pago / Honorarios / Renta",
    tituloCorto: "Recibo de Pago",
    subtitulo: "Comprobante rápido y ordenado para entregar cuando recibes dinero en efectivo o transferencia.",
    badge: "Rápido",
    tiempo: "1 min",
    icono: "Receipt",
    seoTitle: "Recibo de Pago y Arrendamiento Simple en PDF Gratis",
    seoDescription:
      "Genera recibos de pago, renta o honorarios informales en PDF con folio, cantidad en letra automática y espacio para firma.",
    queEs:
      "Un recibo de pago simple es la constancia escrita de que una persona entregó dinero a otra por un concepto específico (mensualidad de renta, honorarios por un trabajo, abono a una deuda o compraventa entre particulares).",
    cuandoUsar: [
      "Al cobrar la renta mensual de un departamento o cuarto.",
      "Cuando realizas un trabajo independiente o servicio y el cliente te pide un comprobante simple.",
      "Al recibir un abono o liquidación de un préstamo personal.",
    ],
    faqs: [
      {
        question: "¿Este recibo reemplaza a una factura fiscal (CFDI)?",
        answer:
          "No. Es un comprobante simple entre particulares para dejar constancia de que se entregó y recibió dinero. Para efectos fiscales ante el SAT u otra autoridad tributaria se requiere factura electrónica.",
      },
      {
        question: "¿Se convierte el monto a letra automáticamente?",
        answer:
          "Sí, al escribir la cantidad numérica el sistema escribe automáticamente el importe en letras según la moneda que elijas.",
      },
    ],
  },
  {
    slug: "politica-privacidad",
    titulo: "Generador de Política de Privacidad",
    tituloCorto: "Política de Privacidad",
    subtitulo: "Texto legal listo para tu sitio web, tienda en línea o blog (compatible con AdSense y Analytics).",
    badge: "Para sitios web",
    tiempo: "2 min",
    icono: "ShieldCheck",
    seoTitle: "Generador de Política de Privacidad Gratis para Web y AdSense",
    seoDescription:
      "Crea la Política de Privacidad para tu página web o blog en español. Incluye cláusulas de cookies, Google AdSense, Analytics y derechos ARCO.",
    queEs:
      "La Política de Privacidad (o Aviso de Privacidad) informa a los visitantes de tu sitio web qué datos recopilas, cómo los proteges, si utilizas cookies o publicidad como Google AdSense, y cómo pueden contactarte para ejercer sus derechos.",
    cuandoUsar: [
      "Al crear un sitio web, blog o tienda en línea y necesitar la página obligatoria de Privacidad.",
      "Antes de enviar tu sitio web a revisión para Google AdSense.",
      "Para cumplir con la Ley de Protección de Datos (LFPDPPP en México y normativas en LatAm).",
    ],
    faqs: [
      {
        question: "¿Puedo copiar el texto directo para pegarlo en mi web?",
        answer:
          "Sí. Además de descargarlo en PDF, incluimos un botón de 'Copiar texto completo' para que lo pegues directamente en WordPress, Wix, Shopify o tu código HTML.",
      },
      {
        question: "¿Incluye la cláusula requerida por Google AdSense?",
        answer:
          "Sí, al dejar activada la opción de publicidad y analítica se incluye el aviso sobre cookies de terceros y la configuración de anuncios de Google.",
      },
    ],
  },
];

export function getGeneratorBySlug(slug: string): GeneratorInfo {
  const found = GENERATORS.find((g) => g.slug === slug);
  if (!found) {
    throw new Error(`Generador no encontrado: ${slug}`);
  }
  return found;
}
