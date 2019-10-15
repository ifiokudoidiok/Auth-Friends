import React, { useRef } from 'react';
import axiosWithAuth from '../axios';

export default function AddFriend(props) {
  const friendNameRef = useRef();
  const friendAgeRef = useRef();
  const friendEmailRef = useRef();

  const submit = () => {
    axiosWithAuth().post('http://localhost:5000/api/friends/', {
      name: friendNameRef.current.value,
      age: friendAgeRef.current.value,
      email: friendEmailRef.current.value,
    })
      .then(res => {
        // SUCCESS! Credentials are valid:
        //   1- Put the token string in local storage under a 'token' key
        // debugger
        // localStorage.setItem('payload', res.data.payload)
        //   2- Redirect users to the /quotes route
        props.history.push('/friends');
      })
      .catch(error => {
        // debugger
        // Alert a sensible message pulled from the error object
        alert(error.response.data.error);
      });
  };

  return (
    <div className='login'>
      <div className='login-inputs'>
        name <input ref={friendNameRef} type="text" />
        <br />
        age <input ref={friendAgeRef} type="text" />
        <br />
        email <input ref={friendEmailRef} type="text" />
      </div>

      <div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}
