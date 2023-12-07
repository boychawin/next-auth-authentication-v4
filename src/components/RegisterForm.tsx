"use client"
import { signIn } from "next-auth/react";
import { FormButton } from "./FormButton";
import { createUser } from "@/utils/action";

export default function RegisterForm() {

  const handleSubmit = async (data: FormData) => {
    createUser(data).then((res: any) => {
      if (res.error) {
        alert(res.error)
      } else {
        console.log(res)
        alert('success')
      }
    })

  }
  return (
    <form action={handleSubmit} className="grid gap-4" >
      <div>
        <label htmlFor="email" className="mr-2">Email</label>
        <input
          className="border"
          type="text"
          id="email"
          name="email"
          placeholder=""
          required
        />
      </div>
      <div>
        <label htmlFor="name" className="mr-2">Name</label>
        <input
          className="border"
          type="text"
          id="name"
          name="name"
          placeholder=""
          required
        />
      </div>

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
        <FormButton  >Register</FormButton>
      </div>
    </form>
  );
}

