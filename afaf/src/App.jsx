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
import Authenticated from './hoc/Authenticated/Authenticated';
 
function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Authenticated><Popular navigation={<Navi/>}/></Authenticated>}/>
        <Route path='/newest' element={<Authenticated><Newest navigation={<Navi/>}/></Authenticated>}/>
        <Route path='/all-threads' element={<Authenticated><AllThreads navigation={<Navi/>}/></Authenticated>}/>
        <Route path='/popular' element={<Authenticated><Popular navigation={<Navi/>}/></Authenticated>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Authenticated><Profile/></Authenticated>}/>
        <Route path='/single-thread/:id' element={<Authenticated><SingleThread/></Authenticated>}/>
        <Route path='/create-thread' element={<Authenticated><CreateThread/></Authenticated>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )   
}


export default App
