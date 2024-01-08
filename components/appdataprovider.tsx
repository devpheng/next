"use client"

import { DataProvider } from "@/context/datacontext";
import React from "react";

export default function AppDataProvider({ children }) {
  return (
    <DataProvider>
      {children}
    </DataProvider>
  )
}
