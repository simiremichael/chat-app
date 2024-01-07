import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../src/pages/HomePage'
import Chat from '../src/pages/Chat'

function App() {

  return (
    <>
        <Routes>
   <Route path='/' element={<HomePage />}></Route>
   <Route path='/chat' element={<Chat />}></Route>
    </Routes>
    </>
  )
}

export default App
