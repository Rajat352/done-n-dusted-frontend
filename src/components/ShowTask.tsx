"use client";

import { getCategoryContext } from "@/app/providers/SelectedCategoryContextProvider";
import { useState, useEffect } from "react";

interface TaskType {
  id: string;
  title: string;
  status: "PENDING" | "COMPLETED";
}

export default function ShowTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetchingTasks, setErrorFetchingTasks] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { selectedCategory } = getCategoryContext();

  async function getTasks() {
    try {
      setIsLoading(true);
      setErrorFetchingTasks(false);

      const response = await fetch(
        `http://localhost:4000/task/${selectedCategory.id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();

      setTasks(result);
    } catch (error) {
      setErrorFetchingTasks(true);
      console.error("Error fetching tasks", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, [selectedCategory.id]);

  if (isLoading) {
    return <div className="text-center">Loading Tasks...</div>;
  }

  if (errorFetchingTasks) {
    return (
      <div className="text-center text-red-500">
        Error fetching tasks, Please try again!
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-5">
      {tasks.length === 0 && (
        <div className="text-xl md:text-2xl">No Tasks!</div>
      )}
      {tasks.map((task) => (
        <li key={task.id} className="flex justify-between rounded">
          <div className="flex align-middle justify-center items-center">
            <input
              id={task.id}
              type="checkbox"
              value=""
              className="w-4 h-4 bg-landingSignInButtonLight dark:bg-landingSignInButtonDark border rounded border-gray-600 dark:border-gray-200"
            />
            <label htmlFor={task.id} className="text-xl ml-3">
              {task.title}
            </label>
          </div>
          <div className="flex gap-5 align-middle justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="hover:cursor-pointer size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="hover:cursor-pointer size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </li>
      ))}
    </div>
  );
}
