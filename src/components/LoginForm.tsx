"use client"
import { signIn } from "next-auth/react";
import { FormButton } from "./FormButton";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {


  const [errorMessage, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;


    const { error, status, ok, url }: any = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
      callbackUrl: '/profile',
    });

    if (error) {
      setError("Username or Password is incorrect")
      console.error(error)
    }

    if (status == 200 && ok) {
      redirect(url)
    }

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
        {!!errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
      <div>
        <FormButton  >Login</FormButton>
      </div>
    </form>
  );
}

