"use client"
import { signIn } from "next-auth/react";
import { FormButton } from "./FormButton";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginForm() {


  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && alert("Username or Password")
  }, [error]);



  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    await signIn('credentials', {
      username: username,
      password: password,
      callbackUrl: '/',
    });

  }
  return (
    <form action={handleSubmit} className="grid gap-4" >
      <div>
        <label htmlFor="username" className="mr-2">Username</label>
        <input
          className="border"
          type="text"
          id="username"
          name="username"
          placeholder=""
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="mr-2">Password</label>
        <input
          className="border "
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <div>
        <FormButton  >Login</FormButton>    
      </div>
    </form>
  );
}

