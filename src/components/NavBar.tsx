import ThemeSwitcher from "./ThemeSwitcher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOut from "./SignOut";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-landingHeaderLight dark:bg-landingHeaderDark flex px-10 py-5 justify-end gap-7 items-center">
      {session && <SignOut />}
      <ThemeSwitcher />
    </div>
  );
}
