"use server";

import { cookies } from "next/headers";

export default async function parseAndSetCookie(cookieString: string) {
  const attributes = cookieString.split(";").map((attr) => attr.trim());

  let tokenName: string | undefined;
  let tokenValue: string | undefined;
  let maxAge: number | undefined;
  let path: string | undefined;
  let expires: Date | undefined;
  let httpOnly: boolean = false;
  let sameSite: "strict" | "lax" | "none" | undefined;

  for (const attr of attributes) {
    if (attr.includes("=")) {
      const [key, value] = attr.split("=").map((part) => part.trim());
      if (key === "token") {
        tokenName = "token";
        tokenValue = value;
      } else if (key === "Max-Age") {
        maxAge = parseInt(value, 10);
      } else if (key === "Path") {
        path = value;
      } else if (key === "Expires") {
        expires = new Date(value);
      } else if (key === "SameSite") {
        if (value === "Strict") {
          sameSite = "strict";
        } else if (value === "Lax") {
          sameSite = "lax";
        } else if (value === "None") {
          sameSite = "none";
        }
      }
    } else if (attr === "HttpOnly") {
      httpOnly = true;
    }
  }

  if (tokenName && tokenValue) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: tokenName,
      value: tokenValue,
      maxAge,
      path,
      expires,
      httpOnly,
      sameSite,
    });
  } else {
    console.error("Token name or value is missing");
  }
}
