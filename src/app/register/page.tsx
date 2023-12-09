import RegisterForm from "@/components/RegisterForm";

export default function Page() {

  return (
    <>
      <div className=" justify-center items-center text-center my-8">
        <RegisterForm />
        <p className="mt-2">
          <a className=" hover:underline text-sm" href='/'>Login</a>
        </p>
      </div>
    </>
  )
}
