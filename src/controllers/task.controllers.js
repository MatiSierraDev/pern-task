const { request, response } = require('express')
const pool = require('../db')

const getAllTasks = async (req = request, res = response, next) => {
  try {
    const query = `
      SELECT * FROM task 
      WHERE state = true`

    const allTasks = await pool.query(query)

    res.status(202).json(allTasks.rows)
  } catch (error) {
    next(error)
  }
}

const getTask = (req = request, res = response, next) => {
  
  const{id} = req.params

  const queryText = `
      SELECT * FROM task 
      WHERE id = $1`
      
  pool.query(queryText, [id])
    .then(task => {
      // console.log(task.rowCount)
      if(task.rowCount === 0 || task.rows[0].state === false){

        res.status(400)
        throw new Error('No existe el id')

      }else{
        res.status(202).json(task.rows[0]) 
      }
    })
    .catch(error => {
      next(error)
    })
}

const createTask = async (req, res = response, next) => {
  try {
    const { title, description } = req.body

    const queryText ='INSERT INTO task (title, description) VALUES($1, $2) RETURNING *'
    
    const queryValues = [title, description]

    const result = await pool.query(queryText, queryValues)

    // eslint-disable-next-line no-unused-vars
    const { id , ...resto } = result.rows[0]

    res.status(200).json({
      result: resto,
    })
  } catch (error) {
    next(error)
  }
}

const updateTask = (req = request, res = response, next) => {

  const {id} = req.params

  const {title, description} = req.body

  const queryText = `
      UPDATE task 
      SET title = $1, description = $2
      WHERE id = $3
      RETURNING *`
      
  const values  = [title, description, id]

  pool.query(queryText, values)
    .then((data)=>{
      // console.log(data.rows)
      if(data.rows.length === 0){
        console.log(data.rowCount.length)
        return res.status(404).json({
          message: 'Task not found'
        })
      
      } else{
        res.status(204).end()
      }
      
    }).catch(err => {
      next(err)
    })
}

const deleteTask = async (req = request, res = response, next) => {

  try {
    const { id } = req.params

    const queryText = `
      UPDATE task 
      SET state = $1 
      WHERE id = $2 RETURNING *`
  
    const values = [false, id]
  
    const result = await pool.query(queryText, values)
  
    res.sendStatus(204)
    
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}
