/*Bai 1: Kiem tra so chan, le*/
function isEvenNumber (number) {
    if (number % 2 === 0) {
        return true
    } else {
        return false
    }
}

console.log(isEvenNumber(10));
console.log(isEvenNumber(7)); 

/*Bai 2: Tinh tien dien*/

function getElectricityBill(k) {
    if (k > 0 && k <= 50) {
        return `So tien dien phai tra: ${k * 1678}`
    } 
    else if (k >= 51 && k <= 100) {
        return `${50 * 1678 + (k - 50) * 1734}`
    } else if (k >= 101 && k <= 200) {
        return `${50 * 1678 + 50 * 1734 + (k - 100) * 2014}`
    } else if (k >= 201 && k <= 300) {
        return `${50 * 1678 + 50 * 1734 + 100 * 2014 + (k - 200) * 2536}`
    } else if (k >= 301 && k <= 400) {
        return `${50 * 1678 + 50 * 1734 + 100 * 2014 + 100 * 2536 + (k - 300) * 2834}`
    } else {
        return `${50 * 1678 + 50 * 1734 + 100 * 2014 + 100 * 2536 + 100 * 2834 + (k - 400) * 2927}`
    }
}

/*Bai 3: Chuan hoa du lieu*/

function cleanName(name, keyword) {
    name = name.trim()
    if (name.toLowerCase().includes(keyword)){
        return true
    } else {
        return false
    }
}

