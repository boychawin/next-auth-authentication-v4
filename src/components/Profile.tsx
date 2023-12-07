"use client"
import {  signOut } from "next-auth/react";


export default function Profile({session}:any) {


  return (
    <div className=" justify-center items-center text-center my-8">

    <h2>Hello: {session.user.name}</h2>
    <p>UserID: {session.user.id}</p>
    {JSON.stringify(session.user)}
    <p>
      <button onClick={() => signOut()} className="py-1 px-6 border mt-5 bg-red-500 text-white"> Logout</button>
    </p>
  </div>
  );
}

