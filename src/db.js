const { Pool } = require('pg')

//PASAR A PRODUCCION PENSAR COMO HACERLO.


// const { db } = require('./config')
// const {config} = require('dotenv')
// config()


// const nodenv = process.env.NODE_ENV
// console.log(nodenv)
// if (process.env.NODE_ENV === "development") {
//     Estamos en modo desarrollo
//     console.log("Modo desarrollo");
//   } else {
//     En producción
//     console.log(procces.env.NODE_ENV);
//     console.log("Modo producción");
// }

const pool = new Pool({
  connectionString: `postgres://awexgorckmzcie:b139c009fac0fe75313c3e0aeb6355872fd23f1200adf4411a0c3b3c21ea1855@ec2-52-21-136-176.compute-1.amazonaws.com:5432/dfj95cnjhese0f`,
  ssl: {
    rejectUnauthorized: false
  },
})

module.exports = pool
