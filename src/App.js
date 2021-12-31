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

const api = "https://crudcontactmanager.herokuapp.com/api"

const initialState = {
  name: "",
  email: "",
  contact: "",
  address: "",
}

function App() {
  const[state, setState] = useState(initialState)
  const [data, setData] = useState([])
  const [userId, setUserId] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const {name, email, contact, address} = state

  useEffect(() => {
    loadUsers()
  }, [])
  
  const loadUsers = async () => {
    const response = await axios.get(api)
    console.log(response)
    setData(response.data)
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

  // handling submit
  const handleSubmit = (e) => {
    // prevent the default behaviour of forms reloading
    e.preventDefault()
    // check to see if the input field is empty
    if (!name || !address || !email || !contact) {
      toast.error("Please fill all input field")
    } else {
      if (!editMode) {
        axios.post(api, state)
        toast.success("Added successfully")
        setState(initialState)
        setTimeout(() => {
          loadUsers()
        }, 500)

      } else {
        axios.put(`${api}/${userId}`, state)
        toast.success("updated successfully")
        setState(initialState)
        setTimeout(() => {
          loadUsers()
        }, 500)
        setUserId(null)
        setEditMode(false)
      }
    }
      
  }

  // handling Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`${api}/${id}`);
      toast.success("User deleted")
      setTimeout(() => {
        loadUsers()
      }, 500)
    }
  }

  // handling Update
  const handleUpdate = (id) => {
    const singleUser = data.find((item) => item.id === id)
    setState({ ...singleUser })
    setUserId(id)
    setEditMode(true)
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
                <Button type="submit" variant="primary" size="lg">
                  {editMode ? "Update" : "Submit" }
                </Button>
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
                        <Button onClick={() => handleUpdate(item.id)} style={{marginRight:"5px"}} variant="secondary">
                          Update
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="danger">
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
