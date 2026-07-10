import { Product } from "./Product";

export class OrderItem {
  product: Product;
  quantity: number;
  price: number;
  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
    this.price = product.price;
  }

  getTotal(): number {
    return this.price * this.quantity;
  }
}
