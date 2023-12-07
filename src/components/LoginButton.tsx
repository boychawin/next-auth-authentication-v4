"use client"
import { signIn } from "next-auth/react";
import { FormButton } from "./FormButton";

export default function LoginButton() {
  return (
    <form action={async () => signIn()}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder=""
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
        
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <FormButton  >Login</FormButton>
    </form>
  );
}

