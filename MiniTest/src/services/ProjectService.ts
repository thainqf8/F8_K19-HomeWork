import { randomUUID } from "crypto";
import { Project } from "../models/Project";
import { EmployeeService } from "./EmployeeService";

export class ProjectService {
  private projects: Project[] = [];
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  create(project: Omit<Project, "id">): Project {
    const newProject: Project = {
      id: randomUUID(),
      ...project,
    };
    this.projects.push(newProject);

    const employee = this.employeeService.findById(project.employeeId);
    if (employee) {
      employee.receiveNoti("Bạn vừa được gán vào dự án mới.");
    }

    return newProject;
  }

  updateById(id: string, data: Partial<Project>): Project | null {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const hasEmployeeChange =
      data.employeeId !== undefined &&
      data.employeeId !== this.projects[index].employeeId;

    this.projects[index] = { ...this.projects[index], ...data, id };

    if (hasEmployeeChange && data.employeeId) {
      const newEmployee = this.employeeService.findById(data.employeeId);
      if (newEmployee) {
        newEmployee.receiveNoti("Bạn đã được chuyển giao phụ trách dự án này.");
      }
    }

    return this.projects[index];
  }
}
