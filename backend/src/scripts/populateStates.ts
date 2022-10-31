import { states } from '../raw_data/data'
import { connection } from '../connection/connection'

states.forEach(state => {
  connection.query(`INSERT INTO states (state_name, state_code) VALUES ('${state.label}', '${state.value}')`)
})
connection.end()
