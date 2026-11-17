/**
 * Cálculo oficial del RFC (Registro Federal de Contribuyentes) de México
 * basado en las reglas del algoritmo del SAT para personas físicas.
 */

const PALABRAS_INCONVENIENTES = new Set([
  "BUEI", "BUEY", "CACA", "CACO", "CAGA", "CAGO", "CAKA", "CAKO",
  "COGE", "COGI", "COJA", "COJE", "COJI", "COJO", "COLA", "CULO",
  "FALO", "FETO", "GETA", "GUEI", "GUEY", "JETA", "JOTO", "KACA",
  "KACO", "KAGA", "KAGO", "KAKA", "KAKO", "KOGE", "KOGI", "KOJA",
  "KOJE", "KOJI", "KOJO", "KOLA", "KULO", "LILO", "LOCA", "LOCO",
  "LOKA", "LOKO", "MAME", "MAMO", "MEAR", "MEAS", "MEON", "MIAR",
  "MION", "MOCO", "MOKO", "MULA", "MULO", "NACA", "NACO", "PEDA",
  "PEDO", "PENE", "PIPI", "PITO", "POPO", "PUTA", "PUTO", "QULO",
  "RATA", "ROBA", "ROBE", "ROBO", "RUIN", "SENO", "TETA", "VACA",
  "VAGA", "VAGO", "VAKA", "VUEI", "VUEY", "WUEI", "WUEY",
]);

const ARTICULOS_PREPOSICIONES = new Set([
  "DE", "LA", "LAS", "MC", "VON", "DEL", "LOS", "Y", "MAC", "VAN", "MI",
]);

const NOMBRES_COMUNES_OMITIR = new Set(["JOSE", "MARIA", "MA", "J"]);

const TABLA_HOMOCLAVE: Record<string, string> = {
  " ": "00", "0": "00", "1": "01", "2": "02", "3": "03", "4": "04",
  "5": "05", "6": "06", "7": "07", "8": "08", "9": "09", "&": "10",
  A: "11", B: "12", C: "13", D: "14", E: "15", F: "16", G: "17",
  H: "18", I: "19", J: "21", K: "22", L: "23", M: "24", N: "25",
  O: "26", P: "27", Q: "28", R: "29", S: "32", T: "33", U: "34",
  V: "35", W: "36", X: "37", Y: "38", Z: "39", Ñ: "40",
};

const TABLA_CARACTERES_34 = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";

const TABLA_DIGITO_VERIFICADOR: Record<string, number> = {
  "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 18, J: 19,
  K: 20, L: 21, M: 22, N: 23, "&": 24, O: 25, P: 26, Q: 27, R: 28, S: 29,
  T: 30, U: 31, V: 32, W: 33, X: 34, Y: 35, Z: 36, " ": 37, Ñ: 38,
};

function normalizarTexto(texto: string): string {
  return texto
    .toUpperCase()
    .trim()
    .replace(/[ÁÀÄÂ]/g, "A")
    .replace(/[ÉÈËÊ]/g, "E")
    .replace(/[ÍÌÏÎ]/g, "I")
    .replace(/[ÓÒÖÔ]/g, "O")
    .replace(/[ÚÙÜÛ]/g, "U")
    .replace(/[^A-ZÑ&\s]/g, "")
    .replace(/\s+/g, " ");
}

function limpiarPalabras(texto: string): string {
  const palabras = normalizarTexto(texto).split(" ").filter(Boolean);
  const filtradas = palabras.filter((p) => !ARTICULOS_PREPOSICIONES.has(p));
  return filtradas.join(" ") || palabras.join(" ");
}

function esVocal(c: string): boolean {
  return "AEIOU".includes(c);
}

function obtenerPrimeraVocalInterna(palabra: string): string {
  for (let i = 1; i < palabra.length; i++) {
    if (esVocal(palabra[i])) {
      return palabra[i];
    }
  }
  return "X";
}

