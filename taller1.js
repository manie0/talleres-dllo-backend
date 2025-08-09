// ConvertidorTemp

const Cen = -40
function convertidorTemp(C){
    return C * (9/5) + 32
} 
console.log(convertidorTemp(Cen))

//Resolvedor
const a = 1
const b = 5
const c = 4
const op = 2 //1=+ y 2=-
function resolvedor (a, b, c, op){
    if(op===1){
        return (-b + (b**2 - 4*a*c)**(1/2))/2*a
    }
    else{
        return (-b - (b**2 - 4*a*c)**(1/2))/2*a
    }
} 
console.log (resolvedor(a, b, c, op))

//mejorParidad
const inp = 2
function mejorParidad (inp){
    if (inp%2===0) {
        return true
    }
    else {
        return false
    }
}

if(mejorParidad(inp)){
    console.log("par")
}else{
    console.log("impar")
}
//peorParidad
function peorParidad(n) {
    let con = 0;
    let positivo = n;

    while (positivo > 1) {
        positivo -= 2;
        con++;
    }

    return positivo === 0;
}
console.log(peorParidad(10));  
