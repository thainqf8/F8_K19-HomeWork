const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

const mergeArray = [...classA, ...classB];
console.log(mergeArray);

const uniqueObject = {}

mergeArray.forEach(id => {
    uniqueObject[id] = true;
})

const uniqueIds = Object.keys(uniqueObject).map(Number);

function sortedArray(arr){
    if (arr.length <= 1) return arr;

    const pivot = arr[0]; /*Lấy gốc là arr[0] = 15*/
    const left = [] /*đẩy qua bên trái phần tử nhỏ hơn*/
    const right = [] /*đẩy qua bên phải phần tử lớn hơn*/

    for (let i = 1; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]); 
        } else {
            right.push(arr[i]);
        }
    }
    return [...sortedArray(left), pivot, ...sortedArray(right)]
}
const finalResult = sortedArray(uniqueIds);
console.log(finalResult);