function calcularHomoclave(nombreCompleto: string): string {
  const limpio = normalizarTexto(nombreCompleto);
  let cadenaNumerica = "0";

  for (const char of limpio) {
    cadenaNumerica += TABLA_HOMOCLAVE[char] ?? "00";
  }

  let suma = 0;
  for (let i = 0; i < cadenaNumerica.length - 1; i++) {
    const par = parseInt(cadenaNumerica.slice(i, i + 2), 10);
    const sig = parseInt(cadenaNumerica[i + 1], 10);
    suma += par * sig;
  }

  const ultimosTres = suma % 1000;
  const cociente = Math.floor(ultimosTres / 34);
  const residuo = ultimosTres % 34;

  return `${TABLA_CARACTERES_34[cociente] ?? "1"}${TABLA_CARACTERES_34[residuo] ?? "1"}`;
}

function calcularDigitoVerificador(rfc12: string): string {
  let suma = 0;
  for (let i = 0; i < 12; i++) {
    const valor = TABLA_DIGITO_VERIFICADOR[rfc12[i]] ?? 0;
    suma += valor * (13 - i);
  }
  const residuo = suma % 11;
  if (residuo === 0) return "0";
  const resultado = 11 - residuo;
  if (resultado === 10) return "A";
  return resultado.toString();
}

export interface ResultadoRFC {
  rfc10: string;
  homoclave: string;
  digitoVerificador: string;
  rfcCompleto: string;
  esValido: boolean;
}

export function calcularRFC(params: {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  fechaNacimiento: string; // YYYY-MM-DD
}): ResultadoRFC {
  const { nombre, apellidoPaterno, apellidoMaterno = "", fechaNacimiento } = params;

  if (!nombre.trim() || !apellidoPaterno.trim() || !fechaNacimiento) {
    return {
      rfc10: "",
      homoclave: "",
      digitoVerificador: "",
      rfcCompleto: "",
      esValido: false,
    };
  }

  const partesFecha = fechaNacimiento.split("-");
  if (partesFecha.length !== 3) {
    return {
      rfc10: "",
      homoclave: "",
      digitoVerificador: "",
      rfcCompleto: "",
      esValido: false,
    };
  }

  const [anio, mes, dia] = partesFecha;
  const fechaRfc = `${anio.slice(-2)}${mes}${dia}`;

  const paternoLimpio = limpiarPalabras(apellidoPaterno).replace(/Ñ/g, "X");
  const maternoLimpio = limpiarPalabras(apellidoMaterno).replace(/Ñ/g, "X");

  let nombrePalabras = limpiarPalabras(nombre).replace(/Ñ/g, "X").split(" ").filter(Boolean);
  if (nombrePalabras.length > 1 && NOMBRES_COMUNES_OMITIR.has(nombrePalabras[0])) {
    nombrePalabras = nombrePalabras.slice(1);
  }
  const nombreLimpio = nombrePalabras.join(" ");

  let cuatroLetras = "";

  if (!maternoLimpio) {
    // Sin apellido materno: 2 primeras letras del paterno + 2 primeras del nombre
    cuatroLetras = `${paternoLimpio.slice(0, 2).padEnd(2, "X")}${nombreLimpio
      .slice(0, 2)
      .padEnd(2, "X")}`;
  } else if (paternoLimpio.length <= 2) {
    // Paterno de 1 o 2 letras
    cuatroLetras = `${paternoLimpio[0] ?? "X"}${maternoLimpio[0] ?? "X"}${nombreLimpio
      .slice(0, 2)
      .padEnd(2, "X")}`;
  } else {
    const l1 = paternoLimpio[0] ?? "X";
    const l2 = obtenerPrimeraVocalInterna(paternoLimpio);
    const l3 = maternoLimpio[0] ?? "X";
    const l4 = nombreLimpio[0] ?? "X";
    cuatroLetras = `${l1}${l2}${l3}${l4}`;
  }

  if (PALABRAS_INCONVENIENTES.has(cuatroLetras)) {
    cuatroLetras = `${cuatroLetras.slice(0, 3)}X`;
  }

  const rfc10 = `${cuatroLetras}${fechaRfc}`;

  const nombreCompletoParaHomo = `${apellidoPaterno} ${apellidoMaterno} ${nombre}`.trim();
  const homoclave = calcularHomoclave(nombreCompletoParaHomo);
  const rfc12 = `${rfc10}${homoclave}`;
  const digitoVerificador = calcularDigitoVerificador(rfc12);

  return {
    rfc10,
    homoclave,
    digitoVerificador,
    rfcCompleto: `${rfc12}${digitoVerificador}`,
    esValido: true,
  };
}
