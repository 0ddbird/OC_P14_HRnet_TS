"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(firstname, lastname, birthdate, startdate, department, street, city, state, zipcode) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.startdate = startdate;
        this.department = department;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }
}
exports.Employee = Employee;
