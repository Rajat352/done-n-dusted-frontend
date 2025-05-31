import { SyncUserData } from "@/types/auth";
import { cookies } from "next/headers";
import parseAndSetCookie from "./parseAndSetCookie";

export default async function syncUser(userData: SyncUserData) {
  try {
    const response = await fetch("http://localhost:4000/auth/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log("User synced successfully!");
    const setCookieHeader = response.headers.getSetCookie();

    await parseAndSetCookie(setCookieHeader[0]);

    return { success: true };
  } catch (error) {
    console.error(
      "An error occured while connecting to DB for user sync",
      error
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unkown error",
    };
  }
}
