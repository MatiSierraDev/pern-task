import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom';
import Alert from "@reach/alert";


const TaskForm = () => {
  const paramsId = useParams()
  console.log(paramsId)
  const [form, setForm] = useState({
    title: '',
    description: '',
  })
  
  
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [update, setUpdate] = useState(false)
  const [message, setMessage] = useState({})

  const navigate = useNavigate()
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    if(update){
      console.log('update')
      try{
        
        // const URL = import.meta.env.VITE_BASE_URl ? `${import.meta.env.VITE_BASE_URL}/task/${paramsId.id}` : `http://localhost:8000/task/${paramsId.id}`

        let URL;

        if(import.meta.env.VITE_BASE_URL){
          URL= `${import.meta.env.VITE_BASE_URL}/task/${paramsId.id}`
          console.log('proces true')
        }else{
          URL= `http://localhost:8000/task/${paramsId.id}`
          console.log('proces false')
        }

        const res = await fetch(URL, {
          method:'PUT',
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify(form),
        })

      if(!res.ok){
        setAlert(true)
        throw {message: `${res.status}: No existe el id`}
      }
        setLoading(false)
        navigate('/home')
        
      }catch(error){
        console.log(error)
      }

      setUpdate(false)
    }
    else{
      try{
        e.preventDefault()
        
        // setMessage({})
        setLoading(true)
    
    
        const URL =  import.meta.env.VITE_BASE_URL ? `${import.meta.env.VITE_BASE_URL}/task` : `http://localhost:8000/task`
        const options = {
          method: 'POST',
          headers:{
            'Content-type':'application/json'
          },
          body: JSON.stringify(form),
        }
        
        let res = await fetch(URL, options)
        
        if(!res.ok){
          setAlert(true)
          throw {message: `${res.status}: ya existe el titulo`}
        }
        
        let data = await res.json()

        navigate('/home')
        
      }catch(error){
        console.log(error)
        setLoading(false)
        setMessage(error)
      }
    }
  }
  
  const handleChange = (e) => {
    e.preventDefault()
    
    let {name, value} = e.target
    // console.log(name, value)

    setForm({
      ...form,
      [name] : value
    })

    setAlert(false)
    
  }

  const getTask = async(id) => {
    try{

      const url = import.meta.env.VITE_BASE_URl ? `${import.meta.env.VITE_BASE_URL}/task/${id}` : `https://pern-task.herokuapp.com/task/${id}`
      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }
  
      const res = await fetch(url, options)
      const data = await res.json()
  
      console.log(res)
      console.log(data.title, data.description)
  
      setForm({
        title: data.title,
        description: data.description,
      })
      
      if(!res.ok){
        setAlert(true)
        throw {message: `${res.status}: No existe el id`}
      }

      setUpdate(true)
    
    }catch(err){
      console.log(err.message)
      setMessage(err)
      console.log(message)
    }
  }

  //Si llegan parametros quiere decir que estoy
  useEffect(() => {
    // console.log(paramsId)
    if(paramsId.id){
      getTask(paramsId.id)
    }
    return () => {
    }
  }, [paramsId.id])
  

  return (
    <Grid
      container 
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={3}>
      
        <Card sx={{mt:5, padding:'1rem'}}>
          {update ? <Typography> Edit Task</Typography> : <Typography> Create Task</Typography>}
          
          {!loading 
          ? <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField 
                sx={{display:"block", m: '.5rem 0' }}
                id="filled-basic"
                name='title'
                label="Title"
                variant="filled"
                value={form.title || ''}
                onChange={handleChange}
              />
              <TextField 
                sx={{display:"block", m: '.5rem 0' }}
                id="filled-basic"
                name='description'
                label="Description"
                variant="filled"
                value={form.description || ''}
                onChange={handleChange}
              />

              
              <Button 
                sx={{
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  m: '.5rem 0',
                  width:'100%' 
                }} 
                variant='outlined'
                size='small'
                type='submit'
                endIcon={<SendRoundedIcon />}
                disabled={(!form.title || !form.description) ? true : false}
              >
                {update ? 'Edit' : 'Create'}
              </Button>
            </form>
          </CardContent>
          : <Spinner/>
          }
      {alert && 
      
        <Alert
          style={{
            background: "hsla(10, 50%, 50%, .10)",
            padding: "10px",
            color:"red"
          }}
          >
            {message.message}
        </Alert>
      
      }
        </Card>

      </Grid>
    </Grid>
  )
}

export default TaskForm