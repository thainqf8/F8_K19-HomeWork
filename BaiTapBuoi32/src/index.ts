import { Product } from "./models/Product";
import { ProductService } from "./services/ProductService";
import { Customer } from "./models/Customer";
import { CustomerService } from "./services/CustomerService";
import { OrderService } from "./services/OrderService";

// ==========================================
//  KHỞI TẠO CÁC SERVICE
// ==========================================
const productService = new ProductService();
const customerService = new CustomerService();
const orderService = new OrderService(productService);

// ==========================================
//  1. THÊM SẢN PHẨM
// ==========================================
console.log("\n🔷 === QUẢN LÝ SẢN PHẨM ===");

const p1 = new Product(1, "Laptop Dell XPS 15", 35_000_000, 10);
const p2 = new Product(2, "Chuột Logitech MX Master", 1_500_000, 50);
const p3 = new Product(3, "Bàn phím Keychron K2", 2_200_000, 30);
const p4 = new Product(4, "Màn hình LG 27 inch", 8_500_000, 15);

productService.addProduct(p1);
productService.addProduct(p2);
productService.addProduct(p3);
productService.addProduct(p4);

productService.printProducts();

// Cập nhật sản phẩm
productService.updateProduct(2, { price: 1_600_000 });

// Tìm kiếm sản phẩm theo tên
console.log("\n🔍 Tìm kiếm sản phẩm có từ khoá 'Keychron':");
const found = productService.findByName("Keychron");
found.forEach((p) => console.log(p.toString()));

// ==========================================
//  2. QUẢN LÝ KHÁCH HÀNG
// ==========================================
console.log("\n🔷 === QUẢN LÝ KHÁCH HÀNG ===");

const c1 = new Customer(1, "Nguyễn Văn An", "0901234567", "123 Lê Lợi, Q1, TP.HCM");
const c2 = new Customer(2, "Trần Thị Bình", "0912345678", "456 Trần Hưng Đạo, Q5, TP.HCM");

customerService.addCustomer(c1);
customerService.addCustomer(c2);

customerService.printCustomers();

// Cập nhật thông tin khách hàng
c1.updatePhone("0909999888");
c2.updateAddress("789 Nguyễn Huệ, Q1, TP.HCM");

// Tìm khách hàng theo SĐT
console.log("\n🔍 Tìm khách hàng theo SĐT '0909999888':");
const foundCustomer = customerService.findByPhone("0909999888");
if (foundCustomer) console.log(foundCustomer.toString());

// ==========================================
//  3. ĐẶT HÀNG - LUỒNG THÔNG THƯỜNG
// ==========================================
console.log("\n🔷 === ĐẶT HÀNG - THANH TOÁN THÀNH CÔNG ===");

// Tạo đơn hàng cho khách hàng 1
const order1 = orderService.createOrder(c1);
orderService.addProduct(order1.id, 1, 1); // Laptop x1
orderService.addProduct(order1.id, 2, 2); // Chuột x2
orderService.addProduct(order1.id, 3, 1); // Bàn phím x1

// In hoá đơn trước thanh toán
console.log("\n📋 Xem trước đơn hàng:");
order1.printInvoice();

// Thanh toán
orderService.checkout(order1.id);

// ==========================================
//  4. ĐẶT HÀNG - HUỶ ĐƠN
// ==========================================
console.log("\n🔷 === ĐẶT HÀNG - HUỶ ĐƠN ===");

const order2 = orderService.createOrder(c2);
orderService.addProduct(order2.id, 4, 1); // Màn hình x1
orderService.addProduct(order2.id, 2, 1); // Chuột x1

// Xoá sản phẩm khỏi đơn
orderService.removeProduct(order2.id, 2);

// Huỷ đơn hàng
orderService.cancelOrder(order2.id);

// ==========================================
//  5. IN DANH SÁCH TẤT CẢ ĐƠN HÀNG
// ==========================================
console.log("\n🔷 === DANH SÁCH TẤT CẢ ĐƠN HÀNG ===");
orderService.printOrders();

// ==========================================
//  6. KIỂM TRA TỒN KHO SAU KHI ĐẶT HÀNG
// ==========================================
console.log("\n🔷 === TỒN KHO SAU KHI ĐẶT HÀNG ===");
productService.printProducts();

// ==========================================
//  7. XỬ LÝ LỖI
// ==========================================
console.log("\n🔷 === KIỂM TRA XỬ LÝ LỖI ===");

try {
  // Thử thanh toán đơn đã huỷ
  orderService.checkout(order2.id);
} catch (err) {
  console.error("❌ Lỗi:", (err as Error).message);
}

try {
  // Thử thêm số lượng vượt tồn kho
  const order3 = orderService.createOrder(c1);
  orderService.addProduct(order3.id, 1, 999); // Laptop x999 (chỉ còn 9)
} catch (err) {
  console.error("❌ Lỗi:", (err as Error).message);
}

try {
  // Thử xoá sản phẩm không tồn tại
  order1.removeItem(999);
} catch (err) {
  console.error("❌ Lỗi:", (err as Error).message);
}

console.log("\n✅ Hoàn tất demo hệ thống đặt hàng!");
