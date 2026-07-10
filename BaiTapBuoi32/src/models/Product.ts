export class Product {
  id: number;
  name: string;
  price: number;
  stock: number;

  constructor(id: number, name: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  increaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Số lượng tăng phải lớn hơn 0");
    }
    this.stock += quantity;
  }

  decreaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Số lượng giảm phải lớn hơn 0");
    }
    if (quantity > this.stock) {
      throw new Error(
        `Không đủ hàng trong kho. Tồn kho hiện tại: ${this.stock}`
      );
    }
    this.stock -= quantity;
  }

  toString(): string {
    return `[Product] ID: ${this.id} | Tên: ${this.name} | Giá: ${this.price.toLocaleString("vi-VN")}đ | Tồn kho: ${this.stock}`;
  }
}
