"use client";

import fetchCsrfToken from "@/lib/csrf";
import { useState } from "react";

interface CreateCategoryProp {
  onCategoryCreated?: () => void;
}

export default function CreateCategory({
  onCategoryCreated,
}: CreateCategoryProp) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault();

    if (!name.trim) {
      setError("Category name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const csrfToken = await fetchCsrfToken();

      if (!csrfToken) throw new Error("No csrf token available");

      const response = await fetch("http://localhost:4000/category", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create category: ${response.statusText}`);
      }

      const result = await response.json();

      console.log("Category created successfully: ", result);

      setName("");

      if (onCategoryCreated) {
        onCategoryCreated();
      }
    } catch (error) {
      console.log("Error creating category: ", error);
      setError(
        error instanceof Error ? error.message : "Failed to create category"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed left-0 top-0 bg-landingHeaderLight dark:bg-landingHeaderDark bg-opacity-80 w-screen h-screen flex justify-center items-center dark:text-landingTextDark text-landingTextLight">
      <div className="rounded shadow-md p-8 w-[30%] dark:bg-landingMainDark bg-landingMainLight flex justify-center items-center">
        <form className="flex flex-col gap-7" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Create a tasks category to proceed...</label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 rounded p-2 text-black dark:text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            disabled={isSubmitting}
            required
          />

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="dark:bg-landingSignInButtonDark bg-landingSignInButtonLight w-auto rounded hover:cursor-pointer p-1"
          >
            {isSubmitting ? "Creating..." : "Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
}
