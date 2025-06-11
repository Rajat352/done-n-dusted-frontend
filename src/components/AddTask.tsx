"use client";

import { useState } from "react";
import { getCategoryContext } from "@/app/providers/SelectedCategoryContextProvider";
import ShowTask from "./ShowTask";
import fetchCsrfToken from "@/lib/csrf";

export default function AddTask() {
  const [task, setTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { selectedCategory } = getCategoryContext();

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    if (!task.trim) {
      setError("Task name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const csrfToken = await fetchCsrfToken();

      if (!csrfToken) throw new Error("No csrf token available");

      const response = await fetch(
        `http://localhost:4000/task/${selectedCategory.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-csrf-token": csrfToken,
          },
          body: JSON.stringify({ task: task.trim() }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.statusText}`);
      }

      const result = await response.json();

      console.log("Task created successfully", result);

      setTask("");
    } catch (error) {
      console.error("Failed to create task", error);
      setError(error instanceof Error ? error.message : "Failed to Add Task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-5 md:gap-10 align-middle justify-center">
      <form
        className="flex flex-col gap-3 justify-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex gap-5 justify-center">
          <input
            type="text"
            className="bg-white rounded py-1 px-2 text-gray-700 w-50 md:w-90"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            disabled={selectedCategory.id === "" || isSubmitting}
          />

          <button
            className="hover:cursor-pointer bg-landingSignInButtonLight dark:bg-landingSignInButtonDark p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedCategory.id === "" || isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Task"}
          </button>
        </div>
        {error && <div className="text-center text-red-500">{error}</div>}
      </form>

      {selectedCategory.id === "" ? (
        <div className="text-xl text-center">
          Select a Category to start seeing and adding tasks!
        </div>
      ) : (
        <ShowTask />
      )}
    </div>
  );
}
