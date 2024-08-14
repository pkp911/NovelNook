
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Books from "./pages/Books";
import AddBooks from "./pages/AddBooks";
import Search from './pages/Search';
import Footer from './components/Footer';

// import toast, { Toaster } from 'react-hot-toast';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useEffect } from 'react';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route  path="/books" element={<Books/>}/>
        <Route  path="/addBooks" element={<AddBooks/>}/>
        <Route  path="/search" element={<Search/>}/>
      </Routes>
      <Footer>

      </Footer>
    </Router>
   
  );
}

export default App;
