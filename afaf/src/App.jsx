import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import Newest from './views/Threads/Newest/Newest';
import AllThreads from './views/Threads/AllThreads/AllThreads';
import Popular from './views/Threads/Popular/Popular';
import Login from './views/Login/Login';
import Profile from './views/Profile/Profile';
import Register from './views/Register/Register';
 

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/newest' element={<Home/>}/>
        <Route path='/all-threads' element={<Home/>}/>
        <Route path='/popular' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )   
}


export default App
