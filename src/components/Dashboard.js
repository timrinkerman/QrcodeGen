import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"


export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const {register, handleSubmit} = useForm()
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
      fetch("https://qrcode-monkey.p.rapidapi.com/qr/uploadImage", {
	"method": "POST",
	"headers": {
		"x-rapidapi-key": "6769fc4edbmsh022653918a3cbd9p1d66ddjsne185340ac03d",
		"x-rapidapi-host": "qrcode-monkey.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
    }
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
        </>
    )
}
