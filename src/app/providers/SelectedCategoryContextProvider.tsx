"use client";

import React, { useState, useContext, createContext } from "react";

interface SelectedCategoryType {
  name: string;
  id: string;
}

interface SelectedCategoryContextType {
  selectedCategory: SelectedCategoryType;
  setSelectedCategory: (category: SelectedCategoryType) => void;
}

const SelectedCategoryContext = createContext<SelectedCategoryContextType>({
  selectedCategory: {
    name: "",
    id: "",
  },
  setSelectedCategory: () => {},
});

export default function SelectedCategoryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryType>({
      name: "",
      id: "",
    });
  return (
    <SelectedCategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      {children}
    </SelectedCategoryContext.Provider>
  );
}

export const getCategoryContext = () => useContext(SelectedCategoryContext);
