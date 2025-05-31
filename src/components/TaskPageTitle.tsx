"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskPageTitle() {
  const pathname = usePathname();

  const router = useRouter();

  const [isTasksPage, setTasksPage] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setTasksPage(true);
    } else setTasksPage(false);
  }, [pathname]);

  return (
    <div className="text-center">
      {isTasksPage && (
        <div onClick={() => router.push("/")} className="hover:cursor-pointer">
          Done n' Dusted
        </div>
      )}
    </div>
  );
}
