"use client";

// import { Input } from "@repo/ui/input"
// import { Button } from "@repo/ui/button";
import { ChangeEvent, ChangeEventHandler, MouseEventHandler, ReactNode, useState } from "react"
import { HTTP_BACKEND_URL } from "../config";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserData {
    email: string,
    password: string,
    name?: string
}

export function AuthPage({ isSignin }: {
    isSignin: boolean
}) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const router = useRouter();

    const submit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData: UserData = {
            email,
            password
        }
        if(!isSignin) userData.name = name;
        const data = await fetch(`${HTTP_BACKEND_URL}/${isSignin?'signin':'signup'}`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const res = await data.json();
        alert(res.message);
        localStorage.setItem('draw-app-data', JSON.stringify(res.token));
        if (data.status === 200) {
            setEmail('');
            setPassword('');
            setName('');
            router.push('/');
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">

            <p className="text-2xl font-semibold">{
                isSignin ? 'Signin' : 'Signup'
            }</p>

            <div className="px-14 py-14 m-2 rounded-lg border-2">
            <form onSubmit={submit} method="POST" className="flex justify-around items-center flex-col gap-10">

                {
                    !isSignin
                    &&
                    <Input type="text" id="name" placeholder="Name" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setName(e.target.value)
                    }} required={true} value={name}></Input>
                }

                <Input type="email" id="email" placeholder="Email" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value)
                }} required={true} value={email}></Input>

                <Input type="password" id="password" placeholder="Password" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                }} required={true} value={password}></Input>

                <Button>
                    {
                        isSignin ?
                            'Signin' :
                            'Signup'
                    }
                </Button>

            </form>
            </div>
            <div>
                {
                    isSignin?
                    'Don\'t have an account? ':
                    'Already have an account? '
                }
                {
                    isSignin?
                    <Link href="/auth/signup">Signup</Link>:
                    <Link href="/auth/signin">Signin</Link>
                }
            </div>
        </div>
    )
}

interface InputProps {
    type: string,
    id: string,
    placeholder: string,
    onChange: ChangeEventHandler,
    required: boolean,
    value: string
};

function Input ({ type, id, placeholder, onChange, required, value }: InputProps) {
    return (
        <div>
            <input type={type} name={id} id={id} placeholder={placeholder} onChange={onChange} required={required} value={value}
            className="border-2 rounded-md p-2"
            />
        </div>
    )
}

function Button ({ children }: {
    children: ReactNode,
}) {
    return (
        <button className="bg-black font-slate text-slate-100 cursor-pointer border-2 px-4 py-2 rounded-xl">
            {
                children
            }
        </button>
    )
}