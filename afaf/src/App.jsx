import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navi from './views/Home/Navi';
import Newest from './views/Threads/Newest/Newest';
import AllThreads from './views/Threads/AllThreads/AllThreads';
import Popular from './views/Threads/Popular/Popular';
import Login from './views/Login/Login';
import Profile from './views/Profile/Profile';
import Register from './views/Register/Register';
import SingleThread from './views/Threads/SingleThread/SingleThread';
import SimpleThread from './views/Threads/SimpleThread/SimpleThread';
import CreateThread from './views/Threads/CreateThread/CreateThread';
 

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Popular navigation={<Navi/>}/>}/>
        <Route path='/newest' element={<Newest navigation={<Navi/>}/>}/>
        <Route path='/all-threads' element={<AllThreads navigation={<Navi/>}/>}/>
        <Route path='/popular' element={<Popular navigation={<Navi/>}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/single-thread/:id' element={<SingleThread/>}/>
        <Route path='/create-thread' element={<CreateThread/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )   
}


export default App
