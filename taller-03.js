function desglosarString(texto, tipo) {
  const vocales = ["a", "e", "i", "o", "u"]
  let contador = 0

  for (let char of texto.toLowerCase()) {
    if (/[a-z]/.test(char)) { // solo letras
      if (tipo === "vocales" && vocales.includes(char)) {
        contador++
      } else if (tipo === "consonantes" && !vocales.includes(char)) {
        contador++
      }
    }
  }

  return contador
}

function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}

function conversionRomana(romano) {
  const valores = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }

  let total = 0

  for (let i = 0; i < romano.length; i++) {
    const actual = valores[romano[i]]
    const siguiente = valores[romano[i + 1]]

    // Si el actual es menor que el siguiente, significa que se resta
    if (siguiente && actual < siguiente) {
      total -= actual
    } else {
      total += actual
    }
  }

  return total
}
function descomposicion(cadena) {
  
  const partes = cadena.split(",")
  const palabra = partes[0]  
  const diccionario = partes.slice(1)
  for (let i = 0; i < diccionario.length; i++) {
    for (let j = 0; j < diccionario.length; j++) {
      if (i !== j) {
        if (diccionario[i] + diccionario[j] === palabra) {
          return [diccionario[i], diccionario[j]]
        }
      }
    }
  }
}

console.log(desglosarString("murcielagos", "vocales"))    
console.log(desglosarString("murcielagos", "consonantes")) 
console.log(twoSum([2, 7, 11, 15], 9)) 
console.log(twoSum([3, 4, 2], 6))      
console.log(conversionRomana("III"))
console.log(conversionRomana("XIV"))
console.log(conversionRomana("MMXXIV"))
console.log(conversionRomana("MCMXCVII"))
console.log(descomposicion("malhumor,al,hum,humor,m,mal,malhu"))