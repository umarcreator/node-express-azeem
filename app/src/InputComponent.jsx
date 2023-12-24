import React, { useState } from 'react'
import axios from 'axios'

const InputComponent = () => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    })
    const handleSubmit = async () => {
        console.log('submit...')
        console.log('data: ', inputs)
        const res = await axios.post('http://localhost:3000/user', {
            ...inputs
        })
        console.log('data saved in DB successfully!', res)
    }
  return (
    <div className='input-container'>
        <div className="text">Create A New User</div>
      <div className="inputs">
        <label htmlFor="name">Name: </label>
        <input id='name' type='text' value={inputs.name} onChange={e => setInputs(prev => ({...prev, name: e.target.value}))}/>
      </div>
      <div className="inputs">
        <label htmlFor="email">Email: </label>
        <input id='email' type='text' value={inputs.email} onChange={e => setInputs(prev => ({...prev, email: e.target.value}))}/>
      </div>
      <div className="inputs">
        <label htmlFor="password">Password: </label>
        <input id='password' type='text' value={inputs.password} onChange={e => setInputs(prev => ({...prev, password: e.target.value}))}/>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default InputComponent
