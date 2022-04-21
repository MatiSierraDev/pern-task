const { Pool } = require('pg')

const { db } = require('./config')
const {config} = require('dotenv')
config()

const nodenv = process.env.NODE_ENV
console.log(nodenv)


if (process.env.NODE_ENV ) {

  // Estamos en production
  const pool = new Pool({
    connectionString: `postgres://awexgorckmzcie:b139c009fac0fe75313c3e0aeb6355872fd23f1200adf4411a0c3b3c21ea1855@ec2-52-21-136-176.compute-1.amazonaws.com:5432/dfj95cnjhese0f`,
    ssl: {
      rejectUnauthorized: false
    },
  })

  module.exports = pool

  } else {

  const pool = new Pool({
    user: db.user,
    host: db.host,
    database: db.database,
    password: db.password,
    port: db.port
  })
  
  module.exports = pool

}



