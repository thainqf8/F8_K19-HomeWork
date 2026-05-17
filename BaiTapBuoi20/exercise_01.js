const numbers = [9, 8, 3, 5, 6, 2, 7, 9 ];

let max = -Infinity;
let secondMax = -Infinity;
for (const num of numbers) {
    if (num > max) {
        secondMax = max;
        max = num;
    } else if (num > secondMax && num < max) {
        secondMax = num;
    }
}
console.log(secondMax);


