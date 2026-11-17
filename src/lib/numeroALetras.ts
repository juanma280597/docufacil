export type MonedaCodigo = "MXN" | "USD" | "COP" | "ARS" | "PEN" | "CLP";

export const MONEDAS: Record<
  MonedaCodigo,
  {
    codigo: MonedaCodigo;
    nombreSingular: string;
    nombrePlural: string;
    sufijo: string;
    simbolo: string;
    pais: string;
  }
> = {
  MXN: {
    codigo: "MXN",
    nombreSingular: "PESO",
    nombrePlural: "PESOS",
    sufijo: "M.N.",
    simbolo: "$",
    pais: "México",
  },
  USD: {
    codigo: "USD",
    nombreSingular: "DÓLAR",
    nombrePlural: "DÓLARES",
    sufijo: "USD",
    simbolo: "US$",
    pais: "Internacional / EE. UU.",
  },
  COP: {
    codigo: "COP",
    nombreSingular: "PESO COLOMBIANO",
    nombrePlural: "PESOS COLOMBIANOS",
    sufijo: "COP",
    simbolo: "$",
    pais: "Colombia",
  },
  ARS: {
    codigo: "ARS",
    nombreSingular: "PESO ARGENTINO",
    nombrePlural: "PESOS ARGENTINOS",
    sufijo: "ARS",
    simbolo: "$",
    pais: "Argentina",
  },
  PEN: {
    codigo: "PEN",
    nombreSingular: "SOL",
    nombrePlural: "SOLES",
    sufijo: "PEN",
    simbolo: "S/",
    pais: "Perú",
  },
  CLP: {
    codigo: "CLP",
    nombreSingular: "PESO CHILENO",
    nombrePlural: "PESOS CHILENOS",
    sufijo: "CLP",
    simbolo: "$",
    pais: "Chile",
  },
};

function unidades(num: number): string {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
    default:
      return "";
  }
}

function decenas(num: number): string {
  const decena = Math.floor(num / 10);
  const unidad = num - decena * 10;

  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + unidades(unidad);
      }
    case 3:
      return decenasY("TREINTA", unidad);
    case 4:
      return decenasY("CUARENTA", unidad);
    case 5:
      return decenasY("CINCUENTA", unidad);
    case 6:
      return decenasY("SESENTA", unidad);
    case 7:
      return decenasY("SETENTA", unidad);
    case 8:
      return decenasY("OCHENTA", unidad);
    case 9:
      return decenasY("NOVENTA", unidad);
    case 0:
      return unidades(unidad);
    default:
      return "";
  }
}

function decenasY(strSin: string, numUnidades: number): string {
  if (numUnidades > 0) {
    return `${strSin} Y ${unidades(numUnidades)}`;
  }
  return strSin;
}

function centenas(num: number): string {
  const centenasNum = Math.floor(num / 100);
  const decenasNum = num - centenasNum * 100;

  switch (centenasNum) {
    case 1:
      if (decenasNum > 0) return "CIENTO " + decenas(decenasNum);
      return "CIEN";
    case 2:
      return "DOSCIENTOS " + decenas(decenasNum);
    case 3:
      return "TRESCIENTOS " + decenas(decenasNum);
    case 4:
      return "CUATROCIENTOS " + decenas(decenasNum);
    case 5:
      return "QUINIENTOS " + decenas(decenasNum);
    case 6:
      return "SEISCIENTOS " + decenas(decenasNum);
    case 7:
      return "SETECIENTOS " + decenas(decenasNum);
    case 8:
      return "OCHOCIENTOS " + decenas(decenasNum);
    case 9:
      return "NOVECIENTOS " + decenas(decenasNum);
    default:
      return decenas(decenasNum);
  }
}

function seccion(
  num: number,
  divisor: number,
  strSingular: string,
  strPlural: string
): string {
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;

  let letras = "";

  if (cientos > 0) {
    if (cientos > 1) {
      letras = centenas(cientos).trim() + " " + strPlural;
    } else {
      letras = strSingular;
    }
  }

  if (resto > 0) {
    letras += "";
  }

  return letras.trim();
}

function miles(num: number): string {
  const divisor = 1000;
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;

  const strMiles = seccion(num, divisor, "UN MIL", "MIL");
  const strCentenas = centenas(resto).trim();

  if (strMiles === "") return strCentenas;
  return `${strMiles} ${strCentenas}`.trim();
}

function millones(num: number): string {
  const divisor = 1000000;
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;

  const strMillones = seccion(num, divisor, "UN MILLÓN", "MILLONES");
  const strMiles = miles(resto).trim();

  if (strMillones === "") return strMiles;
  return `${strMillones} ${strMiles}`.trim();
}

export function numeroALetras(
  cantidad: number | string,
  moneda: MonedaCodigo = "MXN"
): string {
  const num = typeof cantidad === "string" ? parseFloat(cantidad) : cantidad;
  if (isNaN(num) || num < 0) return "";

  const enteros = Math.floor(num);
  const centavos = Math.round((num - enteros) * 100);
  const centavosStr = centavos.toString().padStart(2, "0");

  const infoMoneda = MONEDAS[moneda] || MONEDAS.MXN;
  const etiquetaMoneda =
    enteros === 1 ? infoMoneda.nombreSingular : infoMoneda.nombrePlural;

  let textoEntero = "";
  if (enteros === 0) {
    textoEntero = "CERO";
  } else {
    textoEntero = millones(enteros);
  }

  return `${textoEntero} ${etiquetaMoneda} ${centavosStr}/100 ${infoMoneda.sufijo}`.replace(
    /\s+/g,
    " "
  );
}

export function formatearMoneda(
  cantidad: number | string,
  moneda: MonedaCodigo = "MXN"
): string {
  const num = typeof cantidad === "string" ? parseFloat(cantidad) : cantidad;
  if (isNaN(num)) return "";
  const info = MONEDAS[moneda] || MONEDAS.MXN;
  return `${info.simbolo}${num.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${info.codigo}`;
}
