import { Customer } from "../models/Customer";
import { Order, OrderStatus } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { ProductService } from "./ProductService";

export class OrderService {
  orders: Order[] = [];
  private nextOrderId: number = 1;
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  createOrder(customer: Customer): Order {
    const order = new Order(this.nextOrderId++, customer);
    this.orders.push(order);
    console.log(
      `✅ Đã tạo đơn hàng #${order.id} cho khách hàng: ${customer.name}`
    );
    return order;
  }

  addProduct(orderId: number, productId: number, quantity: number): void {
    const order = this.findOrder(orderId);
    if (!order) {
      throw new Error(`Không tìm thấy đơn hàng #${orderId}`);
    }
    if (order.status !== OrderStatus.NEW) {
      throw new Error(
        `Đơn hàng #${orderId} đang ở trạng thái "${order.status}", không thể thêm sản phẩm`
      );
    }

    const product = this.productService.findById(productId);
    if (!product) {
      throw new Error(`Không tìm thấy sản phẩm với ID ${productId}`);
    }
    if (product.stock < quantity) {
      throw new Error(
        `Không đủ hàng. Tồn kho hiện tại: ${product.stock}, yêu cầu: ${quantity}`
      );
    }

    const item = new OrderItem(product, quantity);
    order.addItem(item);
  }

  removeProduct(orderId: number, productId: number): void {
    const order = this.findOrder(orderId);
    if (!order) {
      throw new Error(`Không tìm thấy đơn hàng #${orderId}`);
    }
    if (order.status !== OrderStatus.NEW) {
      throw new Error(
        `Đơn hàng #${orderId} đang ở trạng thái "${order.status}", không thể xoá sản phẩm`
      );
    }
    order.removeItem(productId);
  }

  checkout(orderId: number): void {
    const order = this.findOrder(orderId);
    if (!order) {
      throw new Error(`Không tìm thấy đơn hàng #${orderId}`);
    }
    if (order.status !== OrderStatus.NEW) {
      throw new Error(
        `Đơn hàng #${orderId} đang ở trạng thái "${order.status}", không thể thanh toán`
      );
    }
    if (order.items.length === 0) {
      throw new Error(`Đơn hàng #${orderId} chưa có sản phẩm nào`);
    }

    // Trừ tồn kho khi thanh toán
    for (const item of order.items) {
      item.product.decreaseStock(item.quantity);
    }

    order.status = OrderStatus.PAID;
    console.log(
      `✅ Đơn hàng #${orderId} đã được thanh toán thành công! Tổng tiền: ${order.calculateTotal().toLocaleString("vi-VN")}đ`
    );
    order.printInvoice();
  }

  cancelOrder(orderId: number): void {
    const order = this.findOrder(orderId);
    if (!order) {
      throw new Error(`Không tìm thấy đơn hàng #${orderId}`);
    }
    if (order.status === OrderStatus.PAID) {
      throw new Error(
        `Đơn hàng #${orderId} đã thanh toán, không thể huỷ`
      );
    }
    if (order.status === OrderStatus.CANCELLED) {
      throw new Error(`Đơn hàng #${orderId} đã bị huỷ trước đó`);
    }
    order.status = OrderStatus.CANCELLED;
    console.log(`✅ Đơn hàng #${orderId} đã bị huỷ`);
  }

  findOrder(orderId: number): Order | undefined {
    return this.orders.find((o) => o.id === orderId);
  }

  getOrders(): Order[] {
    return [...this.orders];
  }

  printOrders(): void {
    if (this.orders.length === 0) {
      console.log("🛒 Chưa có đơn hàng nào.");
      return;
    }
    console.log("========== DANH SÁCH ĐƠN HÀNG ==========");
    this.orders.forEach((order) => {
      console.log(
        `  Đơn #${order.id} | KH: ${order.customer.name} | Tổng: ${order.calculateTotal().toLocaleString("vi-VN")}đ | Trạng thái: ${order.status} | Ngày: ${order.createdAt.toLocaleDateString("vi-VN")}`
      );
    });
    console.log("=========================================");
  }
}
