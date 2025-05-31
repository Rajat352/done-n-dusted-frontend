import ThemeSwitcher from "./ThemeSwitcher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOut from "./SignOut";
import TaskPageTitle from "./TaskPageTitle";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-landingHeaderLight dark:bg-landingHeaderDark flex flex-col sm:flex-row px-4 py-5 gap-7 items-center w-full">
      <div className="flex-1/3"></div>
      <div className="text-xl  md:text-4xl flex-1/3">
        <TaskPageTitle />
      </div>
      <div className="flex-grow flex items-center flex-1/3">
        <div className="flex flex-grow gap-7 items-center justify-end">
          {session && <SignOut />}
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
