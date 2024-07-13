const arr = [1, 2, 3, 4, 5, 6];
const func = (x) => x % 2 == 0;


const arr2 = arr.map(func);

const members = arr.reduce((acc, x) => [...acc, func(x)], []);

console.log({ arr, arr2, members });


// Array.prototype.map = function (fn) {
//   const result = [];
//   for (let i = 0; i < this.length; i++) {
//     const val = this[i];
//     const newVal = fn(val, i, this);
//     result.push(newVal);
//   }
//   return result;
// };

// arr.map(fn);

// Array.prototype.reduce = function (fn, initialVal) {
//   const hasInitVal = initialVal === undefined;
//   let acc = hasInitVal ? initialVal : this[0];
//   const startIdx = hasInitVal ? 0 : 1;
//   for (let i = startIdx; i < this.length; i++) {
//     const val = this[i];
//     acc = fn(acc, val, i, this);
//   }
//   return acc;
// };


// function sum(arr, init) {
//     let acc = init;
//     const fn =(acc, val) => acc + val;
//     for() {
//         acc = fn(acc, arr[i])
//     }
// }
