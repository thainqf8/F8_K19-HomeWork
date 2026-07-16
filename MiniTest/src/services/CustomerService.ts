import { randomUUID } from "crypto";
import { Customer } from "../models/Customer";

export class CustomerService {
  private customers: Customer[] = [];

  create(customer: Omit<Customer, "id">): Customer {
    const newCustomer: Customer = {
      id: randomUUID(),
      ...customer,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  updateById(id: string, data: Partial<Customer>): Customer | null {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) return null;

    this.customers[index] = { ...this.customers[index], ...data, id };
    return this.customers[index];
  }
}
