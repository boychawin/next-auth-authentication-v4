import LoginButton from "@/components/LoginButton";



export default function Home() {

  // const fetchUsers = async () => {
  //   const users = await prisma.user.findMany();
  //   console.log(users);
  // };

  // fetchUsers();

  return (
    <>
      <div>
        <LoginButton />
      </div>
    </>
  )
}
