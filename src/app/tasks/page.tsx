import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AddTask from "@/components/AddTask";
import ShowTask from "@/components/ShowTask";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-full flex flex-col items-center">
      <div className="mt-10 flex flex-col">
        <div className="text-2xl md:text-4xl text-center">
          Hi <span className="underline font-bold">{session?.user.name}</span>,
          Welcome
        </div>
        <div className="mt-4 text-center text-sm">
          Start adding tasks by typing below
        </div>
      </div>
      <AddTask />
    </div>
  );
}
