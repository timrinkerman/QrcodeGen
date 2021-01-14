import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import  firebase  from '../firebase'


export default function Dashboard() {
    const [error, setError] = useState("")
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const {register, handleSubmit} = useForm()
    const ref = firebase.firestore().collection('users')
    console.log(ref)
    async function handleLogout() {
      setError('')
      try{
        await logout()
        history.push('/login')
      } catch{
        setError("Failed to log out")
      }
    }
    
    const onSubmit = (data) => {
      console.log(data)


.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
})};

function getUsers() {
  setLoading(true);
  ref.onSnapshot((querySnapshot) => {
    console.log(querySnapshot)
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    setUsers(items)
    setLoading(false)
    console.log(items)
  });
}

// useEffect(() => {
// getUsers();
// },);


 
    return (
        <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email:</strong>{currentUser.email}
                <Link to="/update-profile" className='btn btn-primary w-100mt-3'>Update Profile</Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
         <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
        <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Your Image</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          <input ref={register} required name="image"type="file"/>
          <button>Submit</button>
        </form>
        </Card.Body>
        </Card>
        <Button variant="link" onClick={getUsers}></Button>
        <div>{users.map((user)=>(
                                                      <div>key={user.id}
                                                      <h2>{user.name}</h2>
                                                      </div>))}Find Friends</div>
        </>
    )
}
