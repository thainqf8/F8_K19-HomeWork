export class Customer {
  id: number;
  name: string;
  phone: string;
  address: string;

  constructor(id: number, name: string, phone: string, address: string) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
  }

  updatePhone(phone: string): void {
    this.phone = phone;
    console.log(`Đã cập nhật số điện thoại của ${this.name}: ${phone}`);
  }

  updateAddress(address: string): void {
    this.address = address;
    console.log(`Đã cập nhật địa chỉ của ${this.name}: ${address}`);
  }

  toString(): string {
    return `[Customer] ID: ${this.id} | Tên: ${this.name} | SĐT: ${this.phone} | Địa chỉ: ${this.address}`;
  }
}
