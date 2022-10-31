import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hrnet'
})

function connect (): void {
  connection.connect((error) => {
    if (error !== null) throw error
  })
}

export { connection, connect }
