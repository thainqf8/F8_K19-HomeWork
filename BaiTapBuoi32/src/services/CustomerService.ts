import { Customer } from "../models/Customer";

export class CustomerService {
  customers: Customer[] = [];

  addCustomer(customer: Customer): void {
    const exists = this.customers.find((c) => c.id === customer.id);
    if (exists) {
      throw new Error(`Khách hàng với ID ${customer.id} đã tồn tại`);
    }
    this.customers.push(customer);
    console.log(`✅ Đã thêm khách hàng: ${customer.name}`);
  }

  updateCustomer(id: number, data: Partial<Omit<Customer, "id">>): void {
    const customer = this.findById(id);
    if (!customer) {
      throw new Error(`Không tìm thấy khách hàng với ID ${id}`);
    }
    if (data.name !== undefined) customer.name = data.name;
    if (data.phone !== undefined) customer.phone = data.phone;
    if (data.address !== undefined) customer.address = data.address;
    console.log(`✅ Đã cập nhật khách hàng ID ${id}`);
  }

  deleteCustomer(id: number): void {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy khách hàng với ID ${id}`);
    }
    const removed = this.customers.splice(index, 1)[0];
    console.log(`✅ Đã xoá khách hàng: ${removed.name}`);
  }

  findById(id: number): Customer | undefined {
    return this.customers.find((c) => c.id === id);
  }

  findByPhone(phone: string): Customer | undefined {
    return this.customers.find((c) => c.phone === phone);
  }

  getAllCustomers(): Customer[] {
    return [...this.customers];
  }

  printCustomers(): void {
    if (this.customers.length === 0) {
      console.log("👥 Danh sách khách hàng trống.");
      return;
    }
    console.log("========== DANH SÁCH KHÁCH HÀNG ==========");
    this.customers.forEach((c) => console.log(c.toString()));
    console.log("==========================================");
  }
}
