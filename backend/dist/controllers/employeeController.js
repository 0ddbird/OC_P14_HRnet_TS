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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employeeService_1 = __importDefault(require("../services/employeeService"));
const employeeController = {
    getEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {};
            try {
                const serviceResponse = yield employeeService_1.default.getEmployees();
                response.status = 200;
                response.message = 'Successfully got employees';
                response.body = serviceResponse;
            }
            catch (error) {
                console.error('Error in employeeController', error);
                response.status = 400;
                response.message = error.message;
            }
            return res.status(response.status).send(response);
        });
    },
    createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {};
            const serviceResponse = yield employeeService_1.default.createEmployee(req.body);
            try {
                response.status = 200;
                response.message = 'Successfully created employee';
                response.body = serviceResponse;
            }
            catch (error) {
                console.error('Error in employeeController', error);
                response.status = 400;
                response.message = error.message;
            }
            return res.status(response.status).send(response);
        });
    }
};
exports.default = employeeController;
