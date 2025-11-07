import { Request, Response } from "express";

// -------------------------------
// desglosarString
// -------------------------------
export function desglosarString(req: Request, res: Response): void {
  const { texto, tipo } = req.body;

  if (
    typeof texto !== "string" ||
    (tipo !== "vocales" && tipo !== "consonantes")
  ) {
    res
      .status(400)
      .json({
        error:
          "Debe enviar 'texto' (string) y 'tipo' ('vocales' o 'consonantes')",
      });
    return;
  }

  const vocales = ["a", "e", "i", "o", "u"];
  let contador = 0;

  for (const char of texto.toLowerCase()) {
    if (/[a-z]/.test(char)) {
      if (tipo === "vocales" && vocales.includes(char)) contador++;
      else if (tipo === "consonantes" && !vocales.includes(char)) contador++;
    }
  }

  res.json({ tipo, cantidad: contador });
}

// -------------------------------
// twoSum
// -------------------------------
export function twoSum(req: Request, res: Response): void {
  const { nums, target } = req.body;

  if (
    !Array.isArray(nums) ||
    nums.some((n) => typeof n !== "number") ||
    typeof target !== "number"
  ) {
    res
      .status(400)
      .json({
        error: "Debe enviar 'nums' (arreglo de números) y 'target' (número)",
      });
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        res.json({ indices: [i, j] });
        return;
      }
    }
  }

  res.json({ indices: null, mensaje: "No se encontró ninguna combinación" });
}

// -------------------------------
// conversionRomana
// -------------------------------
export function conversionRomana(req: Request, res: Response): void {
  const { romano } = req.body;

  if (typeof romano !== "string") {
    res
      .status(400)
      .json({ error: "Debe enviar 'romano' como cadena de texto" });
    return;
  }

  const valores: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;
  const upper = romano.toUpperCase();

  for (let i = 0; i < upper.length; i++) {
    const actual = valores[upper[i]];
    const siguiente = valores[upper[i + 1]];

    if (!actual) {
      res
        .status(400)
        .json({ error: `Carácter inválido '${upper[i]}' en número romano.` });
      return;
    }

    if (siguiente && actual < siguiente) total -= actual;
    else total += actual;
  }

  res.json({ numero: total });
}

// -------------------------------
// descomposicion
// -------------------------------
export function descomposicion(req: Request, res: Response): void {
  const { cadena } = req.body;

  if (typeof cadena !== "string") {
    res.status(400).json({ error: "Debe enviar 'cadena' como string" });
    return;
  }

  const partes = cadena.split(",");
  const palabra = partes[0];
  const diccionario = partes.slice(1);

  for (let i = 0; i < diccionario.length; i++) {
    for (let j = 0; j < diccionario.length; j++) {
      if (i !== j && diccionario[i] + diccionario[j] === palabra) {
        res.json({ palabra, resultado: [diccionario[i], diccionario[j]] });
        return;
      }
    }
  }

  res.json({
    palabra,
    resultado: null,
    mensaje: "No se encontró combinación válida",
  });
}
