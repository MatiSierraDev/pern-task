import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';


const TaskList = () => {

  const [task, setTask] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const loadTask = async () => {
    setLoading(true)  
    const url = `http://localhost:8000`
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
  
    const res = await fetch(url, options)
    const data = await  res.json()
    console.log(data)
    setTask(data)
    // console.log('data', task)
    setLoading(false)
  }

  const deleteTask = async(id) => {

    setLoading(true)  
    
    const url= `http://localhost:8000/task/${id}`
    const options = {
      method: 'DELETE',
    }
    
    let res = await fetch(url, options)
    // res.json()
    console.log(res)

    const deleteTaskUpdate = task.filter(el => el.id !== id)
    // console.log(deleteTaskUpdate)
    setTask(deleteTaskUpdate)
    setLoading(false)
  }
  
  useEffect(() => {
    loadTask()
  }, []); 

  return (
    <>
      <Typography variant="h4" color="white" marginTop={5} marginBottom={3}>Tasklist</Typography>
      {!task.length && <Typography variant='h5' color='white'>No hay tareas</Typography>}
      {loading 
        ? <Spinner />
        : task.map((el) =>(
            <Card
              key={el.id} 
              sx={{
              mt:5,
              backgroundColor:'#1e1e1e', 
              marginTop:'1rem',
              color: '#f3f3f3'
            }}
            >
              <CardContent
                style={{
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <Stack>
                  <Typography variant="h6" component="h6" color="#f3f3f3">{el.title}</Typography>
                  <Typography component="p" variant='p' padding="0.5rem" fontStyle="italic" >{el.description}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate(`/task/${el.id}/edit`)}
                    endIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <Button 
                    size="small"
                    variant="outlined"
                    color="error"
                    endIcon={<DeleteIcon />}
                    onClick={() => deleteTask(el.id)}
                  >
                    Eliminar
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))
        }
    </>
  );
};

export default TaskList