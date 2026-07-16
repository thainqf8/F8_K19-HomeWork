import { test, expect } from "@playwright/test";
import { CustomerService } from "../src/services/CustomerService";
import { EmployeeService } from "../src/services/EmployeeService";
import { ProjectService } from "../src/services/ProjectService";

let customerService: CustomerService;
let employeeService: EmployeeService;
let projectService: ProjectService;

test.beforeEach(() => {
  customerService = new CustomerService();
  employeeService = new EmployeeService();
  projectService = new ProjectService(employeeService);
});

test("TC1: Tạo Customer thành công và có id", () => {
  const customer = customerService.create({
    name: "Nguyễn Văn A",
    tax: "0123456789",
    address: "123 Lê Lợi, TP.HCM",
  });

  expect(customer.id).toBeTruthy();
  expect(typeof customer.id).toBe("string");
  expect(customer.name).toBe("Nguyễn Văn A");
  expect(customer.tax).toBe("0123456789");
  expect(customer.address).toBe("123 Lê Lợi, TP.HCM");
});

test("TC2: Cập nhật địa chỉ Customer", () => {
  const customer = customerService.create({
    name: "Nguyễn Văn A",
    tax: "0123456789",
    address: "123 Lê Lợi, TP.HCM",
  });

  const updated = customerService.updateById(customer.id, {
    address: "456 Nguyễn Huệ, TP.HCM",
  });

  expect(updated).not.toBeNull();
  expect(updated?.address).toBe("456 Nguyễn Huệ, TP.HCM");
  expect(updated?.name).toBe("Nguyễn Văn A");
});

test("TC3: Tạo 2 Employee có id khác nhau", () => {
  const emp1 = employeeService.create({ name: "Trần Thị B" });
  const emp2 = employeeService.create({ name: "Lê Văn C" });

  expect(emp1.id).toBeTruthy();
  expect(emp2.id).toBeTruthy();
  expect(emp1.id).not.toBe(emp2.id);
});

test("TC4: Tìm Employee theo id", () => {
  const emp = employeeService.create({ name: "Trần Thị B" });

  const found = employeeService.findById(emp.id);
  expect(found).not.toBeNull();
  expect(found?.id).toBe(emp.id);
  expect(found?.name).toBe("Trần Thị B");

  const notFound = employeeService.findById("id-khong-ton-tai");
  expect(notFound).toBeNull();
});

test("TC5: Tạo Project và Employee nhận thông báo", () => {
  const customer = customerService.create({
    name: "Nguyễn Văn A",
    tax: "0123456789",
    address: "123 Lê Lợi, TP.HCM",
  });
  const emp = employeeService.create({ name: "Trần Thị B" });

  const messages: string[] = [];
  emp.receiveNoti = (msg: string) => messages.push(msg);

  const project = projectService.create({
    customerId: customer.id,
    employeeId: emp.id,
  });

  expect(project.id).toBeTruthy();
  expect(project.customerId).toBe(customer.id);
  expect(project.employeeId).toBe(emp.id);
  expect(messages).toHaveLength(1);
  expect(messages[0]).toBe("Bạn vừa được gán vào dự án mới.");
});

test("TC6: Đổi nhân viên phụ trách Project", () => {
  const customer = customerService.create({
    name: "Nguyễn Văn A",
    tax: "0123456789",
    address: "123 Lê Lợi, TP.HCM",
  });
  const emp1 = employeeService.create({ name: "Trần Thị B" });
  const emp2 = employeeService.create({ name: "Lê Văn C" });

  const project = projectService.create({
    customerId: customer.id,
    employeeId: emp1.id,
  });

  const messages: string[] = [];
  emp2.receiveNoti = (msg: string) => messages.push(msg);

  const updated = projectService.updateById(project.id, {
    employeeId: emp2.id,
  });

  expect(updated).not.toBeNull();
  expect(updated?.employeeId).toBe(emp2.id);
  expect(messages).toHaveLength(1);
  expect(messages[0]).toBe("Bạn đã được chuyển giao phụ trách dự án này.");
});

test("TC7: Cập nhật Project nhưng không đổi Employee thì không gọi receiveNoti", () => {
  const customer = customerService.create({
    name: "Nguyễn Văn A",
    tax: "0123456789",
    address: "123 Lê Lợi, TP.HCM",
  });
  const emp = employeeService.create({ name: "Trần Thị B" });

  const project = projectService.create({
    customerId: customer.id,
    employeeId: emp.id,
  });

  const messages: string[] = [];
  emp.receiveNoti = (msg: string) => messages.push(msg);

  const updated = projectService.updateById(project.id, {
    customerId: customer.id,
  });

  expect(updated).not.toBeNull();
  expect(messages).toHaveLength(0);
});

test("TC8: updateById với id không tồn tại trả về null", () => {
  const fakeId = "00000000-0000-0000-0000-000000000000";

  expect(customerService.updateById(fakeId, { name: "Ghost" })).toBeNull();
  expect(employeeService.updateById(fakeId, { name: "Ghost" })).toBeNull();
  expect(projectService.updateById(fakeId, { customerId: "x" })).toBeNull();
});

test("TC9: Tạo Project với employeeId không tồn tại vẫn thành công", () => {
  const customer = customerService.create({
    name: "Nguyễn Văn A",
    tax: "0123456789",
    address: "123 Lê Lợi, TP.HCM",
  });

  const fakeEmployeeId = "employee-id-khong-ton-tai";

  let notified = false;
  const project = projectService.create({
    customerId: customer.id,
    employeeId: fakeEmployeeId,
  });

  expect(project.id).toBeTruthy();
  expect(project.employeeId).toBe(fakeEmployeeId);
  expect(notified).toBe(false);
});
