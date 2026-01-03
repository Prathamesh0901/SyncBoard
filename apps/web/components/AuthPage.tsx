"use client";

import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from "react";
import { HTTP_BACKEND_URL } from "../config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInSignUp } from "../lib/utils/fetch";

interface UserData {
  email: string;
  password: string;
  name?: string;
}

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const submit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: UserData = { email, password };
    if (!isSignin) userData.name = name;

    const res = await signInSignUp(userData, isSignin);
    localStorage.setItem("draw-app-data", JSON.stringify(res));

    if (res) {
      setEmail("");
      setPassword("");
      setName("");
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="flex flex-col gap-8 items-center">

        <p className="text-3xl tracking-wide">
          {isSignin ? "Sign in" : "Sign up"}
        </p>

        <div className="px-14 pt-12 pb-10 rounded-xl bg-zinc-900">
          <form
            onSubmit={submit}
            className="flex flex-col items-center gap-8"
          >
            {!isSignin && (
              <Input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
              />
            )}

            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />

            <Button>
              {isSignin ? "Sign in" : "Create account"}
            </Button>
          </form>
        </div>

        <div className="text-sm text-zinc-400">
          {isSignin ? "No account yet? " : "Already onboard? "}
          <Link
            href={isSignin ? "/auth/signup" : "/auth/signin"}
            className="text-zinc-200 hover:text-white underline transition"
          >
            {isSignin ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </div>
    </div>
  );
}

interface InputProps { 
    type: string, 
    id: string, 
    placeholder: 
    string, 
    onChange: ChangeEventHandler, 
    required: boolean, 
    value: string 
};

function Input({
  type,
  id,
  placeholder,
  onChange,
  required,
  value,
}: InputProps) {
  return (
    <input
      type={type}
      name={id}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="
        w-64
        bg-transparent
        border-b border-zinc-600
        px-1 py-2
        text-zinc-100
        placeholder:text-zinc-500
        focus:outline-none
        focus:border-zinc-300
        transition
      "
    />
  );
}

function Button({ children }: { children: ReactNode }) {
  return (
    <button
      className="
        mt-4
        bg-zinc-100
        text-zinc-900
        px-6 py-2
        rounded-lg
        hover:bg-white
        active:scale-[0.98]
        transition
      "
    >
      {children}
    </button>
  );
}
