"use client"
import { signOut } from "next-auth/react";


export default function Profile({ session, user }: {
  session: any;
  user: any;
}) {


  return (
    <div className=" justify-center items-center text-center my-8">

      <h2>Hello: {session.user.name}</h2>
      <p>UserID: {session.user.id}</p>
      <p>
        Data session:  {JSON.stringify(session.user)}
      </p>
      <p>
        Data Fetch : {JSON.stringify(user)}
      </p>
      <p>

        <button onClick={() => signOut()} className="py-1 px-6 border mt-5 bg-red-500 text-white"> Logout</button>
      </p>
    </div>
  );
}

