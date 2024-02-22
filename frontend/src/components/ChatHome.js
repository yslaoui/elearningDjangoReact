
import { useEffect, useState } from 'react'
import services from '../services/services'
import Notification from './Notifications'
import Persons from './Persons'
import PersonForm from './PersonForm'
import ChatRoom from './ChatRoom'
import NavigationBar from './NavigationBar'


const ChatHome = () => {

  return (
    <div className='container'>
      <NavigationBar/>  
      <PersonForm/>  
    </div>
    
  )
}

export default ChatHome

