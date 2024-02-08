import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import Newest from './views/Threads/Newest/Newest';
import AllThreads from './views/Threads/AllThreads/AllThreads';
import Popular from './views/Threads/Popular/Popular';
 

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/newest' element={<Newest/>}/>
        <Route path='/all-threads' element={<AllThreads/>}/>
        <Route path='/popular' element={<Popular/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )   
}

export default App
