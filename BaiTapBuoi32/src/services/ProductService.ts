import { Product } from "../models/Product";

export class ProductService {
  products: Product[] = [];

  addProduct(product: Product): void {
    const exists = this.products.find((p) => p.id === product.id);
    if (exists) {
      throw new Error(`Sản phẩm với ID ${product.id} đã tồn tại`);
    }
    this.products.push(product);
    console.log(`✅ Đã thêm sản phẩm: ${product.name}`);
  }

  updateProduct(id: number, data: Partial<Omit<Product, "id">>): void {
    const product = this.findById(id);
    if (!product) {
      throw new Error(`Không tìm thấy sản phẩm với ID ${id}`);
    }
    if (data.name !== undefined) product.name = data.name;
    if (data.price !== undefined) product.price = data.price;
    if (data.stock !== undefined) product.stock = data.stock;
    console.log(`✅ Đã cập nhật sản phẩm ID ${id}`);
  }

  deleteProduct(id: number): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy sản phẩm với ID ${id}`);
    }
    const removed = this.products.splice(index, 1)[0];
    console.log(`✅ Đã xoá sản phẩm: ${removed.name}`);
  }

  findById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  findByName(keyword: string): Product[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(lowerKeyword)
    );
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  printProducts(): void {
    if (this.products.length === 0) {
      console.log("📦 Danh sách sản phẩm trống.");
      return;
    }
    console.log("========== DANH SÁCH SẢN PHẨM ==========");
    this.products.forEach((p) => console.log(p.toString()));
    console.log("=========================================");
  }
}
