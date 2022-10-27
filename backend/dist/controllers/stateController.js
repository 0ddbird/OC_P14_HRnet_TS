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
exports.stateController = void 0;
const connection_1 = require("../connection/connection");
exports.stateController = {
    createState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO states SET ?';
            const state = {
                id: null,
                code: req.body.value,
                state: req.body.label
            };
            try {
                const response = yield connection_1.connection.promise().query(sql, state);
                res.send(response);
            }
            catch (err) {
                res.send('Could not add state');
            }
        });
    }
};
