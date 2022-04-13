import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import Container from '@mui/material/Container';

import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList.jsx'
import My404Component from './components/My404Component.jsx'
import NavBar from './components/NavBar';

function App() {
  return(
    <BrowserRouter>
        <NavBar/ >
      <Container>
        <Routes>
          <Route index element={<TaskList />}/>
          <Route path='/home' element={<TaskList />}/>
          <Route path='task/new' element={<TaskForm />}/>
          <Route path='task/:id/edit' element={<TaskForm />}/>
          <Route path='*' element={<My404Component/>} />
          {/* Edit route */}
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
