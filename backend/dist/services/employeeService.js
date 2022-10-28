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
            const sql = `SELECT
                employees.id,
                employees.firstname,
                employees.lastname,
                employees.birthdate,
                employees.startdate,
                employees.street,
                employees.city,
                employees.zipcode,
                employees.department_id,
                employees.state_id,
                departments.department_name,
                states.state
                FROM ((employees
                INNER JOIN departments
                ON employees.department_id = departments.id)
                INNER JOIN states
                ON employees.state_id = states.id)`;
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
            const sql = `INSERT INTO employees 
                 SET ?`;
            const employee = {
                id: null,
                firstname: serviceData.firstname,
                lastname: serviceData.lastname,
                birthdate: serviceData.birthdate,
                startdate: serviceData.startdate,
                department_id: serviceData.department_id,
                street: serviceData.street,
                city: serviceData.city,
                state_id: serviceData.state_id,
                zipcode: serviceData.zipcode
            };
            console.log(employee);
            try {
                const response = yield connection_1.connection.promise().query(sql, employee);
                return response;
            }
            catch (err) {
                return new Error('Error in employeeService');
            }
        });
    }
};
exports.default = employeeService;
