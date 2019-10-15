import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Use the wrapped axios!
import axiosWithAuth from '../axios';
// import { Redirect } from 'react-router-dom';

export default function Friends(props) {
  const [friendsList, setFriendsList] = useState([]);

  // (OPTION A) Find a way to have the component
  // redirect to the /login screen,
  // if there's no 'token' in local storage.
  // Alternatively we could use a 'protected'
  // route in Container.jsx
  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     props.history.push('/');
  //   }
  // }, [])

  useEffect(() => {
    // We need the wrapped axios instead, to send token
    // along automatically, in an Authorization header
    // axios.get('http://localhost:5000/api/quotes')
    axiosWithAuth().get('http://localhost:5000/api/friends')
      .then(res => {
        //   debugger
        setFriendsList(res.data);
      })
      .catch(error => {
          debugger
        // props.history.push('/'); // could be improved
        alert(error.message);
      });
  }, []);

  // the request still goes out :(
  // if(!localStorage.getItem('token')) {
  //   return <Redirect to="/login" />
  // }

  return (
    <div className='friends'>
      {
        friendsList.map(friend => (
          <li key={friend.id}>{friend.name} is {friend.age} years old and uses the email {friend.email}</li>
        ))
      }
    </div>
  );
}
