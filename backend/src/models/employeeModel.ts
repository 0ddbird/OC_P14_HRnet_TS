export class Employee {
  constructor (
    public firstname: string,
    public lastname: string,
    public birthdate: Date,
    public startdate: Date,
    public department_id: number,
    public street: string,
    public city: string,
    public state_id: number,
    public zipcode: string) {}
}
