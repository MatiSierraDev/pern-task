const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')
const taskRoutes = require('./routes/task.routes')
const errorNotFound = require('./middleware/error_not_found')
const handligErrors = require('./middleware/handlig-errors')
const path  = require('path')

const app = express()
const port = process.env.PORT || 5000

app.use(express.static(pathth.join(__dirname, 'dist')));

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use(taskRoutes)

app.get('/*', function(req,res) {
		res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
//middleware 404 not found route
app.use(errorNotFound)

//middleware handling errors
app.use(handligErrors)

app.listen( port, () => {
  console.log(colors.bgCyan('server listening'))
})
