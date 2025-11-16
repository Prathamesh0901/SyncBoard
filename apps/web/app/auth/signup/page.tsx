"use client";

import { ChangeEvent, useState } from "react"
import { HTTP_BACKEND_URL } from "../../../config";
import { AuthPage } from "../../../components/AuthPage";

interface UserSchema {
    email: string,
    password: string,
    name: string
}

export default function SignUp() {

    const [userData, setUserData] = useState<UserSchema>({email: '', password: '', name: ''});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({
            ...prev, [e.target.id]:e.target.value
        }))
    }

    const submit = async () => {
        console.log(userData);
        const data = await fetch(`${HTTP_BACKEND_URL}/signup`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const res = await data.json();
        console.log(res);
        localStorage.setItem('draw-app-data', JSON.stringify(res.token));
    }

    return (
        // <div style={{
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     flexDirection: 'column'
        // }}>
        //     <div>
        //         <label>Name: </label>
        //         <input type="text" name="name" id="name" value={userData.name} onChange={handleChange} required/>
        //     </div>
        //     <div>
        //         <label>Email: </label>
        //         <input type="text" name="email" id="email" value={userData.email} onChange={handleChange} required/>
        //     </div>
        //     <div>
        //         <label>Password: </label>
        //         <input type="text" name="password" id="password" value={userData.password} onChange={handleChange} required/>
        //     </div>

        //     <button onClick={submit}>Signup</button>
        // </div>
        <AuthPage isSignin={false}/>
    )
}