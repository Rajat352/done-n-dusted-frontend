import AuthHandler from "@/components/AuthHandler";

export default async function Home() {
  return (
    <div className="h-full flex flex-col">
      <header className="bg-landingHeaderLight dark:bg-landingHeaderDark py-16 sm:py-20 md:py-24 flex flex-col items-center justify-center">
        <div className="flex flex-col items-end">
          <h1 className="text-landingTextLight dark:text-landingTextDark text-5xl sm:text-6xl md:text-7xl  lg:text-8xl xl:text-9xl">
            Done 'n Dusted
          </h1>
          <h2 className="flex gap-2 text-black dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div className="text-l">A Daily Schema</div>
          </h2>
        </div>
      </header>
      <main className="bg-landingMainLight dark:bg-landingMainDark basis-auto flex-1 flex flex-col items-center justify-center gap-12 px-4">
        <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center my-10">
          A simple and minimal To-Do List app which can also let you know the
          ways to get the task done.
        </div>
        <AuthHandler />
      </main>
    </div>
  );
}
