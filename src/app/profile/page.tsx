
import Profile from "@/components/Profile";
import { getUserById } from "@/server/get-users";
import { getSession } from "@/utils/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page() {


  const session = await getSession();


  if (!session?.user) {
    redirect("/login");
  }


  const [user] = await Promise.all([getUserById(Number(session.user.id))]);

  if (!user) {
    notFound();
  }


  return <Profile session={session} user={user} />
}
