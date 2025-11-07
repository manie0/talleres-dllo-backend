import { Request, Response } from "express";

// -------------------------------
// findMax
// -------------------------------
export function findMax(req: Request, res: Response): void {
  const { vec } = req.body;

  if (!Array.isArray(vec) || vec.some((x) => typeof x !== "number")) {
    res
      .status(400)
      .json({ error: "Debe enviar un arreglo de números en 'vec'" });
    return;
  }

  let max = -Infinity;
  for (const num of vec) {
    if (num > max) {
      max = num;
    }
  }

  res.json({ maximo: max });
}

// -------------------------------
// includes
// -------------------------------
export function includesNumber(req: Request, res: Response): void {
  const { vec, x } = req.body;

  if (!Array.isArray(vec) || typeof x !== "number") {
    res
      .status(400)
      .json({ error: "Debe enviar un arreglo 'vec' y un número 'x'" });
    return;
  }

  const encontrado = vec.includes(x);
  res.json({ encontrado });
}

// -------------------------------
// sum
// -------------------------------
export function sum(req: Request, res: Response): void {
  const { vec } = req.body;

  if (!Array.isArray(vec) || vec.some((x) => typeof x !== "number")) {
    res
      .status(400)
      .json({ error: "Debe enviar un arreglo de números en 'vec'" });
    return;
  }

  const total = vec.reduce((acum, num) => acum + num, 0);
  res.json({ suma: total });
}

// -------------------------------
// missingNumbers
// -------------------------------
export function missingNumbers(req: Request, res: Response): void {
  const { vec } = req.body;

  if (!Array.isArray(vec) || vec.some((x) => typeof x !== "number")) {
    res
      .status(400)
      .json({ error: "Debe enviar un arreglo de números en 'vec'" });
    return;
  }

  const max = Math.max(...vec);
  const min = Math.min(...vec);
  const faltantes: number[] = [];

  for (let i = min; i <= max; i++) {
    if (!vec.includes(i)) {
      faltantes.push(i);
    }
  }

  res.json({ faltantes });
}
