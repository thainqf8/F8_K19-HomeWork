const employees = [
  { id: 1, name: "Alice", age: 23, status: 'working' },
  { id: 3, name: "Bob", age: 25, status: 'working' },
  { id: 6, name: "John", age: 27, status: 'working' },
  { id: 8, name: "David", age: 23, status: 'quit_job' },
  { id: 10, name: "Eve", age: 20, status: 'working' },
]; 

const products = [
  { id: 1, name: "Phone", price: 1200 },
  { id: 2, name: "Laptop", price: 3000 },
  { id: 3, name: "Tab", price: 2000 },
  { id: 4, name: "PC", price: 800 },
  { id: 5, name: "Monitor", price: 1500 },
];

const orders = [
  { id: 1, employeeId: 1, productId: 4, quantity: 1 },
  { id: 2, employeeId: 3, productId: 2, quantity: 4 },
  { id: 3, employeeId: 1, productId: 5, quantity: 3 },
  { id: 4, employeeId: 6, productId: 1, quantity: 2 },
  { id: 5, employeeId: 3, productId: 5, quantity: 3 },
  { id: 6, employeeId: 8, productId: 1, quantity: 1 },
  { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];


const globalSales = {};
for (const order of orders) {
    globalSales[order.productId] = (globalSales[order.productId] || 0) + order.quantity;
}

const globalEmployeeSales = {};
for (const order of orders) {
    globalEmployeeSales[order.employeeId] = (globalEmployeeSales[order.employeeId] || 0) + order.quantity;
}

const productPrices = {};
for (const p of products) {
    productPrices[p.id] = p.price; 
}

const globalEmployeeRevenue = {};
for (const order of orders) {
    const orderRevenue = order.quantity * productPrices[order.productId];
    globalEmployeeRevenue[order.employeeId] = (globalEmployeeRevenue[order.employeeId] || 0) + orderRevenue;
}
 
const employeeProductRevenue = {};
for (const order of orders) {
    const empId = order.employeeId;
    const prodId = order.productId;
    const revenue = order.quantity * productPrices[prodId];

    if (!employeeProductRevenue[empId]) {
        employeeProductRevenue[empId] = {};
    }
    employeeProductRevenue[empId][prodId] = (employeeProductRevenue[empId][prodId] || 0) + revenue;
}


/*Get working employees*/
const getWorkingEmployees = () => {
    return employees.filter(emp => emp.status.trim().toLowerCase() === 'working');
}

console.log(getWorkingEmployees());


/*Get the oldest employee*/
const getOldestEmployees = () => {
    let maxAge = -Infinity;
    let oldestEmp = null;
    for (const emp of employees) {
        if (emp.age > maxAge) {
            maxAge = emp.age;
            oldestEmp = emp;
        }
    }
    return oldestEmp;
}

console.log(getOldestEmployees());


/* Get the cheapest product */
const getCheapestProduct = () => {
    let minPrice = Infinity;
    let cheapestProd = null;
    for (const prod of products) {
        if (prod.price < minPrice) {
            minPrice = prod.price;
            cheapestProd = prod;
        }
    }
    return cheapestProd;
};
console.log(getCheapestProduct());


/*Find the best-selling product*/
const getBestSellingProduct = () => {
    let maxQty = 0;
    let bestProduct = null;

    for (const p of products) {
        const qty = globalSales[p.id] || 0; 
        
        if (qty > maxQty) {
            maxQty = qty;
            bestProduct = p;
        }
    }
    return bestProduct;
};
console.log(getBestSellingProduct());

/*Find the product with the highest revenue*/
const getHighestRevenueProduct = () => {
    let maxRev = -1;
    let bestProduct = null;

    for (const p of products) {
        const qty = globalSales[p.id] || 0; 
        const revenue = qty * p.price; 
        
        if (revenue > maxRev) {
            maxRev = revenue;
            bestProduct = p;
        }
    }
    return bestProduct;
};
console.log(getHighestRevenueProduct());

/*Find the employee who sold the most items (by quantity)*/

const getTopSellingEmployee = () => {
    let maxQty = 0;
    let bestEmployee = null;
    for (const emp of employees) {
        const qty = globalEmployeeSales[emp.id] || 0; 
        if (qty > maxQty) {
            maxQty = qty;
            bestEmployee = emp; 
        }
    }
    return bestEmployee;
};
console.log(getTopSellingEmployee());


/*Find the employee with the highest revenue*/
const getTopRevenueEmployee = () => {
    let maxRev = 0;
    let bestEmployee = null;
    for (const emp of employees) {
        const revenue = globalEmployeeRevenue[emp.id] || 0; 
        if (revenue > maxRev) {
            maxRev = revenue;
            bestEmployee = emp; 
        }
    }
    return bestEmployee;
};

/*Find the highest revenue product for each employee*/ 
const getTopProductPerEmployee = () => {
    return employees.map(emp => {
        let empSales;

        if (employeeProductRevenue[emp.id] === undefined) {
            empSales = {}; 
        } else {
            empSales = employeeProductRevenue[emp.id];
        }

        let maxRev = 0;
        let bestProduct = null;

        for (const p of products) {
            let revenue;

            if (empSales[p.id] === undefined) {
                revenue = 0; 
            } else {
                revenue = empSales[p.id]; 
            }

            if (revenue > maxRev) {
                maxRev = revenue;
                bestProduct = p;
            }
        }

        let topProductName = " ";
        if (bestProduct !== null) {
            topProductName = bestProduct.name;
        }
        return {
            employeeId: emp.id,
            employeeName: emp.name.toUpperCase(),
            topProductName: topProductName,
            maxRevenue: maxRev
        };
    });
};

console.log(getTopProductPerEmployee());

/*Calculate 3% commission for each employee based on their total revenue*/
const calculateCommissions = () => {
    return employees.map(emp => {
        let totalRevenue;

        if (globalEmployeeRevenue[emp.id] === undefined) {
            totalRevenue = 0; 
        } else {
            totalRevenue = globalEmployeeRevenue[emp.id]; 
        }

        const commissionAmount = totalRevenue * 0.03;

        return {
            employeeId: emp.id,
            employeeName: emp.name,
            totalRevenue: totalRevenue,
            commission: commissionAmount
        };
    });
};
console.log(calculateCommissions());

/*Sort employees by total revenue in descending order*/
const quickSortEmployeesDesc = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[0];
    
    let pivotRevenue;
    if (globalEmployeeRevenue[pivot.id] === undefined) {
        pivotRevenue = 0;
    } else {
        pivotRevenue = globalEmployeeRevenue[pivot.id];
    }

    const left = [];  
    const right = []; 

    for (let i = 1; i < arr.length; i++) {
        let currentRevenue;
        if (globalEmployeeRevenue[arr[i].id] === undefined) {
            currentRevenue = 0;
        } else {
            currentRevenue = globalEmployeeRevenue[arr[i].id];
        }

        if (currentRevenue >= pivotRevenue) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    
    return [...quickSortEmployeesDesc(left), pivot, ...quickSortEmployeesDesc(right)];
};


const sortEmployeesByRevenue = () => {
    const employee = [...employees];
    return quickSortEmployeesDesc(employee);
};


console.log(sortEmployeesByRevenue());
