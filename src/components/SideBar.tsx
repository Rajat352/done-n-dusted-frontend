"use client";

import { useEffect, useState } from "react";
import ShowCategories from "./ShowCategories";
import CreateCategory from "./CreateCategory";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  name: string;
}

export function SideBar({ isOpen, onClose }: SideBarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorFetchingCategories, setErrorFetchingCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [createCategoryClick, setCreateCategoryClick] = useState(false);

  async function getCategorties() {
    try {
      setIsLoading(true);
      setErrorFetchingCategories(false);

      const response = await fetch("http://localhost:4000/category", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("An error occured while fetching the categories: ", error);
      setErrorFetchingCategories(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategorties();
  }, []);

  const refreshCategories = () => {
    if (createCategoryClick) {
      setCreateCategoryClick(false);
    }
    getCategorties();
  };

  const handleClickNewCategory = () => {
    setCreateCategoryClick(true);
  };

  if (isLoading) {
    return (
      <>
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow bg-landingHeaderLight dark:bg-landingHeaderDark px-5">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Categories</h2>
            </div>
            <div className="flex">
              <div className="text-sm">Loading categories...</div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full bg-landingHeaderLight dark:bg-landingHeaderDark shadow-lg border-r border-gray-200 dark:border-gray-700 px-5">
            <div className="mb-6 mt-20">
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>
            <div className="flex">
              <div className="text-sm">Loading categories...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!isLoading && categories.length === 0 && !errorFetchingCategories) {
    return <CreateCategory onCategoryCreated={refreshCategories} />;
  }

  if (createCategoryClick) {
    return <CreateCategory onCategoryCreated={refreshCategories} />;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-landingHeaderLight dark:bg-landingHeaderDark px-5">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Categories</h2>
          </div>

          {!errorFetchingCategories ? (
            <ShowCategories
              categories={categories}
              desktop={true}
              onClose={onClose}
            />
          ) : (
            <div className="text-sm">
              Error fetching categories...
              <div
                className="underline hover:cursor-pointer"
                onClick={() => {
                  getCategorties();
                }}
              >
                Click here
              </div>{" "}
              to try again
            </div>
          )}

          <button
            className="mb-20 rounded-2xl bg-landingSignInButtonLight dark:bg-landingSignInButtonDark p-2 hover:cursor-pointer"
            onClick={() => handleClickNewCategory()}
          >
            Create new Category
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full bg-landingHeaderLight dark:bg-landingHeaderDark shadow-lg border-r border-gray-200 dark:border-gray-700 px-5">
          <div className="mb-6 mt-20">
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>

          {!errorFetchingCategories ? (
            <ShowCategories
              categories={categories}
              desktop={true}
              onClose={onClose}
            />
          ) : (
            <div className="text-sm">
              Error fetching categories...
              <div
                className="underline hover:cursor-pointer"
                onClick={() => {
                  getCategorties();
                }}
              >
                Click here
              </div>{" "}
              to try again
            </div>
          )}

          <button className="mb-20 rounded-2xl bg-landingSignInButtonLight dark:bg-landingSignInButtonDark p-2">
            Create new Category
          </button>
        </div>
      </div>
    </>
  );
}
