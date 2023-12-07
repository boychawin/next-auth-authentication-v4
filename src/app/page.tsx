import LoginForm from "@/components/LoginForm";
import Profile from "@/components/Profile";
import { getSession } from "@/utils/auth";

export default async function Page() {


  const session = await getSession();

  if (session?.user) {
    return <Profile session={session}/>
  }

  return (
    <>
      <div className=" justify-center items-center text-center my-8">
        <LoginForm />
        <p className="mt-2">
          Not registered yet? <a className=" hover:underline text-sm" href='/register'>Register here</a>
        </p>

      </div>
    </>
  )
}
