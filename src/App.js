import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Detalle from './components/CrudComponent/Detalle';
import NuevoRegistro from './components/CrudComponent/NuevoRegistro';

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<><Home /> </>}></Route>
        <Route path="/Login" element={<><Login /></>}></Route>
        <Route path="/Register" element={<><Register /></>}></Route>
        <Route path="/Detalle" element={<><Detalle /></>}></Route>
        <Route path="/NuevoRegistro" element={<><NuevoRegistro /></>}></Route>
      </Routes>
    </>
  );
}

export default App;
