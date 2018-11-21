import * as Vector from 'victor';

// numeric
function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function GetOneInArray(arr) {
    let min = 0;
    let max = arr.length;
    return arr[GetRandomInt(min, max)];
}

function IsNumInRange(num, min, max) {
    return num<min ? false : num > max ? false : true;
}

// physic
function Reflection(ins, normal) {
    let mid = Vector.fromArray(ins.toArray())
                .dot(normal)
                .multiply(new Vector(2, 2))
                .dot(normal);
    let res = Vector.fromArray(ins.toArray())
                .subtract(mid);
    return res;
}

export {
    GetRandomInt,
    GetOneInArray,
    IsNumInRange,
    Reflection
}