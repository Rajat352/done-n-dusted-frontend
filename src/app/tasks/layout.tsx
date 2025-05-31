import SideBarProvider from "../providers/SideBarProvider";

export default function page({ children }: { children: React.ReactNode }) {
  return <SideBarProvider>{children}</SideBarProvider>;
}
