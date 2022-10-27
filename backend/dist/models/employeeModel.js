"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(firstname, lastname, birthdate, startdate, department_id, street, city, state_id, zipcode) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.startdate = startdate;
        this.department_id = department_id;
        this.street = street;
        this.city = city;
        this.state_id = state_id;
        this.zipcode = zipcode;
    }
}
exports.Employee = Employee;
