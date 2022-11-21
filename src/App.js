import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Crud from './components/CrudComponent/Crud';

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<><Home /> </>}></Route>
        <Route path="/Login" element={<><Login /></>}></Route>
        <Route path="/Register" element={<><Register /></>}></Route>
        <Route path="/Crud" element={<><Crud /></>}></Route>
      </Routes>
    </>
  );
}

export default App;
