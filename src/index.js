const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')
const taskRoutes = require('./routes/task.routes')
const errorNotFound = require('./middleware/error_not_found')
const handligErrors = require('./middleware/handlig-errors')

const app = express()
const port = 8000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(taskRoutes)

//middleware 404 not found route
app.use(errorNotFound)

//middleware handling errors
app.use(handligErrors)

app.listen(port, () => {
  console.log(colors.bgCyan(`Listen on port ${port}`|| 5000))
})
