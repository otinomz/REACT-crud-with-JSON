import React, { useState, useEffect } from 'react';
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  Navbar
} from "react-bootstrap"
import axios from "axios"
import { toast , ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './App.css';

const api = "http://localhost:5000/users"

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar bg="primary" variant="dark" className='justify-content-center'>

        <Navbar.Brand>
          React app and JSON Server
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default App;
