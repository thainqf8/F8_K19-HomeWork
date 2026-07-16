export class Employee {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  receiveNoti(message: string): void {
    console.log(`${this.id} - ${this.name} received notification: ${message}`);
  }
}
