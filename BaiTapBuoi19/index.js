const products = [
  { id: 1, name: 'iPhone', price: 2000 },
  { id: 2, name: 'Samsung', price: 1500 },
  { id: 3, name: 'Xiaomi', price: 1000 },
  { id: 4, name: 'Oppo', price: 1200 }
]
const orders = [
  {
    id: 1,
    items: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 }
    ]
  },
  {
    id: 2,
    items: [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 3 }
    ]
  },
  {
    id: 3,
    items: [
      { productId: 2, quantity: 2 },
      { productId: 4, quantity: 1 }
    ]
  }
]

function printTopSellingProduct() {
    let productPriceMap = {}; 

    for (let i = 0; i < products.length; i++){
        productPriceMap[products[i].id] = products[i];
    }

    let quantitySoldMap =  {};
    for (let j = 0; j < orders.length; j++){
        let items = orders[j].items;
        for (let k = 0; k < items.length; k++) {
            let pid = items[k].productId;
            if (quantitySoldMap[pid] === undefined) {
                quantitySoldMap[pid] = 0;
            }

            quantitySoldMap[pid] = quantitySoldMap[pid] + items[k].quantity
        }

    }
    let maxRevenue = 0;
    let topProductName = "";

    for (let pid in quantitySoldMap) {
        let totalQuantity = quantitySoldMap[pid];
        let productInfo = productPriceMap[pid];
        let productRevenue = totalQuantity * productInfo.price;
        if (productRevenue > maxRevenue) {
            maxRevenue = productRevenue;
            topProductName = productInfo.name;
        }
    }
    console.log(`${topProductName}`);
    console.log(`${maxRevenue}`);
}

printTopSellingProduct();