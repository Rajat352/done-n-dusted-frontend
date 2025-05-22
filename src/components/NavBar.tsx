import ThemeSwitcher from "./ThemeSwitcher";

export default function NavBar() {
  return (
    <div className="bg-landingHeaderLight dark:bg-landingHeaderDark flex px-10 py-5 justify-end gap-7 items-center">
      <div className="hover:cursor-pointer">Tasks</div>
      <ThemeSwitcher />
    </div>
  );
}
