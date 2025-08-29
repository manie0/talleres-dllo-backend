function findMax (vec){
    let max = -999999999999999999999999999999 // verificacion en caso de que todos los elementos de la lista sean negativos (sin comentarios al respecto...)
    for (num of vec){
        if (num > max){
            max = num
        }
    }
    return max
}
console.log(findMax([3, 17, -1, 4, -19]))

function includes (vec, x){
    for (num of vec){
        if (num == x){
            return true
        }
    }
    return false
}
console.log(includes([3, 17, -1, 4, -19], 2))
console.log(includes([3, 17, -1, 4, -19], 4))

function sum (vec){
    let acum = 0
    for(num of vec){
        acum = acum + num
    }
    return acum
}
console.log(sum([3, 17, -1, 4, -19]))

function missingNumbers (vec){
    let faltantes = []
    let max = -999999999999999999999999999999
    let min = 9999999999999999999999999999999 
        for (num of vec){
        if (num > max){
            max = num
        } 
        if(num < min){
            min = num
        }
    }
    for(let i=min; i<=max; i++ ){
        let encontrado = false
        for(num of vec){
            if(i == num){
                encontrado = true
            }
        }
        if(encontrado == false){
            faltantes.push(i)
        }
    }
    return faltantes
}

console.log(missingNumbers([7, 2, 4, 6, 3, 9]))
