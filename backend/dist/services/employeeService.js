"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection/connection");
const employeeService = {
    getEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
    SELECT
    employees.employee_id,
    employees.employee_firstname,
    employees.employee_lastname,
    employees.employee_birthdate,
    employees.employee_startdate,
    employees.employee_street,
    employees.employee_city,
    employees.employee_zipcode,
    employees.employee_department,
    employees.employee_state,
    departments.department_name,
    states.state_name
    FROM
    (
        (
            employees
        INNER JOIN departments ON employees.employee_department = departments.department_id
        )
    INNER JOIN states ON employees.employee_state = states.state_code
    )`;
            try {
                const [rows] = yield connection_1.connection.promise().query(sql);
                return rows;
            }
            catch (err) {
                return new Error('Error in employeeService');
            }
        });
    },
    createEmployee(serviceData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(serviceData);
            const sql = `INSERT INTO employees 
                 SET ?`;
            const employee = {
                employee_id: null,
                employee_firstname: serviceData.firstname,
                employee_lastname: serviceData.lastname,
                employee_birthdate: serviceData.birthdate,
                employee_startdate: serviceData.startdate,
                employee_department: serviceData.department,
                employee_street: serviceData.street,
                employee_city: serviceData.city,
                employee_state: serviceData.state,
                employee_zipcode: serviceData.zipcode
            };
            const hasEmptyValues = Object.values(serviceData).some(value => value === '');
            if (hasEmptyValues)
                throw new Error('missing values');
            console.log(employee);
            try {
                const response = yield connection_1.connection.promise().query(sql, employee);
                console.log('employee created in DB');
                return response;
            }
            catch (err) {
                throw new Error('Error in employeeService');
            }
        });
    }
};
exports.default = employeeService;
