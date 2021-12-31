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

  const handleSubmit = (e) => {
    // prevent the default behaviour of forms reloading
    e.preventDefault()
    // check to see if the input field is empty
    if (!name || !address || !email || !contact) {
      toast.error("Please fill all input field")
    } else {
      axios.post(api, state)
      toast.success("Added successfully")
      // set the current state back to empty after
      // updating hitting the submit button
      setState(initialState)

      // we have to refresh the page again
      // to see the information reflected on  the table
      // to avoid that, we add the setTimeout to do that 
      // within 500 milliseconds
      setTimeout(() => {
        loadUsers()
      }, 500)

    }
  }

  // handling input field change  
  const handleChange = (e) => {
    // since the function would be receiving a paramter/value
    // we ought to know that value to add to state
    // using javascript event to retrieve the value
    // e.target.value 
    // destructuring e.target 
    let { name, value } = e.target
    // updating the state with the retrieved value
    setState({...state, [name]: value})
  }

  return (
    <>
      <ToastContainer />
      <Navbar bg="primary" variant="dark" className='justify-content-center'>
        <Navbar.Brand>
          <h1>Contact Manager</h1>
        </Navbar.Brand>
      </Navbar>

      <Container style={{ marginTop: "70px"}}>
        <Row>
          <Col md={4}>
            <h2>Add Contact</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-2">
                <Form.Label style={{ textAlign: "left" }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                /> 
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label style={{ textAlign: "left" }}>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                /> 
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label style={{ textAlign: "left" }}>Contact</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter Contact"
                  name="contact"
                  value={contact}
                  onChange={handleChange}
                /> 
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label style={{ textAlign: "left" }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={address}
                  onChange={handleChange}
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
