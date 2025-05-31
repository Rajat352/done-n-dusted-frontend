"use client";

export default async function fetchCsrfToken() {
  try {
    const res = await fetch("http://localhost:4000/auth/csrf-token", {
      method: "GET",
      credentials: "include",
    });

    const { csrfToken } = await res.json();
    return csrfToken;
  } catch (error) {
    console.error(
      "An error occured while fetching csrf token from backend",
      error
    );
  }
}
