import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
  NEW = "NEW",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export class Order {
  id: number;
  customer: Customer;
  items: OrderItem[] = [];
  createdAt: Date;
  status: OrderStatus;

  constructor(id: number, customer: Customer) {
    this.id = id;
    this.customer = customer;
    this.createdAt = new Date();
    this.status = OrderStatus.NEW;
  }

  addItem(item: OrderItem): void {
    const existing = this.items.find(
      (i) => i.product.id === item.product.id
    );
    if (existing) {
      existing.quantity += item.quantity;
      console.log(
        `Đã cập nhật số lượng sản phẩm "${item.product.name}" trong đơn hàng #${this.id}`
      );
    } else {
      this.items.push(item);
      console.log(
        `Đã thêm "${item.product.name}" x${item.quantity} vào đơn hàng #${this.id}`
      );
    }
  }

  removeItem(productId: number): void {
    const index = this.items.findIndex((i) => i.product.id === productId);
    if (index === -1) {
      throw new Error(
        `Không tìm thấy sản phẩm ID ${productId} trong đơn hàng #${this.id}`
      );
    }
    const removed = this.items.splice(index, 1)[0];
    console.log(
      `Đã xoá "${removed.product.name}" khỏi đơn hàng #${this.id}`
    );
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
  }

  printInvoice(): void {
    const line = "─".repeat(50);
    console.log(`\n╔${"═".repeat(50)}╗`);
    console.log(`║${"  HOÁ ĐƠN ĐẶT HÀNG".padEnd(49)}║`);
    console.log(`╠${"═".repeat(50)}╣`);
    console.log(`║  Mã đơn hàng : #${String(this.id).padEnd(31)}║`);
    console.log(`║  Khách hàng  : ${this.customer.name.padEnd(34)}║`);
    console.log(`║  SĐT         : ${this.customer.phone.padEnd(34)}║`);
    console.log(`║  Địa chỉ     : ${this.customer.address.padEnd(34)}║`);
    console.log(
      `║  Ngày tạo    : ${this.createdAt.toLocaleString("vi-VN").padEnd(34)}║`
    );
    console.log(`║  Trạng thái  : ${this.status.padEnd(34)}║`);
    console.log(`╠${"═".repeat(50)}╣`);
    console.log(`║  ${"Sản phẩm".padEnd(22)}${"SL".padEnd(6)}${"Đơn giá".padEnd(12)}${"Thành tiền".padEnd(10)}║`);
    console.log(`║${line}║`);

    if (this.items.length === 0) {
      console.log(`║  (Đơn hàng chưa có sản phẩm)`.padEnd(51) + `║`);
    } else {
      this.items.forEach((item) => {
        const name = item.product.name.substring(0, 20).padEnd(22);
        const qty = String(item.quantity).padEnd(6);
        const unitPrice = (item.price.toLocaleString("vi-VN") + "đ").padEnd(12);
        const total = (item.getTotal().toLocaleString("vi-VN") + "đ").padEnd(10);
        console.log(`║  ${name}${qty}${unitPrice}${total}║`);
      });
    }

    console.log(`╠${"═".repeat(50)}╣`);
    const totalStr = `TỔNG CỘNG: ${this.calculateTotal().toLocaleString("vi-VN")}đ`;
    console.log(`║  ${totalStr.padEnd(48)}║`);
    console.log(`╚${"═".repeat(50)}╝\n`);
  }
}
