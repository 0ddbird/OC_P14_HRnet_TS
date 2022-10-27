"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.connection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const connection = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hrnet'
});
exports.connection = connection;
function connect() {
    connection.connect((error) => {
        if (error !== null)
            throw error;
    });
}
exports.connect = connect;
