import { useEffect, useRef, useState } from 'react'
import services from '../services/services'
import {Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import NavigationBar from './NavigationBar';

/*
We need the socket connection to be initaited only once when this component mounts, and not eahc time is re-rendered (eg not when state variables change)
Therefore we create the socket connection inside a useEffect.
But the chatSocket variable, if initialized inside the useEffect, is not accessible to the handleSubmit handler.
Therefore, we initialize it outside the useffect
But then a new connection is initialized each time the component re-renders
Therefore, we define it inside a useRef( whose value persists across re-renders which means re-renders do not create a new connection)
and we initiate the connection inside the useEffect.

*/ 
const ChatRoom = (props) => {

  let {room_name} = useParams();
  const location = useLocation()
  const userName = location.state?.newName
  
  const [ newmessage, setnewmessage] = useState('')  
  const [ messagelog, setmessagelog] = useState([])  
  

  const chatSocket = useRef(null) 



  useEffect(() => {
    // The socket connection is established only when the component mounts, not when it is rerendered
    chatSocket.current = new WebSocket(`ws://${window.location.host}/ws/${room_name}/`)

    // The handlers listent for websocket event for the lifetime of the connection, not only when the component mounts
    chatSocket.current.onmessage = (event) => 
    {
      const data = JSON.parse(event.data)
      const displayMessage = ` ${data.user}: ${data.message} `
      setmessagelog(prevMessages => [...prevMessages, displayMessage])
    }
    chatSocket.current.onclose = () => {
      console.log(`The web soket connection was closed`)
    }

  }, [room_name])

  const changeName = (event) => {
    setnewmessage(event.target.value)    
    }
  
  const handlesubmit = (event) => {
    event.preventDefault()
    console.log(chatSocket)  
    const messagePayload = {'message': newmessage, 'user': userName}  
    chatSocket.current.send(
      JSON.stringify(messagePayload)
    )
    setnewmessage('')
  }


  return (
      <>
        <NavigationBar/>
        <h1> Chat Room {room_name} </h1>
        <h2> User {userName} </h2>
        <textarea name="" id="" cols="100" rows="10" 
                  value={messagelog.join('\n')} 
                  readOnly></textarea>
        <Form onSubmit = {handlesubmit}>
        <Form.Group>
            <Form.Label> Your message:  </Form.Label>
            <Form.Control 
              value={newmessage} 
              onChange={changeName}>
            </Form.Control>
            <Button type='submit' variant='primary' > Submit</Button>
          </Form.Group>
       </Form>
      </>
  
    );
  }

export default ChatRoom