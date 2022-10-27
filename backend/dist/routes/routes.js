"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = __importDefault(require("../controllers/employeeController"));
const stateController_1 = require("../controllers/stateController");
const router = express_1.default.Router();
router.get('/get-employees', employeeController_1.default.getEmployees);
router.post('/create-employee', employeeController_1.default.createEmployee);
router.post('/create-state', stateController_1.stateController.createState);
exports.default = router;
