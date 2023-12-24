import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const controller = new AbortController();
        axios.get('http://localhost:3000/users', {
            signal: controller.signal
        }).then(res => {
            console.log('user api data: ', res.data)
            setData(res.data)
        }).catch(e => {
            console.log('api error: ', e)
        })
        return () => controller.abort()
    }, [])
  return (
    <div className="users-container">
        <div className="users">
            <div className="text">All Users</div>
            <table>
                <thead>
                    <th>S#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </thead>
                <tbody>
                    {data.length > 0 && data.map((i, index) => {
                        return <tr><td>{index}</td><td>{i.name}</td><td>{i.email}</td><td>{i.email}</td></tr>
                    })}
                </tbody>
            </table>
                
        </div>
    </div>
  )
}

export default Users
