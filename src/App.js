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

const initialState = {
  name: "",
  email: "",
  contact: "",
  address: "",
}

function App() {
  const[state, setState] = useState(initialState)
  const [data, setData] = useState([])

  const {name, email, contact, address} = state

  useEffect(() => {
    loadUsers()
  }, [])
  
  const loadUsers = async () => {
    const response = await axios.get(api)
    console.log(response)
    setData(response.data)
  }

  return (
    <>
      <ToastContainer />
      <Navbar bg="primary" variant="dark" className='justify-content-center'>
        <Navbar.Brand>
          React app and JSON Server
        </Navbar.Brand>
      </Navbar>

      <Container style={{ marginTop: "70px"}}>
        <Row>
          <Col md={4}>
            <h2>Add Contact</h2>
            <Form>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={name}
                /> 
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                /> 
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact"
                  name="contact"
                  value={contact}
                /> 
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAlign: "left" }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={address}
                /> 
              </Form.Group>

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="primary" size="lg">Submit</Button>
              </div>
            </Form> 
          </Col>
          <Col md={8}>
            <h2>Contacts</h2>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data && data.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.address}</td>
                    <td>
                      <ButtonGroup>
                        <Button style={{marginRight:"5px"}} variant="secondary">
                          Update
                        </Button>
                        <Button variant="danger">
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
              )) }
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
