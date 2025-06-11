"use client";

import type React from "react";

import { useState } from "react";
import { SideBar } from "@/components/SideBar";
import { Menu, X } from "lucide-react";
import SelectedCategoryContextProvider from "./SelectedCategoryContextProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <SelectedCategoryContextProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-landingHeaderLight dark:bg-landingHeaderDark text-gray-600 dark:text-gray-300 md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Sidebar */}
        <SideBar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-landingMainLight dark:bg-landingMainDark">
          {children}
        </main>
      </div>
    </SelectedCategoryContextProvider>
  );
}
