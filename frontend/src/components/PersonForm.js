import { useEffect, useState } from 'react'
import services from '../services/services'
import {Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';




const PersonForm = (props) => {

    const navigate  =useNavigate()

  /* A form to add name and number*/
    const [newName, setnewName] = useState('')
    const [roomName, setroomName] = useState('')
  
    const changeName = (event) => {
      setnewName(event.target.value)
    }

    const changeRoomName = (event) => {
      setroomName(event.target.value)
    }
  
  
  
    const handleSubmit = (event) => {
      event.preventDefault()
      // window.location.href = `/chat_room/${roomName}`
      navigate(`/chat_room/${roomName}`, {state: {newName}} )
    }
  
    return (
      <>
        <Form onSubmit={handleSubmit}>

        <Form.Group>
            <Form.Label> What is your name ? :  </Form.Label>
            <Form.Control 
              value={newName} 
              onChange={changeName}>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label> What chat room would you like you enter ? :  </Form.Label>
            <Form.Control 
              value={roomName} 
              onChange={changeRoomName}>
            </Form.Control>
          </Form.Group>

          <Button variant='primary' type="submit" >add</Button>
          
        </Form>
      </>
    );
  }
  
  export default PersonForm
  