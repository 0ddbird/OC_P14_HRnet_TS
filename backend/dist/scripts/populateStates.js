"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../raw_data/data");
const connection_1 = require("../connection/connection");
data_1.states.forEach(state => {
    connection_1.connection.query(`INSERT INTO states (state_name, state_code) VALUES ('${state.label}', '${state.value}')`);
});
connection_1.connection.end();
