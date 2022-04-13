const { Router } = require('express')
const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require('../controllers/task.controllers')

const router = Router()

router.get('/', getAllTasks)

router.get('/task/:id', getTask)

router.post('/task', createTask)

router.delete('/task/:id', deleteTask)

router.put('/task/:id', updateTask)

module.exports = router

// const pool = require('../db')
// router.get('/', async(req, res) => {
//   const result = await pool.query('SELECT NOW()')
//   res.send('Return list of tasks!')
//   console.log(result);
//   res.json(result.rows[0].now)
// })

// router.put('/task/:id', async(req, res = response) => {
//   const parametros = req.params;
//   const task  = await req.body;
//   res.status('201').json({
//     parametros,
//     task
//   })
// })
