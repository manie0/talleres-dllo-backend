import { Request, Response } from "express";

// ConvertidorTemp
export function convertidorTemp(req: Request, res: Response): void {
  const { C } = req.body;
  if (typeof C !== "number") {
    res.status(400).json({ error: "Debe enviar un número en C" });
    return;
  }

  const resultado = C * (9 / 5) + 32;
  res.json({ resultado });
}

// Resolvedor
export function resolvedor(req: Request, res: Response): void {
  const { a, b, c, op } = req.body;
  if ([a, b, c, op].some((v) => typeof v !== "number")) {
    res.status(400).json({ error: "Debe enviar a, b, c y op como números" });
    return;
  }

  const discriminante = b ** 2 - 4 * a * c;
  if (discriminante < 0) {
    res.status(400).json({ error: "La ecuación no tiene soluciones reales" });
    return;
  }

  let resultado: number;
  if (op === 1) {
    resultado = (-b + Math.sqrt(discriminante)) / (2 * a);
  } else {
    resultado = (-b - Math.sqrt(discriminante)) / (2 * a);
  }

  res.json({ resultado });
}

// Mejor Paridad
export function mejorParidad(req: Request, res: Response): void {
  const { n } = req.body;
  if (typeof n !== "number") {
    res.status(400).json({ error: "Debe enviar un número en n" });
    return;
  }

  const esPar = n % 2 === 0;
  res.json({ valor: esPar });
}

// Peor Paridad
export function peorParidad(req: Request, res: Response): void {
  const { n } = req.body;
  if (typeof n !== "number") {
    res.status(400).json({ error: "Debe enviar un número en n" });
    return;
  }

  let positivo = Math.abs(n);
  while (positivo > 1) {
    positivo -= 2;
  }
  const esPar = positivo === 0;

  res.json({ valor: esPar });
}
